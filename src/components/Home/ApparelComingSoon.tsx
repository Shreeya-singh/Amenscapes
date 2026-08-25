import Image from "next/image";
import { Flourish, OliveBranch, PlusMark } from "@/components/ui/Ornaments";

/** Placeholder art — swap in the apparel shot when it lands. */
const PHOTO = {
  src: "/Amenscapes/Apparel_TShirt.png",
  alt: "Amenscapes tee, printed with the Nativity lamb",
  width: 1200,
  height: 900,
};

export default function ApparelComingSoon() {
  return (
    <section id="t-shirt" className="bg-cream-deep px-6 py-14 sm:py-20">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-10">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <Flourish className="w-[58px] text-gold sm:w-[74px]" flip />
            {/* Cormorant runs optically small, so the display size sits high. */}
            <h2 className="text-[38px] leading-none font-bold text-ink sm:text-[52px]">
              Apparel
            </h2>
            <Flourish className="w-[58px] text-gold sm:w-[74px]" />
          </div>

          <p className="mt-5 rounded-full border border-gold/70 px-6 py-2 text-[13px] font-semibold tracking-[0.22em] text-gold uppercase sm:text-[14px]">
            Coming soon
          </p>

          {/* A hairline rule with the plus standing on it. */}
          <div className="mt-7 flex items-center gap-3 text-gold">
            <span className="h-px w-16 bg-gold/45 sm:w-[76px]" />
            <PlusMark className="w-4" />
            <span className="h-px w-16 bg-gold/45 sm:w-[76px]" />
          </div>

          <p className="mt-4 max-w-[32ch] text-[18px] leading-relaxed font-semibold text-ink/70 sm:text-[20px]">
            Wear your faith. Beautiful Christian-inspired designs that speak
            hope and truth.
          </p>

          <OliveBranch className="mt-7 h-[74px] w-auto text-gold sm:h-[86px]" />
        </div>

        <Image
          src={PHOTO.src}
          alt={PHOTO.alt}
          width={PHOTO.width}
          height={PHOTO.height}
          sizes="(max-width: 1024px) 92vw, 620px"
          className="h-auto w-full rounded-[4px] shadow-[0_14px_40px_rgba(21,42,80,0.16)]"
        />
      </div>
    </section>
  );
}
