import Image from "next/image";

const PHOTO = {
  src: "/Tshirt/tshirt_mockup.png",
  alt: "Amenscapes tee, printed with the Nativity fill-in-the-blank panel",
};

export default function ApparelComingSoon() {
  return (
    <section id="t-shirt" className="bg-[#F7F0E7]">
      <div className="mx-auto grid w-full max-w-7xl lg:grid-cols-[minmax(0,1fr)_minmax(0,720px)]">
        <div className="flex flex-col items-center justify-between lg:mt-18 lg:mb-36 pt-12 pb-9 text-center sm:pt-16 sm:pb-12 lg:items-start lg:py-20 lg:pr-14 lg:text-left">
          <div className="flex flex-col items-center sm:items-start">
            <h2 className="text-[34px] leading-none font-bold font-display text-[#223574] sm:text-[52px] lg:text-[58px]">
              Apparel
            </h2>
            <p className="mt-4 rounded-full border-2 border-[#C99237] px-5 py-2 text-[11px] font-bold font-display tracking-[0.18em] text-[#C99237] uppercase sm:mt-5 sm:text-[14px] sm:tracking-[0.22em]">
              Coming soon
            </p>
          </div>

          <div className="flex flex-col items-center sm:items-start">
          <p className="mt-5 max-w-[30ch] font-display text-[17px] leading-relaxed text-[#4C5870] sm:mt-8 sm:max-w-[24ch] sm:text-[20px]">
              Wear your faith. Beautiful Christian-inspired designs that speak
              hope and truth.
            </p>

            <div
              aria-hidden
              className="mt-6 h-px w-14 border border-[#C99237] sm:mt-10 sm:w-16"
            />
          </div>

          <p className="mt-6 text-[10px] font-bold font-display tracking-[0.06em] text-[#C99237] uppercase sm:mt-7 sm:text-[12px] sm:tracking-[0.18em]">
            ONE PANEL. ONE MESSAGE. AMENSCAPES.
          </p>
        </div>

        <div className="relative mx-5 mb-12 aspect-[736/760] rounded-[4px] shadow-[0_0_38px_rgba(21,42,80,0.16)] sm:mx-auto sm:mb-16 sm:w-full sm:max-w-[420px] lg:mx-0 lg:mb-0 lg:aspect-auto lg:h-full lg:max-w-none lg:min-h-[760px] lg:rounded-none">
          <Image
            src={PHOTO.src}
            alt={PHOTO.alt}
            fill
            sizes="(max-width: 640px) calc(100vw - 2.5rem), (max-width: 1024px) 420px, 720px"
            className="rounded-[inherit] object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
}
