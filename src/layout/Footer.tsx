"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative mt-auto border-t border-black/5 bg-[#f3f3f3]">
      <div className="mx-auto flex min-h-[52px] max-w-[1150px] items-center justify-center px-14 py-3 sm:px-6">
        <p className="text-center text-[12px] text-[#555] sm:text-[13px]">
          © Copyright{" "}
          <Link href="/" className="text-brand-ink hover:underline">
            Amenscapes
          </Link>{" "}
          2026. All Rights Reserved
        </p>
      </div>

      <button
        type="button"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="absolute right-4 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-[#5a5a5a] text-white"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
          <path
            d="M7 11V3M7 3 3.5 6.5M7 3l3.5 3.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </footer>
  );
}
