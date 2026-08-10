"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
      <div className="w-full max-w-md surface p-8 rounded-3xl border border-red-500/30 text-center">
        <h2 className="text-2xl font-black uppercase text-red-500 tracking-widest mb-4">
          Something went wrong!
        </h2>
        <p className="text-muted text-sm font-bold tracking-widest mb-8 break-words">
          {error.message}
        </p>
        <button
          onClick={() => reset()}
          className="inline-block bg-white text-black py-4 px-8 rounded-xl font-black uppercase tracking-widest hover:scale-[1.02] transition-transform"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
