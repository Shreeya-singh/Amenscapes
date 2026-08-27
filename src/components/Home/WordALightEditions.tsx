import Image from "next/image";
import Link from "next/link";
import { WORDALIGHT, type Edition } from "@/content/WordALightEditions";

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
    <div className="group grid flex-1 grid-cols-1 justify-items-center gap-4 rounded-[20px] bg-[#FBF8F2] px-4 py-7 text-center shadow-[0_18px_50px_rgba(21,42,80,0.10)] sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center sm:justify-items-start sm:gap-8 sm:rounded-[32px] sm:px-8 sm:py-14 sm:text-left xl:gap-10 xl:px-12 xl:py-16 2xl:gap-12 2xl:px-14 2xl:py-[4.5rem]">
      <div className="relative">
        <Image
          src={src}
          alt={WORDALIGHT.editionAlt(title)}
          width={width}
          height={height}
          sizes="(max-width: 640px) 50vw, (max-width: 1280px) 210px, (max-width: 1536px) 240px, 270px"
          className="h-auto w-[150px] max-w-full transition-transform duration-300 group-hover:-translate-y-1 sm:w-[210px] xl:w-[240px] 2xl:w-[270px]"
        />
        <div
          aria-hidden
          className="absolute inset-x-2 -bottom-2 h-3 rounded-[50%] bg-ink/20 blur-md xl:inset-x-3 xl:-bottom-3 xl:h-4"
        />
      </div>

      <div className="min-w-0">
        <h3 className="text-[23px] leading-tight font-bold text-[#223574] sm:text-[32px] lg:text-[38px]">
          {title}
        </h3>
        <div
          aria-hidden
          className="mx-auto mt-2 h-px w-14 border border-[#C99237] sm:mx-0 xl:mt-4 xl:w-12"
        />
        <p className="mx-auto mt-3 max-w-[21ch] text-[16px] leading-snug font-semibold whitespace-pre-line text-[#535B70] sm:mx-0 sm:mt-4 sm:max-w-[16ch] sm:text-[19px] lg:text-[26px]">
          {blurb}
        </p>

        {href && cta ? (
          <Link
            href={href}
            className="text-[#FBF8F2] mt-5 inline-flex min-h-11 items-center justify-center rounded-full bg-gold px-4 py-3 text-center text-[15px] font-bold whitespace-nowrap text-cream sm:mt-6 sm:text-[16px] transition-transform hover:scale-[1.04] focus-visible:ring-2 focus-visible:ring-gold/70 focus-visible:outline-none"
          >
            {cta}
          </Link>
        ) : (
          <p className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full border-2 border-[#C99237] px-4 py-3 text-[12px] sm:mt-6 font-bold font-display tracking-[0.18em] whitespace-nowrap text-[#C99237] uppercase sm:text-[14px]">
            {WORDALIGHT.comingSoon}
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
        <div className="flex items-end justify-center gap-3 sm:gap-5">
          <Image
            src="/WordALight/VectorLeft.png"
            alt=""
            aria-hidden
            width={100}
            height={41}
            className="h-auto w-[38px] sm:w-[54px] lg:w-[78px]"
          />
          <h2 className="font-display text-[26px] leading-none font-bold tracking-[0.04em] text-[#223574] uppercase sm:text-[36px] lg:text-[46px]">
            {WORDALIGHT.heading}
          </h2>
          <Image
            src="/WordALight/VectorRight.png"
            alt=""
            aria-hidden
            width={100}
            height={41}
            className="h-auto w-[38px] sm:w-[54px] lg:w-[78px]"
          />
        </div>

        <p className="mx-auto mt-2 max-w-[26ch] text-center text-[17px] leading-snug font-semibold text-[#223574]/70 sm:max-w-none sm:text-[19px]">
          {WORDALIGHT.tagline}
        </p>

        <div className="mt-3 flex justify-center">
          <Link
            href={WORDALIGHT.playHref}
            className="inline-flex min-h-11 items-center rounded-full bg-[#223574] px-7 py-3 text-[16px] font-bold text-[#FFCD79] underline underline-offset-4 sm:px-5 sm:py-3 sm:text-[17px] transition-transform hover:scale-[1.04] border-2 border-[#C99237] lg:text-[20px]"
          >
            {WORDALIGHT.playCta}
          </Link>
        </div>
      

        <div className="mt-8 flex flex-col items-stretch gap-5 sm:mt-14 sm:gap-8 xl:flex-row xl:items-center xl:gap-8 2xl:gap-10">
          <EditionCard {...WORDALIGHT.editions[0]} />

          <Image
            src="/WordALight/VectorCenter.png"
            alt=""
            aria-hidden
            width={55}
            height={87}
            className="mx-auto h-auto w-[34px] shrink-0 sm:w-[56px] xl:w-[64px] 2xl:w-[76px]"
          />

          <EditionCard {...WORDALIGHT.editions[1]} />
        </div>
      </div>
    </section>
  );
}
