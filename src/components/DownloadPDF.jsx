export default function DownloadPDF({ status, cancel }) {
  const already = status === "alreadySubscribed";

  return (
    <div className="relative flex w-full flex-col items-center gap-4 rounded-[28px] bg-white px-5 py-6 pt-12 shadow-[0_8px_24px_rgba(0,0,0,0.12)] sm:gap-3 sm:px-6 sm:py-5 sm:pt-8">
      <button
        type="button"
        onClick={cancel}
        aria-label="Close"
        className="absolute top-2 right-2 flex size-11 items-center justify-center rounded-full bg-black/10 text-black/70 transition-colors hover:bg-black/15 hover:text-black sm:size-8"
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
      <p className="text-center text-[17px] font-bold text-black sm:text-[16px]">
        {already
          ? "You're already subscribed."
          : "Thanks for subscribing. Download the PDF below."}
      </p>
      <a
        href="/test.pdf"
        download="test.pdf"
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-black px-6 text-[16px] font-bold text-white transition-transform hover:scale-[1.03] sm:h-[44px] sm:w-auto sm:text-[15px]"
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
