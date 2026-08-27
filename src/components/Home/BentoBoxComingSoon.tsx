import Image from "next/image";

type Spread = {
  src: string;
  alt: string;
  /** Intrinsic size of the page render. */
  width: number;
  height: number;
};

const SPREADS: Spread[] = [
  {
    src: "/Bentobox/bentobox_first.png",
    alt: "Bent-o-Box puzzle page, the Nativity",
    width: 409,
    height: 524,
  },
  {
    src: "/Bentobox/bentobox_second.png",
    alt: "Bent-o-Box puzzle page, the Last Supper",
    width: 409,
    height: 524,
  },
];

export default function BentoBoxComingSoon() {
  return (
    <section id="bentobox" className="bg-[#EFF6F8] px-5 py-12 sm:px-6 sm:py-20">
      {/* The spreads carry this section, so they take roughly two thirds of the
          measure and the copy runs as a narrow column beside them. */}
      <div className="mx-auto grid w-full max-w-7xl gap-9 sm:gap-12 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,2fr)] lg:items-start lg:gap-16">
        <div className="flex flex-col items-center text-center lg:items-start lg:pt-2 lg:text-left">
          {/* Cormorant runs optically small, so the display size sits high. */}
          <h2 className="text-[40px] leading-none font-bold font-display text-[#223574] sm:text-[52px] lg:text-[62px]">
            Bentobox
          </h2>

          <p className="mt-4 rounded-full border border-2 border-[#C99237] px-5 py-2 text-[12px] font-bold font-display tracking-[0.18em] text-[#C99237] uppercase sm:mt-5 sm:text-[14px] sm:tracking-[0.22em]">
            Coming soon
          </p>

          <p className="mt-6 max-w-[34ch] font-display text-[18px] leading-relaxed text-[#4C5870] sm:mt-8 ">
            A beautiful puzzle & activity experience inspired by Scripture,
            faith, and timeless stories.
          </p>

          <div aria-hidden className="mt-7 h-px w-14 border border-[#C99237] sm:mt-10 sm:w-16" />
        </div>

        {/* Two pages, shown side by side as they read in the book. Side by
            side on a phone each page lands near 150px wide and the puzzle text
            is unreadable, so below sm they stack and take the full column.
            From sm up they share the column evenly, scaling with it instead of
            being pinned to a height that would overflow a narrow desktop. */}
        <div className="grid justify-items-center gap-6 sm:grid-cols-2 sm:items-center lg:gap-8">
          {SPREADS.map((spread) => (
            <Image
              key={spread.src}
              src={spread.src}
              alt={spread.alt}
              width={spread.width}
              height={spread.height}
              sizes="(max-width: 640px) 84vw, (max-width: 1024px) 45vw, 33vw"
              className="h-auto w-full max-w-[330px] min-w-0 rounded-[3px] shadow-[0_14px_40px_rgba(21,42,80,0.16)] sm:max-w-[440px]"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
