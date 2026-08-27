"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { z } from "zod";
import DownloadPDF from "./DownloadPDF";
import { NEWSLETTER } from "@/content/NewsletterSignup";


type Status = "idle" | "subscribing" | "success" | "error" | "invalid" | "alreadySubscribed";


const PANE =
  "col-start-1 row-start-1 w-full ease-out transition-[opacity,transform] motion-reduce:transition-none motion-reduce:transform-none";
const PANE_IN = "opacity-100 translate-y-0 scale-100 duration-[380ms] delay-[110ms]";
const PANE_OUT =
  "pointer-events-none opacity-0 scale-[0.97] duration-[180ms] delay-0";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [placeholder, setPlaceholder] = useState<string>(NEWSLETTER.placeholderFull);

  const showCard = status === "success" || status === "alreadySubscribed";
  // The card stays mounted once shown (so closing it animates out) and latches the
  // status it was opened with, so its copy doesn't change mid-transition.
  const [cardStatus, setCardStatus] = useState<"success" | "alreadySubscribed" | null>(null);
  if ((status === "success" || status === "alreadySubscribed") && cardStatus !== status)
    setCardStatus(status);
  // Lags `showCard` by a frame so the card mounts hidden and then transitions in,
  // rather than popping in at full opacity on its first paint.
  const [cardVisible, setCardVisible] = useState(false);

  const formPane = useRef<HTMLDivElement>(null);
  const cardPane = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  // Height of whichever pane is showing, so the surrounding layout eases between
  // the two sizes instead of jumping the hero content down.
  const [height, setHeight] = useState<number | null>(null);

  useEffect(() => {
    const query = window.matchMedia("(width < 40rem)");
    const sync = () =>
      setPlaceholder(
        query.matches ? NEWSLETTER.placeholderShort : NEWSLETTER.placeholderFull,
      );
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!showCard || cardVisible) return;
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setCardVisible(true));
    });
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, [showCard, cardVisible]);

  useEffect(() => {
    const measure = () => {
      const active = showCard ? cardPane.current : formPane.current;
      // The +1 absorbs offsetHeight's sub-pixel rounding: without it the
      // clipping box shaves the bottom hairline off the input's border.
      if (active) setHeight(active.offsetHeight + 1);
    };
    measure();

    const observer = new ResizeObserver(measure);
    if (formPane.current) observer.observe(formPane.current);
    if (cardPane.current) observer.observe(cardPane.current);
    return () => observer.disconnect();
  }, [showCard, cardStatus]);

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

  const closeCard = () => {
    const hadFocus = cardPane.current?.contains(document.activeElement);
    setCardVisible(false);
    setStatus("idle");
    if (hadFocus) input.current?.focus({ preventScroll: true });
  };

  return (
    <div id="signup" className="mt-[1.6em] w-full max-w-[24em] scroll-mt-28 sm:max-w-[26em]">
      <div
        // Padding + matching negative margin keep the card's drop shadow out of
        // the clipping box without changing the laid-out width.
        className="-mx-[0.7em] grid items-start overflow-hidden px-[0.7em] transition-[height] duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
        style={height === null ? undefined : { height }}
      >
        <div
          ref={formPane}
          inert={showCard}
          className={`${PANE} ${showCard ? PANE_OUT : PANE_IN}`}
        >
          <form
            noValidate
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-[0.5em]"
          >
            <div className="relative w-full rounded-full border-[0.09em] border-ink/70 bg-white/45 transition-colors focus-within:border-ink">
              <label htmlFor="newsletter-email" className="sr-only">
                {NEWSLETTER.emailLabel}
              </label>
              <input
                id="newsletter-email"
                ref={input}
                type="email"
                placeholder={placeholder}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "error" || status === "invalid") setStatus("idle");
                }}
                autoComplete="email"
                disabled={status === "subscribing"}
                aria-invalid={status === "invalid"}
                aria-describedby={
                  status === "invalid" || status === "error"
                    ? "newsletter-message"
                    : undefined
                }
                className="autofill-quiet w-full truncate disabled:opacity-60 rounded-full bg-transparent px-[1.4em] py-[0.95em] text-center text-[0.88em] text-ink italic outline-none placeholder:text-ink/70 sm:px-[2.4em] sm:py-[0.85em] sm:text-[0.95em]"
              />
              <button
                type="submit"
                disabled={status === "subscribing"}
                aria-label={
                  status === "subscribing" ? NEWSLETTER.signingUp : NEWSLETTER.signUp
                }
                className="absolute top-1/2 right-[0.45em] flex size-[2.1em] -translate-y-1/2 items-center justify-center rounded-full text-gold transition-colors hover:bg-ink/5 hover:text-ink disabled:cursor-not-allowed disabled:opacity-50"
              >
                {status === "subscribing" ? (
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden
                    className="size-[1.05em] animate-spin"
                  >
                    <circle
                      cx="8"
                      cy="8"
                      r="6"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeOpacity="0.3"
                    />
                    <path
                      d="M14 8a6 6 0 0 0-6-6"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />
                  </svg>
                ) : (
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
                )}
              </button>
            </div>
            <p
              id="newsletter-message"
              role="alert"
              className="text-[0.78em] font-medium text-red-700 empty:hidden"
            >
              {status === "invalid" && NEWSLETTER.invalid}
              {status === "error" && NEWSLETTER.error}
            </p>
          </form>
        </div>

        {cardStatus && (
          <div
            ref={cardPane}
            inert={!cardVisible}
            // The bottom padding is measured with the pane, so the shadow has
            // room inside the animated box.
            className={`${PANE} pb-[1.1em] ${cardVisible ? PANE_IN : PANE_OUT}`}
          >
            <DownloadPDF status={cardStatus} active={cardVisible} cancel={closeCard} />
          </div>
        )}
      </div>
    </div>
  );
}
