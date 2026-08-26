"use client";

import Image from "next/image";
import NewsletterSignup from "@/components/NewLetterSignup";

export default function WordGames() {
  return (
    <section className="relative isolate overflow-hidden bg-cream">
      {/* The band matches the navbar's max-w-8xl, so the artwork and the copy
          sit on the same measure as the logo and links above them. From lg up
          it carries the artwork's own ratio and the photograph is a full-bleed
          backdrop; below lg there is no room to set copy beside the books, so
          the band becomes a plain column — copy first, artwork under it. */}
      <div className="@container relative mx-auto flex w-full max-w-8xl flex-col lg:block lg:aspect-[1440/900]">
        {/* Photograph + its white scrim, on their own layer so the copy is
            never boxed in by the artwork's own margins. Desktop only: the
            mobile column renders the same photograph as a real <Image> below,
            where it can be cropped to the books instead of to empty wall. */}
        <div
          aria-hidden
          className="word-games-background-Images pointer-events-none absolute inset-y-0 left-1/2 -z-10 hidden w-screen max-w-10xl -translate-x-1/2 lg:block"
        />

        {/* Every measure from lg up is in cqw/em off this band, so the copy
            scales in lockstep with the stretched artwork behind it: the books
            always start at 42% across and the text always stops short of
            them, at any window size or zoom level. */}
        <div className="flex w-full items-center px-5 pt-10 pb-9 sm:px-6 sm:pt-14 sm:pb-12 lg:h-full lg:px-6 lg:pt-[2cqw] lg:pb-[2cqw]">
          {/* This element is the scale root — its font-size drives every `em`
              and `ch` measure inside, so one number moves the whole block. The
              mobile clamp bottoms out at 15px so the `em`-measured headline
              still fits a 320px screen, and tops out at the 17px the tablet
              and desktop steps were drawn against. */}
          <div className="mx-auto flex w-full max-w-[540px] flex-col items-center text-center text-[clamp(15px,4.1vw,17px)] lg:mx-0 lg:w-[36cqw] lg:max-w-none lg:text-[1.25cqw]">
            <Image
              src="/WordGames/HeaderUpperLayer.png"
              alt=""
              width={358}
              height={87}
              className="h-auto w-[13.5em] sm:w-[18em] lg:w-[72%]"
              priority
            />

            {/* Playfair sets larger on the body than Cormorant, so the sizes here
                come down a step. The em measure forces the line break. */}
            <h1 className="mt-[0.5em] max-w-[7.2em] font-display text-[2.15em] leading-[1.12] font-bold text-balance text-[#223574] sm:text-[2.85em] sm:leading-[1.1] lg:text-[3.5em]">
              Faith-Filled Word Search & Puzzle Books
            </h1>

            <Image
              src="/WordGames/HeaderMiddleLayer.png"
              alt=""
              width={436}
              height={7}
              className="mt-[1.1em] h-auto w-[16em] max-w-full sm:w-[436px]"
              priority
            />

            <p className="mt-[1.1em] max-w-[32ch] text-[1.08em] leading-snug font-medium text-pretty text-[#223574] sm:text-[1.25em] lg:text-[1.7em]">
              Inspiring word searches and puzzles that illuminate God&apos;s
              Word.
            </p>

            <NewsletterSignup />
          </div>
        </div>

        {/* Mobile artwork. `cover` on a portrait band would crop to bare wall,
            so the crop is nudged right to hold both books, and the top edge is
            feathered into the cream the copy sits on. */}
        <div className="relative w-full lg:hidden">
          <Image
            src="/WordGames/HeroSection.png"
            alt="Two Bible WordaLight puzzle books standing on a table"
            width={1440}
            height={760}
            className="h-[62vw] max-h-[340px] min-h-[210px] w-full object-cover object-[62%_center]"
            priority
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-cream to-transparent"
          />
        </div>
      </div>
    </section>
  );
}
