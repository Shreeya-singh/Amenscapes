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
    <div id="signup" className="mt-4 mb-10 w-full max-w-[520px] scroll-mt-24 sm:mt-8 sm:mb-0">
      {status === "success" || status === "alreadySubscribed" ? (
        <DownloadPDF status={status} cancel={() => setStatus("idle")} />
      ) : (
        <form noValidate onSubmit={handleSubmit} className="flex flex-col items-center gap-2">
          <div className="flex w-full items-center rounded-full bg-white p-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.16)]">
            <label htmlFor="newsletter-email" className="sr-only">
              Email
            </label>
            <span className="pointer-events-none ml-3 shrink-0 text-[#9aa3af] sm:ml-4">
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
              className="min-w-0 flex-1 bg-transparent px-3 py-3 text-[15px] text-black outline-none placeholder:text-[#9aa3af] sm:text-[16px]"
            />
            <button
              type="submit"
              disabled={status === "subscribing"}
              className="h-[44px] shrink-0 rounded-full bg-black px-5 text-[14px] font-bold text-white transition-transform hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-70 sm:px-6 sm:text-[15px]"
            >
              {status === "subscribing" ? "..." : "Sign up"}
            </button>
          </div>
          {status === "invalid" && (
            <p className="text-center text-[13px] font-medium text-red-700">
              Enter a valid email.
            </p>
          )}
          {status === "error" && (
            <p className="text-center text-[13px] font-medium text-red-700">
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      )}
    </div>
  );
}
