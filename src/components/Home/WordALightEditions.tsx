import Image from "next/image";
import { Flourish } from "@/components/ui/Ornaments";

type Edition = {
  title: string;
  blurb: string;
  src: string;
  width: number;
  height: number;
};

const EDITIONS: Edition[] = [
  {
    title: "Traditional",
    blurb: "Classic ornate edition.",
    src: "/Amenscapes/Edition_Traditional.png",
    width: 342,
    height: 579,
  },
  {
    title: "Minimal / Baptist",
    blurb: "Clean minimal edition.",
    src: "/Amenscapes/Edition_Minimal.png",
    width: 328,
    height: 582,
  },
];

function EditionCard({ title, blurb, src, width, height }: Edition) {
  return (
    <div className="group flex flex-1 items-center justify-center gap-6 sm:gap-8">
      <div className="relative shrink-0">
        <Image
          src={src}
          alt={`Bible WordaLight — ${title} edition`}
          width={width}
          height={height}
          sizes="(max-width: 640px) 45vw, 240px"
          className="h-auto w-[130px] transition-transform duration-300 group-hover:-translate-y-1 sm:w-[200px]"
        />
        {/* Floor shadow the books used to carry baked into the mockup. */}
        <div
          aria-hidden
          className="absolute inset-x-2 -bottom-2 h-3 rounded-[50%] bg-ink/20 blur-md"
        />
      </div>

      <div className="max-w-[15ch]">
        <h3 className="text-[22px] leading-tight font-bold text-ink sm:text-[28px]">
          {title}
        </h3>
        <div aria-hidden className="mt-2 h-px w-12 bg-gold sm:w-16" />
        <p className="mt-3 text-[15px] leading-snug font-semibold text-ink/70 sm:text-[17px]">
          {blurb}
        </p>
      </div>
    </div>
  );
}

export default function WordALightEditions() {
  return (
    <section id="wordalight" className="bg-cream-deep px-6 py-14 sm:py-20">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex items-center justify-center gap-3 sm:gap-5">
          <Flourish className="w-[68px] text-gold sm:w-[92px]" flip />
          <h2 className="text-[32px] leading-none font-bold tracking-[0.04em] text-ink uppercase sm:text-[44px]">
            WordaLight
          </h2>
          <Flourish className="w-[68px] text-gold sm:w-[92px]" />
        </div>

        <p className="mt-3 text-center text-[18px] font-semibold text-ink/70 sm:text-[21px]">
          Discover God&apos;s Word, one puzzle at a time.
        </p>

        <div className="mt-10 flex flex-col items-stretch gap-10 sm:mt-14 sm:flex-row sm:gap-6">
          <EditionCard {...EDITIONS[0]} />

          {/* Gold hairline with the cross at its centre, splitting the pair. */}
          <div
            aria-hidden
            className="relative flex shrink-0 items-center justify-center self-stretch"
          >
            <div className="h-px w-full bg-linear-to-r from-transparent via-gold to-transparent sm:h-full sm:w-px sm:bg-linear-to-b" />
            <span className="absolute bg-cream-deep px-2 py-1.5">
              <svg viewBox="0 0 14 22" className="w-3 text-gold" fill="none">
                <g
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                >
                  <path d="M7 2v18" />
                  <path d="M1.5 7.5h11" />
                </g>
              </svg>
            </span>
          </div>

          <EditionCard {...EDITIONS[1]} />
        </div>
      </div>
    </section>
  );
}
