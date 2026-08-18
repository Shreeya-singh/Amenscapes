"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";

type Status = "idle" | "subscribing" | "success" | "error";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("subscribing");

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="relative flex min-h-svh items-center justify-center overflow-hidden bg-brand px-4 pt-24 pb-16 sm:px-6">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-24 size-[420px] rounded-full bg-white/30 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -bottom-32 size-[480px] rounded-full bg-brand-deep/25 blur-3xl"
      />

      <div className="relative w-full max-w-[460px]">
        <div className="overflow-hidden rounded-[32px] bg-white shadow-[0_24px_60px_rgba(29,78,216,0.22)]">
          <div className="bg-[linear-gradient(180deg,#e8f2ff_0%,#ffffff_70%)] px-8 pt-8 pb-2 sm:px-10 sm:pt-10">
            <div className="flex justify-center">
              <Image
                src="/Amenscapes/WebsiteLogo.png"
                alt="Amenscapes"
                width={653}
                height={396}
                className="h-[52px] w-auto object-contain"
                priority
              />
            </div>

            <p className="mt-6 text-center text-[11px] font-bold tracking-[0.22em] text-brand-ink uppercase">
              Newsletter
            </p>
            <h1 className="mt-2 text-center text-[30px] leading-tight font-bold text-black sm:text-[34px]">
              Stay in the loop 🎮
            </h1>
            <p className="mx-auto mt-3 max-w-[340px] text-center text-[15px] leading-relaxed text-[#5a5a5a]">
              New games, challenges, and drops — straight to your inbox.
            </p>
          </div>

          <div className="px-8 pt-6 pb-8 sm:px-10 sm:pb-10">
            {status === "success" ? (
              <div className="flex flex-col items-center py-4 text-center">
                <span className="grid size-14 place-items-center rounded-full bg-[#e8f8ee] text-[#16794a]">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d="M5 12.5 10 17.5 19 7.5"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <p className="mt-4 text-[18px] font-bold text-black">You&apos;re in.</p>
                <p className="mt-1 text-[14px] leading-relaxed text-[#5a5a5a]">
                  Check your email to confirm the subscription.
                </p>
                <Link
                  href="/"
                  className="mt-6 inline-flex h-[48px] items-center rounded-full bg-black px-6 text-[15px] font-bold text-white transition-transform hover:scale-[1.03]"
                >
                  Back to games
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-[#9aa3af]">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
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
                      if (status === "error") setStatus("idle");
                    }}
                    required
                    autoComplete="email"
                    className="h-[54px] w-full rounded-[14px] border border-black/10 bg-[#f4f7fb] pr-4 pl-12 text-[16px] text-black outline-none transition-colors placeholder:text-[#9aa3af] focus:border-brand-ink focus:bg-white focus:ring-4 focus:ring-brand/40"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "subscribing"}
                  className="h-[54px] rounded-[14px] bg-black text-[16px] font-bold text-white shadow-[0_8px_20px_rgba(0,0,0,0.18)] transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === "subscribing" ? "Subscribing..." : "Sign up with email"}
                </button>

                {status === "error" && (
                  <p className="rounded-[12px] bg-red-50 px-3 py-2 text-center text-[13px] font-medium text-red-600">
                    Something went wrong. Please try again.
                  </p>
                )}

                <p className="mt-1 text-center text-[12px] text-[#8a8a8a]">
                  No spam. Unsubscribe anytime.
                </p>
              </form>
            )}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-3">
          <p className=" text-[12px] leading-snug font-medium text-white/90">
            First access to new Amenscapes games.
          </p>
        </div>
      </div>
    </section>
  );
}
