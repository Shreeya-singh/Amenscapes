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
    <div id="signup" className="mt-[1.6em] w-full max-w-[26em] scroll-mt-24">
      {status === "success" || status === "alreadySubscribed" ? (
        <DownloadPDF status={status} cancel={() => setStatus("idle")} />
      ) : (
        <form
          noValidate
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-[0.5em]"
        >
          {/* Outlined pill from the comps. The arrow is absolutely placed so
              the placeholder stays optically centred in the field rather than
              being pushed left by a flex sibling. */}
          <div className="relative w-full rounded-full border-[0.09em] border-ink/70 bg-white/45 transition-colors focus-within:border-ink">
            <label htmlFor="newsletter-email" className="sr-only">
              Email
            </label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="Enter email address to download sample puzzle"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "error" || status === "invalid") setStatus("idle");
              }}
              autoComplete="email"
              className="w-full truncate rounded-full bg-transparent px-[2.4em] py-[0.85em] text-center text-[0.95em] text-ink italic outline-none placeholder:text-ink/70"
            />
            <button
              type="submit"
              disabled={status === "subscribing"}
              aria-label="Sign up"
              className="absolute top-1/2 right-[0.45em] flex size-[2.1em] -translate-y-1/2 items-center justify-center rounded-full text-gold transition-colors hover:bg-ink/5 hover:text-ink disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden
                className="size-[1.05em]"
              >
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
            <p className="text-[0.78em] font-medium text-red-700">
              Enter a valid email.
            </p>
          )}
          {status === "error" && (
            <p className="text-[0.78em] font-medium text-red-700">
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      )}
    </div>
  );
}
