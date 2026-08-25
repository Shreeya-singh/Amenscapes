"use client";

import Image from "next/image";
import NewsletterSignup from "@/components/NewLetterSignup";
import { RuleOrnament, ScrollOrnament } from "@/components/ui/Ornaments";

export default function WordGames() {
  return (
    <section className="relative flex min-h-[calc(100svh-80px)] items-center overflow-hidden bg-cream px-6 pt-10 pb-24 sm:pt-14 sm:pb-20">
      <div className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between gap-10">
        <div className="flex flex-col items-center text-center w-full max-w-lg">
          <ScrollOrnament className="w-[260px] text-gold sm:w-[320px]" />

          {/* Cormorant runs optically small, so the display sizes sit high. */}
          <h1 className="mt-1 max-w-[13ch] text-[46px] leading-[1.02] font-bold text-balance text-ink sm:text-[62px] lg:text-[76px]">
            Faith-Filled Word Search &amp; Puzzle Books
          </h1>

          <RuleOrnament className="mt-2 w-[260px] text-gold sm:w-[320px]" />

          <p className="mt-3 max-w-[30ch] text-[19px] leading-snug font-semibold text-ink/75 sm:text-[23px]">
            Inspiring word searches and puzzles that illuminate God&apos;s Word.
          </p>

          <NewsletterSignup />
        </div>

        <div className="relative aspect-4/3 w-full lg:aspect-auto lg:h-[min(560px,65svh)]">
          <Image
            src="/Amenscapes/hero-book.png"
            alt="Bible WordaLight and Bent-o-Box puzzle books"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-right"
            priority
          />
        </div>
      </div>

      <button
        type="button"
        aria-label="Scroll down"
        onClick={() =>
          window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
        }
        className="absolute bottom-5 left-1/2 z-10 flex size-10 -translate-x-1/2 items-center justify-center rounded-full bg-ink/10 text-ink transition-colors hover:bg-ink/20 sm:bottom-8"
      >
        <svg width="18" height="18" viewBox="0 0 14 14" fill="none" aria-hidden>
          <path
            d="M3.5 5.5 7 9l3.5-3.5"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </section>
  );
}
