import Image from "next/image";
import Link from "next/link";

/**
 * The two WordaLight editions, shown side by side with the gold cross
 * standing between them.
 */

/* TODO: point these at the live game and the Gumroad listing once they ship. */
const PLAY_HREF = "#";
const GUMROAD_HREF = "#";

type Edition = {
  title: string;
  /** The newline is deliberate — the card renders this `whitespace-pre-line`. */
  blurb: string;
  src: string;
  width: number;
  height: number;
  /** Absent while the edition is still unreleased — the card shows a badge. */
  href?: string;
  cta?: string;
};

const EDITIONS: Edition[] = [
  {
    title: "Traditional",
    blurb: "Classic ornate\nedition.",
    src: "/WordALight/bible_Left.png",
    width: 300,
    height: 451,
    href: GUMROAD_HREF,
    cta: "Buy eBook on Gumroad",
  },
  {
    title: "Minimal / Baptist",
    blurb: "Clean minimal\nedition.",
    src: "/WordALight/bible_Right.png",
    width: 300,
    height: 453,
  },
];

function EditionCard({
  title,
  blurb,
  src,
  width,
  height,
  href,
  cta,
}: Edition) {
  return (
    /* Two columns rather than a flex row: the book takes exactly the width it
       is given and the copy keeps the rest, so neither can squeeze the other. */
    <div className="group grid flex-1 grid-cols-1 justify-items-center gap-5 rounded-[24px] bg-[#FBF8F2] px-5 py-9 text-center shadow-[0_18px_50px_rgba(21,42,80,0.10)] sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center sm:justify-items-start sm:gap-8 sm:rounded-[32px] sm:px-8 sm:py-14 sm:text-left xl:gap-10 xl:px-12 xl:py-16 2xl:gap-12 2xl:px-14 2xl:py-[4.5rem]">
      <div className="relative">
        <Image
          src={src}
          alt={`WordaLight — ${title} edition`}
          width={width}
          height={height}
          sizes="(max-width: 640px) 50vw, (max-width: 1280px) 210px, (max-width: 1536px) 240px, 270px"
          className="h-auto w-[168px] max-w-full transition-transform duration-300 group-hover:-translate-y-1 sm:w-[210px] xl:w-[240px] 2xl:w-[270px]"
        />
        {/* Floor shadow the books used to carry baked into the mockup. */}
        <div
          aria-hidden
          className="absolute inset-x-2 -bottom-2 h-3 rounded-[50%] bg-ink/20 blur-md xl:inset-x-3 xl:-bottom-3 xl:h-4"
        />
      </div>

      <div className="min-w-0">
        <h3 className="text-[26px] leading-tight font-bold text-ink sm:text-[32px] xl:text-[38px] 2xl:text-[42px]">
          {title}
        </h3>
        <div
          aria-hidden
          className="mx-auto mt-3 h-px w-14 bg-gold sm:mx-0 sm:w-20 xl:mt-4 xl:w-24"
        />
        <p className="mx-auto mt-3.5 max-w-[21ch] text-[17px] leading-snug font-semibold whitespace-pre-line text-ink/70 sm:mx-0 sm:mt-4 sm:max-w-[16ch] sm:text-[19px] xl:mt-5 xl:max-w-[20ch] xl:text-[21px] 2xl:text-[22px]">
          {blurb}
        </p>

        {href && cta ? (
          <Link
            href={href}
            className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-gold px-6 py-3 text-center text-[14px] font-bold whitespace-nowrap text-cream transition-transform hover:scale-[1.04] focus-visible:ring-2 focus-visible:ring-gold/70 focus-visible:outline-none xl:mt-8 xl:px-7 xl:py-3.5 xl:text-[16px]"
          >
            {cta}
          </Link>
        ) : (
          <p className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full border border-gold/70 px-6 py-3 text-[12px] font-semibold tracking-[0.18em] whitespace-nowrap text-gold uppercase sm:text-[13px] xl:mt-8 xl:px-7 xl:py-3.5 xl:text-[14px]">
            Coming soon
          </p>
        )}
      </div>
    </div>
  );
}

export default function WordALightEditions() {
  return (
    <section id="wordalight" className="bg-paper px-5 py-12 sm:px-6 sm:py-20">
      <div className="mx-auto w-full max-w-6xl xl:max-w-[80rem] 2xl:max-w-[84rem]">
        <div className="flex items-center justify-center gap-2">
          <Image
            src="/WordALight/VectorLeft.png"
            alt=""
            aria-hidden
            width={90}
            height={41}
            className="h-auto w-[38px] sm:w-[54px] lg:w-[68px]"
          />
          <h2 className="text-[26px] leading-none font-bold tracking-[0.04em] text-ink uppercase sm:text-[36px] lg:text-[44px]">
            WordaLight
          </h2>
          <Image
            src="/WordALight/VectorRight.png"
            alt=""
            aria-hidden
            width={90}
            height={41}
            className="h-auto w-[38px] sm:w-[54px] lg:w-[68px]"
          />
        </div>

        <p className="mx-auto mt-3 max-w-[26ch] text-center text-[16px] leading-snug font-semibold text-ink/70 sm:mt-2 sm:max-w-none sm:text-[19px] lg:text-[21px]">
          Discover God&apos;s Word, one puzzle at a time.
        </p>

        <div className="mt-5 flex justify-center sm:mt-4">
          <Link
            href={PLAY_HREF}
            className="inline-flex min-h-11 items-center rounded-full bg-ink px-7 py-3 text-[16px] font-bold text-[#FFCD79] underline underline-offset-4 sm:px-7 sm:py-3 sm:text-[17px] transition-transform hover:scale-[1.04] focus-visible:ring-4 focus-visible:ring-[#FFCD79]/90 focus-visible:outline-none lg:text-[19px]"
          >
            Try the game NOW!
          </Link>
        </div>

        <div className="mt-9 flex flex-col items-stretch gap-7 sm:mt-14 sm:gap-8 xl:flex-row xl:items-center xl:gap-8 2xl:gap-10">
          <EditionCard {...EDITIONS[0]} />

          {/* The cross that separates the two editions. */}
          <Image
            src="/WordALight/VectorCenter.png"
            alt=""
            aria-hidden
            width={55}
            height={87}
            className="mx-auto h-auto w-[44px] shrink-0 sm:w-[56px] xl:w-[64px] 2xl:w-[76px]"
          />

          <EditionCard {...EDITIONS[1]} />
        </div>
      </div>
    </section>
  );
}
