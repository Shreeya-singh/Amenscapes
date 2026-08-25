export default function DownloadPDF({ status, cancel }) {
  const already = status === "alreadySubscribed";

  return (
    <div className="relative flex w-full flex-col items-center gap-4 rounded-[28px] bg-white px-5 py-6 pt-12 ring-1 ring-ink/10 shadow-[0_12px_30px_-10px_rgba(21,42,80,0.35)] sm:gap-3 sm:px-6 sm:py-5 sm:pt-8">
      <button
        type="button"
        onClick={cancel}
        aria-label="Close"
        className="absolute top-2 right-2 flex size-11 items-center justify-center rounded-full bg-ink/10 text-ink/70 transition-colors hover:bg-ink/20 hover:text-ink sm:size-8"
      >
        <svg className="size-5 sm:size-3.5" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M6 6l12 12M18 6 6 18"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </svg>
      </button>
      <p className="text-center text-[18px] font-semibold text-ink sm:text-[17px]">
        {already
          ? "You're already subscribed."
          : "Thanks for subscribing. Download the PDF below."}
      </p>
      <a
        href="/test.pdf"
        download="test.pdf"
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-ink px-6 text-[13px] font-semibold tracking-[0.14em] text-white uppercase transition-colors hover:bg-ink-deep sm:h-[46px] sm:w-auto"
      >
        <svg className="size-5 sm:size-4" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 4v12m0 0 4-4m-4 4-4-4M5 19h14"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Download PDF
      </a>
      
    </div>
  );
}
