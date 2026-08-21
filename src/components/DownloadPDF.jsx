export default function DownloadPDF({ status, cancel }) {
  const already = status === "alreadySubscribed";

  return (
    <div className="relative flex w-full flex-col items-center gap-3 rounded-[28px] bg-white px-6 py-5 shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
      <button
        type="button"
        onClick={cancel}
        aria-label="Close"
        className="absolute top-2 right-2 flex size-8 items-center justify-center rounded-full text-black/50 transition-colors bg-black/10 hover:bg-black/5 hover:text-black"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M6 6l12 12M18 6 6 18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
      <p className="text-center text-[15px] font-bold text-black sm:text-[16px]">
        {already
          ? "You're already subscribed."
          : "You're subscribed — the next update will be in your email."}
      </p>
      <a
        href="/test.pdf"
        download="test.pdf"
        className="inline-flex h-[44px] items-center justify-center gap-2 rounded-full bg-black px-6 text-[14px] font-bold text-white transition-transform hover:scale-[1.03] sm:text-[15px]"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
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
