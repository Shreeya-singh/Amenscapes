import Image from "next/image";
import { Flourish, OliveBranch, PlusMark } from "@/components/ui/Ornaments";

type Spread = {
  src: string;
  alt: string;
  /** Intrinsic size of the page render. */
  width: number;
  height: number;
};

/** Placeholder art — swap in the bento page spreads when they land. */
const SPREADS: Spread[] = [
  {
    src: "/Amenscapes/Bent-o-Box_Phone1.jpg",
    alt: "Bent-o-Box puzzle page, the Last Supper",
    width: 768,
    height: 1152,
  },
  {
    src: "/Amenscapes/Bent-o-Box_Phone2.jpg",
    alt: "Bent-o-Box puzzle page, the bread and the cup",
    width: 768,
    height: 1152,
  },
];

export default function BentoBoxComingSoon() {
  return (
    <section id="bentobox" className="bg-cream px-6 py-14 sm:py-20">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-10">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <Flourish className="w-[58px] text-gold sm:w-[74px]" flip />
            {/* Cormorant runs optically small, so the display size sits high. */}
            <h2 className="text-[38px] leading-none font-bold text-ink sm:text-[52px]">
              Bentobox
            </h2>
            <Flourish className="w-[58px] text-gold sm:w-[74px]" />
          </div>

          <p className="mt-5 rounded-full border border-gold/70 px-6 py-2 text-[13px] font-semibold tracking-[0.22em] text-gold uppercase sm:text-[14px]">
            Coming soon
          </p>

          <PlusMark className="mt-7 w-5 text-gold" />

          <p className="mt-4 max-w-[32ch] text-[18px] leading-relaxed font-semibold text-ink/70 sm:text-[20px]">
            A beautiful puzzle &amp; activity experience inspired by Scripture,
            faith, and timeless stories.
          </p>

          <OliveBranch className="mt-7 h-[74px] w-auto text-gold sm:h-[86px]" />
        </div>

        {/* Two pages, shown side by side as they read in the book. */}
        <div className="flex items-center justify-center gap-4 sm:gap-7">
          {SPREADS.map((spread) => (
            <Image
              key={spread.src}
              src={spread.src}
              alt={spread.alt}
              width={spread.width}
              height={spread.height}
              sizes="(max-width: 1024px) 45vw, 300px"
              /* Height-driven from sm up; below it the pair is sized off the
                 viewport instead, because two 240px-tall spreads plus the gap
                 are wider than a 320px screen and scrolled the page sideways. */
              className="h-auto w-[42vw] shrink-0 rounded-[3px] shadow-[0_14px_40px_rgba(21,42,80,0.16)] sm:h-[320px] sm:w-auto lg:h-[360px]"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
