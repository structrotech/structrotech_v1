"use client";

import { useEffect } from "react";

export default function StudioError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Sanity Studio Error Boundary caught:", error);
  }, [error]);

  const isCors =
    error?.message?.toLowerCase().includes("cors") ||
    error?.message?.toLowerCase().includes("origin") ||
    error?.message?.toLowerCase().includes("fetch");

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[#101112] px-4 py-12 text-white">
      <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-[#161719] p-8 shadow-2xl">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-semibold text-white">
              Sanity Studio Error
            </h1>
            <p className="text-sm text-gray-400">
              The studio failed to initialize
            </p>
          </div>
        </div>

        <div className="mb-6 rounded-lg border border-red-500/20 bg-red-500/10 p-4">
          <p className="text-sm font-mono text-red-300 break-words">
            {error?.message || "An unexpected error occurred in Sanity Studio."}
          </p>
          {error?.digest && (
            <p className="mt-1 text-xs text-red-400/70">
              Digest: {error.digest}
            </p>
          )}
        </div>

        {isCors && (
          <div className="mb-6 rounded-lg border border-amber-500/20 bg-amber-500/10 p-4 text-xs text-amber-200">
            <p className="font-semibold mb-1">Possible CORS Origin issue:</p>
            <p>
              Make sure <code>http://localhost:3000</code> is added as an
              allowed CORS origin with credentials enabled in your project
              dashboard at{" "}
              <a
                href="https://sanity.io/manage"
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-white"
              >
                sanity.io/manage
              </a>
              .
            </p>
          </div>
        )}

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => reset()}
            className="flex-1 rounded-lg bg-red-600 px-4 py-2.5 text-center text-sm font-medium text-white transition hover:bg-red-700"
          >
            Try reloading Studio
          </button>
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a
            href="/"
            className="flex-1 rounded-lg border border-white/20 px-4 py-2.5 text-center text-sm font-medium text-gray-200 transition hover:bg-white/10 hover:text-white"
          >
            Back to Website
          </a>
        </div>
      </div>
    </div>
  );
}
