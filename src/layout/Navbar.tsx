"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const links = [
  { href: "/", label: "Home", id: "" },
  { href: "/#bible-word-a-light", label: "BibleWordALight", id: "bible-word-a-light" },
  { href: "/#Bent-o-Box", label: "Bent-o-Box", id: "Bent-o-Box" },
] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      // Near the top we are always on "Home" — the observer below only fires
      // when a section crosses the band, so it can't reset this on its own.
      if (window.scrollY < 120) setActive("");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the link whose section is currently in view.
  useEffect(() => {
    const ids = links.map((l) => l.id).filter(Boolean);
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

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
          ? "border-b border-white/25 bg-brand/85 shadow-[0_8px_30px_rgba(29,78,216,0.18)] backdrop-blur-xl"
          : "border-b border-transparent bg-brand"
      }`}
    >
      <nav
        className={`relative mx-auto flex w-full max-w-[1100px] items-center justify-between px-6 transition-all duration-300 ${
          scrolled ? "h-[68px]" : "h-[80px]"
        }`}
      >
        {/* The logo fades away once you scroll, leaving the links on their own. */}
        <Link
          href="/"
          tabIndex={scrolled ? -1 : 0}
          aria-hidden={scrolled || undefined}
          className={`flex shrink-0 items-center rounded-lg outline-none transition-all duration-300 ease-out focus-visible:ring-2 focus-visible:ring-white/80 ${
            scrolled
              ? "pointer-events-none -translate-y-1 scale-95 opacity-0"
              : "translate-y-0 scale-100 opacity-100 hover:scale-[1.04]"
          }`}
        >
          <Image
            src="/Amenscapes/WebsiteLogo.png"
            alt="Amenscapes"
            width={653}
            height={396}
            className="h-[56px] w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop links — absolutely centred so the logo stays flush left. */}
        <ul className="hidden items-center gap-1 md:absolute md:left-1/2 md:flex md:-translate-x-1/2">
          {links.map((link) => {
            const isActive = active === link.id;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`group relative block rounded-full px-4 py-2 text-[15px] font-bold outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-white/80 ${
                    isActive
                      ? "text-white"
                      : "text-white/80 hover:bg-white/15 hover:text-white"
                  }`}
                >
                  {link.label}
                  <span
                    className={`pointer-events-none absolute inset-x-4 -bottom-0.5 h-[2px] origin-left rounded-full bg-white transition-transform duration-300 ${
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex size-10 items-center justify-center rounded-xl text-white outline-none transition-colors hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-white/80 md:hidden"
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
        className={`overflow-hidden border-t border-white/20 bg-brand/95 backdrop-blur-xl transition-[max-height,opacity] duration-300 md:hidden ${
          open ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="mx-auto flex w-full max-w-[1100px] flex-col gap-1 px-6 py-3">
          {links.map((link) => {
            const isActive = active === link.id;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={`block rounded-xl px-4 py-3 text-[16px] font-bold transition-colors ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "text-white/85 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}
