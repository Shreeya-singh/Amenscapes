import Image from "next/image";

const PILLARS = [
  {
    title: "Drawn from Scripture",
    body: "Every grid, clue and panel comes straight out of the Word.",
  },
  {
    title: "Made to be kept",
    body: "Ornate covers and artwork worth leaving out on the table.",
  },
  {
    title: "Open to everyone",
    body: "Gentle for a first word search, deep for a lifelong reader.",
  },
];

export default function AboutAmenscapes() {
  return (
    <section
      id="About"
      className="bg-paper px-5 py-12 sm:px-6 sm:py-16 lg:py-20"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex items-center justify-center gap-2">
          <Image
            src="/WordALight/VectorLeft.png"
            alt=""
            aria-hidden
            width={90}
            height={41}
            className="h-auto w-[34px] sm:w-[48px] lg:w-[60px]"
          />
          <h2 className="text-[26px] leading-none font-bold tracking-[0.04em] text-[#263B7C] uppercase sm:text-[34px] lg:text-[40px]">
            About Us
          </h2>
          <Image
            src="/WordALight/VectorRight.png"
            alt=""
            aria-hidden
            width={90}
            height={41}
            className="h-auto w-[34px] sm:w-[48px] lg:w-[60px]"
          />
        </div>

        <p className="mx-auto mt-4 max-w-[42ch] text-center text-[16px] leading-relaxed font-semibold text-pretty text-ink/70 sm:mt-5 sm:max-w-[58ch] sm:text-[19px]">
          Amenscapes began with a simple thought: that time spent with Scripture
          can also be time spent playing. We make word searches, puzzles and
          keepsakes that turn familiar verses into something you sit with and
          solve.
        </p>

        <Image
          src="/WordGames/HeaderMiddleLayer.png"
          alt=""
          aria-hidden
          width={436}
          height={7}
          className="mx-auto mt-6 h-auto w-[240px] max-w-full sm:mt-7 sm:w-[360px]"
        />

        <ul className="mt-8 grid gap-6 sm:mt-9 sm:gap-7 lg:grid-cols-3 lg:gap-0">
          {PILLARS.map((pillar, i) => (
            <li
              key={pillar.title}
              className="relative flex flex-col items-center border-t border-gold/20 pt-6 text-center first:border-t-0 first:pt-0 sm:border-t-0 sm:pt-0 lg:px-8"
            >
              {i > 0 && (
                <Image
                  src="/WordALight/VectorCenter.png"
                  alt=""
                  aria-hidden
                  width={55}
                  height={87}
                  className="absolute top-0 -left-4 hidden h-auto w-[26px] lg:block"
                />
              )}

              <div className="flex flex-col items-center gap-3">
                <h3 className="text-[21px] leading-tight font-bold text-[#263B7C] sm:text-[24px]">
                  {pillar.title}
                </h3>
                <div
                  aria-hidden
                  className="h-px w-14 border border-[#C99237] sm:w-16"
                />
                <p className="max-w-[32ch] text-[16px] leading-relaxed font-semibold text-[#263B7C]/70 sm:text-[17px]">
                  {pillar.body}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <div className="hidden md:block mt-10 rounded-[20px] bg-[#263B7C] px-5 py-8 text-center shadow-[0_18px_50px_rgba(21,42,80,0.18)] sm:mt-11 sm:rounded-[28px] sm:px-10 sm:py-9">
          <p className="text-[11px] font-bold tracking-[0.22em] text-[#FFCD79] uppercase sm:text-[12px]">
            Our mission
          </p>
          <div
            aria-hidden
            className="mx-auto mt-3 h-px w-14 bg-[#FFCD79]/50 sm:w-16"
          />
          <p className="mx-auto mt-4 max-w-[24ch] text-[22px] leading-snug font-bold text-balance text-cream sm:max-w-[40ch] sm:text-[27px]">
            To illuminate God&apos;s Word through play — one puzzle, one page,
            one quiet moment at a time.
          </p>
        </div>
      </div>
    </section>
  );
}
