import Image from "next/image";

type Spread = {
  src: string;
  alt: string;
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
      <div className="mx-auto grid w-full max-w-7xl gap-7 sm:gap-12 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,2fr)] lg:items-start lg:gap-16">
        <div className="flex flex-col items-center text-center lg:items-start lg:pt-2 lg:text-left">
          <h2 className="text-[34px] leading-none font-bold font-display text-[#223574] sm:text-[52px] lg:text-[62px]">
            Bentobox
          </h2>

          <p className="mt-4 rounded-full border-2 border-[#C99237] px-5 py-2 text-[11px] font-bold font-display tracking-[0.18em] text-[#C99237] uppercase sm:mt-5 sm:text-[14px] sm:tracking-[0.22em]">
            Coming soon
          </p>

          <p className="mt-5 max-w-[34ch] font-display text-[17px] leading-relaxed text-[#4C5870] sm:mt-8 sm:text-[20px]">
            A beautiful puzzle & activity experience inspired by Scripture,
            faith, and timeless stories.
          </p>

          <div aria-hidden className="mt-6 h-px w-14 border border-[#C99237] sm:mt-10 sm:w-16" />
        </div>

        <div className="grid justify-items-center gap-5 sm:grid-cols-2 sm:gap-6 sm:items-center lg:gap-8">
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
