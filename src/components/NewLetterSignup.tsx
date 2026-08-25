"use client";

import { FormEvent, useState } from "react";
import { z } from "zod";
import DownloadPDF from "./DownloadPDF";


type Status = "idle" | "subscribing" | "success" | "error" | "invalid" | "alreadySubscribed";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const parsed = z.email().safeParse(email.trim());
    if (!parsed.success) {
      setStatus("invalid");
      return;
    }

    setStatus("subscribing");

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: parsed.data }),
      });

      if (response.ok) {
        setStatus("success");
        setEmail("");
      } else if(response.status === 409) {
        setStatus("alreadySubscribed");
      }else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div id="signup" className="mt-7 w-full max-w-md scroll-mt-24 sm:mt-8">
      {status === "success" || status === "alreadySubscribed" ? (
        <DownloadPDF status={status} cancel={() => setStatus("idle")} />
      ) : (
        <form noValidate onSubmit={handleSubmit} className="flex flex-col items-center gap-2">
          <div className="flex w-full items-center rounded-full bg-white p-1.5 ring-1 ring-ink/10 shadow-[0_12px_30px_-10px_rgba(21,42,80,0.35)]">
            <label htmlFor="newsletter-email" className="sr-only">
              Email
            </label>
            <span className="pointer-events-none ml-3 shrink-0 text-ink/70 sm:ml-4">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <rect
                  x="3"
                  y="5"
                  width="18"
                  height="14"
                  rx="2.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <path
                  d="M4 7.5 12 13l8-5.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <input
              id="newsletter-email"
              type="email"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "error" || status === "invalid") setStatus("idle");
              }}
              autoComplete="email"
              className="min-w-0 flex-1 bg-transparent px-3 py-3 text-[16px] text-ink outline-none placeholder:text-ink/70 sm:text-[17px]"
            />
            <button
              type="submit"
              disabled={status === "subscribing"}
              className="flex h-[46px] shrink-0 items-center gap-2 rounded-full bg-ink px-5 text-[12px] font-bold tracking-[0.14em] text-white uppercase transition-colors hover:bg-ink-deep disabled:cursor-not-allowed disabled:opacity-70 sm:px-6 sm:text-[13px]"
            >
              {status === "subscribing" ? "..." : "Sign up"}
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path
                  d="M3 8h9m0 0L8.6 4.6M12 8l-3.4 3.4"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          {status === "invalid" && (
            <p className="text-[13px] font-medium text-red-700">
              Enter a valid email.
            </p>
          )}
          {status === "error" && (
            <p className="text-[13px] font-medium text-red-700">
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      )}
    </div>
  );
}
