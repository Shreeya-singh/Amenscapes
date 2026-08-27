"use client";

import { useEffect, useRef } from "react";
import { DOWNLOAD_PDF } from "@/content/DownloadPDF";

type DownloadPDFProps = {
  status: "success" | "alreadySubscribed";
  active: boolean;
  cancel: () => void;
};

export default function DownloadPDF({ status, active, cancel }: DownloadPDFProps) {
  const already = status === "alreadySubscribed";
  const card = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (active) card.current?.focus({ preventScroll: true });
  }, [active]);

  return (
    <div
      ref={card}
      role="status"
      aria-live="polite"
      tabIndex={-1}
      className="relative flex w-full flex-col items-center gap-[0.7em] rounded-[1.5em] bg-white px-[1.2em] py-[1.1em] ring-1 ring-ink/10 shadow-[0_0.7em_1.8em_-0.6em_rgba(21,42,80,0.35)] outline-none"
    >
      <button
        type="button"
        onClick={cancel}
        aria-label={DOWNLOAD_PDF.closeLabel}
        className="absolute top-[0.45em] right-[0.45em] flex size-[1.9em] items-center justify-center rounded-full text-ink/60 transition-colors hover:bg-ink/10 hover:text-ink focus-visible:bg-ink/10 focus-visible:text-ink"
      >
        <svg className="size-[0.85em]" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M6 6l12 12M18 6 6 18"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <p className="max-w-[22ch] px-[1.4em] text-center text-[0.95em] leading-snug font-semibold text-balance text-ink">
        {already ? DOWNLOAD_PDF.alreadySubscribed : DOWNLOAD_PDF.success}
      </p>

      <a
        href={DOWNLOAD_PDF.href}
        download={DOWNLOAD_PDF.filename}
        className="inline-flex items-center justify-center gap-[0.5em] rounded-full bg-ink px-[1.6em] py-[0.85em] text-[0.8em] font-semibold tracking-[0.14em] text-white uppercase transition-colors hover:bg-ink-deep"
      >
        <svg className="size-[1.15em]" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 4v12m0 0 4-4m-4 4-4-4M5 19h14"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {DOWNLOAD_PDF.cta}
      </a>
    </div>
  );
}
