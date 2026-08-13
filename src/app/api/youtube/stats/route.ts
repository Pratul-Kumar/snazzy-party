import { NextResponse } from "next/server";

const CHANNEL_ID = "UCxxxxxxxxxxxxxxxxxxxxxxxx"; // Will be resolved on first call
const YOUTUBE_API_URL = "https://www.googleapis.com/youtube/v3";

// In-memory cache for serverless (survives within same instance)
let cachedData: {
  subscriberCount: number;
  displayCount: string;
  channelTitle: string;
  is100K: boolean;
  fetchedAt: number;
} | null = null;

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

function formatCount(count: number): string {
  if (count >= 1_000_000) {
    const m = count / 1_000_000;
    return m % 1 === 0 ? `${m}M` : `${m.toFixed(1)}M`;
  }
  if (count >= 1_000) {
    const k = count / 1_000;
    // YouTube rounds to 3 significant figures, so show 1 decimal for < 100K
    if (k >= 100) return `${Math.round(k)}K`;
    if (k % 1 === 0) return `${k}K`;
    return `${k.toFixed(1)}K`;
  }
  return count.toString();
}

async function resolveChannelId(apiKey: string): Promise<string | null> {
  try {
    const res = await fetch(
      `${YOUTUBE_API_URL}/channels?part=id&forHandle=SnazzyZone&key=${apiKey}`
    );
    if (!res.ok) return null;
    const data = await res.json();
    if (data.items && data.items.length > 0) {
      return data.items[0].id;
    }
    return null;
  } catch {
    return null;
  }
}

async function fetchSubscriberCount(apiKey: string, channelId: string) {
  const res = await fetch(
    `${YOUTUBE_API_URL}/channels?part=statistics,snippet&id=${channelId}&key=${apiKey}`
  );

  if (!res.ok) {
    throw new Error(`YouTube API returned ${res.status}`);
  }

  const data = await res.json();

  if (!data.items || data.items.length === 0) {
    throw new Error("Channel not found");
  }

  const channel = data.items[0];
  const subscriberCount = parseInt(channel.statistics.subscriberCount, 10);
  const channelTitle = channel.snippet?.title || "SnazzyZone";

  return {
    subscriberCount,
    displayCount: formatCount(subscriberCount),
    channelTitle,
    is100K: subscriberCount >= 100_000,
    fetchedAt: Date.now(),
  };
}

// Store the resolved channel ID
let resolvedChannelId: string | null = null;

export async function GET() {
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    // No API key configured — return fallback
    return NextResponse.json(
      {
        subscriberCount: null,
        displayCount: "-- --",
        channelTitle: "SnazzyZone",
        is100K: false,
        error: "API key not configured",
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        },
      }
    );
  }

  // Check in-memory cache
  if (cachedData && Date.now() - cachedData.fetchedAt < CACHE_DURATION) {
    return NextResponse.json(cachedData, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        "X-Cache": "HIT",
      },
    });
  }

  try {
    // Resolve channel ID if needed
    if (!resolvedChannelId) {
      resolvedChannelId = await resolveChannelId(apiKey);
      if (!resolvedChannelId) {
        throw new Error("Could not resolve channel ID for @SnazzyZone");
      }
    }

    const data = await fetchSubscriberCount(apiKey, resolvedChannelId);
    cachedData = data;

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        "X-Cache": "MISS",
      },
    });
  } catch (error: any) {
    console.error("[YouTube API Error]", error.message);

    // Return cached data if available (stale but better than nothing)
    if (cachedData) {
      return NextResponse.json(
        { ...cachedData, stale: true },
        {
          headers: {
            "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
            "X-Cache": "STALE",
          },
        }
      );
    }

    // No cache, no API — graceful fallback
    return NextResponse.json(
      {
        subscriberCount: null,
        displayCount: "-- --",
        channelTitle: "SnazzyZone",
        is100K: false,
        error: "Temporarily unavailable",
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      }
    );
  }
}
