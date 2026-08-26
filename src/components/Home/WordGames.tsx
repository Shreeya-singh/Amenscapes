"use client";

import Image from "next/image";
import NewsletterSignup from "@/components/NewLetterSignup";

export default function WordGames() {
  return (
    <section className="relative isolate overflow-hidden bg-cream">
      {/* The band matches the navbar's max-w-7xl, so the artwork and the copy
          sit on the same measure as the logo and links above them. It carries
          the artwork's own 1440x760 ratio rather than a viewport height, so
          the hero shrinks with the window like every other section, and it is
          the container the whole composition is sized against. */}
      <div className="@container relative mx-auto w-full max-w-8xl lg:aspect-[1440/900]">
        {/* Photograph + its white scrim, on their own layer so the copy is
            never boxed in by the artwork's own margins. */}
        <div
          aria-hidden
          className="word-games-background-Images absolute inset-y-0 left-1/2 -z-10 w-screen max-w-10xl -translate-x-1/2"
        />

        {/* Every measure below lg is in cqw/em off this band, so the copy
            scales in lockstep with the stretched artwork behind it: the books
            always start at 42% across and the text always stops short of
            them, at any window size or zoom level. */}
        <div className="flex h-full w-full items-center px-6 py-14 sm:py-16 lg:py-[2cqw]">
          {/* This element is the scale root — its font-size drives every `em`
              and `ch` measure inside, so one number moves the whole block. */}
          <div className="mx-auto flex w-full max-w-[540px] flex-col items-center text-center text-[17px] lg:mx-0 lg:w-[36cqw] lg:max-w-none lg:text-[1.25cqw]">
            <Image
              src="/WordGames/HeaderUpperLayer.png"
              alt=""
              width={388}
              height={87}
              className="h-auto w-[14.5em] sm:w-[18em] lg:w-[72%]"
              priority
            />

            {/* Playfair sets larger on the body than Cormorant, so the sizes here
                come down a step. The em measure forces the line break. */}
            <h1 className="mt-[0.5em] max-w-[7.2em] font-display text-[2.2em] leading-[1.1] font-bold text-[#223574] sm:text-[2.85em] lg:text-[3.5em]">
              Faith-Filled Word Search & Puzzle Books
            </h1>

            <Image
              src="/WordGames/HeaderMiddleLayer.png"
              alt=""
              width={436}
              height={7}
              className="mt-[1.1em] h-auto w-[436px] max-w-full"
              priority
            />

            <p className="mt-[1.1em] max-w-[32ch] text-[1.08em] leading-snug font-medium text-[#223574] sm:text-[1.25em] lg:text-[1.7em]">
              Inspiring word searches and puzzles that illuminate God&apos;s
              Word.
            </p>

            <NewsletterSignup />
          </div>
        </div>
      </div>
    </section>
  );
}
