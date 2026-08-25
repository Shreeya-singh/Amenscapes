"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * `id` is the section each link points at on the home page. The game pages
 * are also their own routes, so those links carry both.
 */
const links = [
  { href: "/", label: "Home", id: "" },
  { href: "/wordalight", label: "WordaLight", id: "wordalight" },
  { href: "/bent-o-box", label: "BentoBox", id: "bentobox" },
  { href: "/#apparel", label: "Apparel", id: "apparel" },
  { href: "/#About", label: "About", id: "About" },
] as const;

/**
 * On the home page the underline follows the section in view; everywhere else
 * it matches on the path.
 */
function isLinkActive(
  href: string,
  id: string,
  pathname: string,
  active: string,
) {
  if (pathname === "/") return active === id;
  return pathname === href;
}

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /**
   * Highlight the link whose section is currently in view. The section is
   * measured on each scroll rather than watched with an IntersectionObserver:
   * the observer only reported sections crossing its band, so scrolling back
   * up past the last one left that link stuck underlined.
   */
  useEffect(() => {
    if (pathname !== "/") {
      setActive("");
      return;
    }

    const sections = links
      .map((link) => link.id)
      .filter(Boolean)
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
      .sort((a, b) => a.offsetTop - b.offsetTop);

    let frame = 0;

    const sync = () => {
      frame = 0;
      // Near the top we are always on "Home", whatever sits under the line.
      if (window.scrollY < 120) {
        setActive("");
        return;
      }
      // The last section to have crossed 45% of the viewport owns the nav.
      const line = window.innerHeight * 0.45;
      const current = sections.filter(
        (el) => el.getBoundingClientRect().top <= line,
      );
      setActive(current.length ? current[current.length - 1].id : "");
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(sync);
    };

    sync();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pathname]);

  // Close the mobile menu on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-ink/10 bg-cream/85 shadow-[0_8px_30px_rgba(21,42,80,0.10)] backdrop-blur-xl"
          : "border-b border-transparent bg-cream"
      }`}
    >
      <nav
        className={`relative mx-auto flex w-full max-w-7xl items-center justify-between px-6 transition-all duration-300 ${
          scrolled ? "h-[68px]" : "h-[80px]"
        }`}
      >
        {/* The logo fades away once you scroll, leaving the links on their own. */}
        <Link
          href="/"
          tabIndex={scrolled ? -1 : 0}
          aria-hidden={scrolled || undefined}
          className={`flex shrink-0 items-center rounded-lg outline-none transition-all duration-300 ease-out focus-visible:ring-2 focus-visible:ring-ink/40 ${
            scrolled && !isMobile
              ? "pointer-events-none -translate-y-1 scale-95 opacity-0"
              : "translate-y-0 scale-100 opacity-100 hover:scale-[1.04]"
          }`}
        >
          {/* The source logo is a stacked lockup; the mark and wordmark are
              split so they sit on one line with the nav links. */}
          <span className="flex items-center gap-2.5">
            <Image
              src="/Amenscapes/LogoMark.png"
              alt=""
              width={198}
              height={298}
              className="h-10 w-auto object-contain"
              priority
            />
            <Image
              src="/Amenscapes/LogoWordmark.png"
              alt="Amenscapes"
              width={649}
              height={88}
              className="h-[18px] w-auto object-contain"
              priority
            />
          </span>
        </Link>

        {/* Desktop links — absolutely centred so the logo stays flush left. */}
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const isActive = isLinkActive(link.href, link.id, pathname, active);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`group relative block rounded-full px-4 py-2 text-[17px] font-medium outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-ink/40 ${
                    isActive
                      ? "text-ink"
                      : "text-ink/70 hover:bg-ink/5 hover:text-ink"
                  }`}
                >
                  {link.label}
                  <span
                    className={`pointer-events-none absolute inset-x-4 -bottom-0.5 h-[2px] origin-left rounded-full bg-gold transition-transform duration-300 ${
                      isActive
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        {/* <Link
          href="/#signup"
          className={`hidden rounded-full border-2 border-white px-5 py-2 text-[14px] font-bold text-white outline-none transition-transform hover:scale-[1.04] focus-visible:ring-2 focus-visible:ring-white/80 md:inline-flex
          ${scrolled
            ? "pointer-events-none -translate-y-1 scale-95 opacity-0"
            : "translate-y-0 scale-100 opacity-100 hover:scale-[1.04]"
          }`}
        >
          Sign up 
        </Link> */}

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex size-10 items-center justify-center rounded-xl text-ink outline-none transition-colors hover:bg-ink/5 focus-visible:ring-2 focus-visible:ring-ink/40 md:hidden"
        >
          <span className="relative block h-4 w-5">
            <span
              className={`absolute left-0 block h-[2px] w-5 rounded-full bg-current transition-all duration-300 ${
                open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 block h-[2px] w-5 -translate-y-1/2 rounded-full bg-current transition-all duration-200 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-[2px] w-5 rounded-full bg-current transition-all duration-300 ${
                open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
              }`}
            />
          </span>
        </button>
      </nav>

      {/* Mobile panel */}
      <div
        id="mobile-nav"
        className={`overflow-hidden border-t border-ink/10 bg-cream/95 backdrop-blur-xl transition-[max-height,opacity] duration-300 md:hidden
          ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
          `}
      >
        <ul className="mx-auto flex w-full max-w-[1100px] flex-col gap-1 px-6 py-3">
          {links.map((link) => {
            const isActive = isLinkActive(link.href, link.id, pathname, active);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={`block rounded-xl px-4 py-3 text-[18px] font-medium transition-colors ${
                    isActive
                      ? "bg-ink/10 text-ink"
                      : "text-ink/75 hover:bg-ink/5 hover:text-ink"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
          <li>
            <Link
              href="/#signup"
              onClick={() => setOpen(false)}
              className="mt-1 block rounded-xl bg-ink px-4 py-3 text-center text-[13px] font-semibold tracking-[0.14em] text-white uppercase"
            >
              Sign up with email
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
