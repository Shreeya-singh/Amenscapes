import Image from "next/image";

const PHOTO = {
  src: "/Tshirt/tshirt_mockup.png",
  alt: "Amenscapes tee, printed with the Nativity fill-in-the-blank panel",
};

export default function ApparelComingSoon() {
  return (
    /* No padding on the section: from lg the photograph runs the full height
       of the band, so the two columns carry their own padding instead. */
    <section id="t-shirt" className="bg-[#F7F0E7]">
      {/* Same measure as the sections above. The photograph column is capped
          rather than fractional, so the section never grows taller than the
          copy needs on a wide screen. */}
      <div className="mx-auto grid w-full max-w-7xl lg:grid-cols-[minmax(0,1fr)_minmax(0,720px)]">
        <div className="flex flex-col items-center justify-between lg:mt-18 lg:mb-28 px-5 pt-12 pb-9 text-center sm:px-6 sm:pt-16 sm:pb-12 lg:items-start lg:py-20 lg:pr-14 lg:text-left">
          {/* Cormorant runs optically small, so the display size sits high. */}
          <div className="flex flex-col items-center sm:items-start">
            <h2 className="text-[40px] leading-none font-bold font-display text-[#223574] sm:text-[52px] lg:text-[58px]">
              Apparel
            </h2>
            <p className="mt-4 rounded-full border border-2 border-[#C99237] px-5 py-2 text-[12px] font-bold font-display tracking-[0.18em] text-[#C99237] uppercase sm:mt-5 sm:text-[14px] sm:tracking-[0.22em]">
              Coming soon
            </p>
          </div>

          <div className="flex flex-col items-center sm:items-start">
            <p className="mt-6 max-w-[30ch] text-[17px] leading-relaxed font-semibold text-[#4C5870] sm:mt-7 sm:max-w-[30ch] sm:text-[24px]">
              Wear your faith. Beautiful Christian-inspired designs that speak
              hope and truth.
            </p>

            <div
              aria-hidden
              className="mt-7 h-px w-14 border border-[#C99237] sm:mt-10 sm:w-16"
            />
          </div>

          {/* The tracking is eased off on a phone so the line still fits on
              one row at 360px. */}
          <p className="mt-6 text-[11px] font-bold font-display tracking-[0.1em] text-[#C99237] uppercase sm:mt-7 sm:text-[12px] sm:tracking-[0.18em]">
            ONE PANEL. ONE MESSAGE. AMENSCAPES.
          </p>
        </div>

        {/* Stacked, the frame keeps the mockup's own ratio and is inset from
            the screen edge the way the images in the sections above are; from
            lg it goes flush and stretches to the band's height, cropping to
            fill. The min-height floors that band so a short copy column cannot
            squash the print. The shadow is drawn unoffset because at that size
            the frame is flush with the top and bottom of the band, so it only
            ever shows down the two sides. */}
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
