import { NextResponse } from "next/server";

const YOUTUBE_API_URL = "https://www.googleapis.com/youtube/v3";
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

let cachedData: {
  success: boolean;
  subscriberCount: number | null;
  displayCount: string;
  is100K: boolean;
  fetchedAt: number;
} | null = null;

function formatCount(count: number): string {
  if (count >= 1_000_000) {
    const m = count / 1_000_000;
    return m % 1 === 0 ? `${m}M` : `${m.toFixed(1)}M`;
  }
  if (count >= 1_000) {
    const k = count / 1_000;
    if (k >= 100) return `${Math.round(k)}K`;
    if (k % 1 === 0) return `${k}K`;
    return `${k.toFixed(1)}K`;
  }
  return count.toString();
}

export async function GET() {
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        success: false,
        error: "YOUTUBE_API_KEY is missing",
      },
      { status: 500 }
    );
  }

  // Check cache
  if (cachedData && Date.now() - cachedData.fetchedAt < CACHE_DURATION) {
    return NextResponse.json(cachedData, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        "X-Cache": "HIT",
      },
    });
  }

  try {
    const res = await fetch(
      `${YOUTUBE_API_URL}/channels?part=statistics&forHandle=@SnazzyZone&key=${apiKey}`
    );

    if (!res.ok) {
      const errorData = await res.text();
      let details = "Unknown error";
      try {
        const parsed = JSON.parse(errorData);
        if (parsed.error && parsed.error.message) {
          details = parsed.error.message;
        }
      } catch (e) {}

      return NextResponse.json(
        {
          success: false,
          error: "YouTube API request failed",
          status: res.status,
          details,
        },
        { status: res.status }
      );
    }

    const data = await res.json();

    if (!data.items || data.items.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "SnazzyZone channel was not found",
        },
        { status: 404 }
      );
    }

    const channel = data.items[0];
    
    if (channel.statistics.hiddenSubscriberCount) {
      return NextResponse.json(
        {
          success: false,
          error: "Subscriber count is hidden",
        },
        { status: 403 }
      );
    }

    const subscriberCount = parseInt(channel.statistics.subscriberCount, 10);
    
    if (process.env.NODE_ENV === "development") {
      const sanitizedResponse = { ...data };
      console.log("[YouTube] API response:", JSON.stringify(sanitizedResponse, null, 2));
      console.log("[YouTube] Subscriber count:", subscriberCount);
    }

    cachedData = {
      success: true,
      subscriberCount,
      displayCount: formatCount(subscriberCount),
      is100K: subscriberCount >= 100_000,
      fetchedAt: Date.now(),
    };

    return NextResponse.json(cachedData, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        "X-Cache": "MISS",
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error during YouTube API call",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
