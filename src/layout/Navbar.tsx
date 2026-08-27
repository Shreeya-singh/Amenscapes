"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home", id: "" },
  { href: "/#wordalight", label: "WordaLight", id: "wordalight" },
  { href: "/#bentobox", label: "BentoBox", id: "bentobox" },
  { href: "/#t-shirt", label: "T-Shirts", id: "t-shirt" },
  { href: "/#About", label: "About", id: "About" },
] as const;

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      if (window.scrollY < 120) {
        setActive("");
        return;
      }
      const doc = document.documentElement;
      const atBottom =
        window.innerHeight + window.scrollY >= doc.scrollHeight - 2;
      if (atBottom && sections.length) {
        setActive(sections[sections.length - 1].id);
        return;
      }
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

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const query = window.matchMedia("(width >= 48rem)");
    const close = () => query.matches && setOpen(false);
    query.addEventListener("change", close);
    return () => query.removeEventListener("change", close);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-ink/10 bg-[#FBF8F2]/85 shadow-[0_8px_30px_rgba(21,42,80,0.10)] backdrop-blur-xl"
          : "border-b border-transparent bg-[#FBF8F2]"
      }`}
    >
      <nav
        className={`relative mx-auto flex w-full max-w-8xl items-center justify-between gap-3 px-5 transition-all duration-300 sm:px-6 ${
          scrolled ? "h-[60px] md:h-[68px]" : "h-[68px] md:h-[80px]"
        }`}
      >
        <Link
          href="/"
          className="flex shrink-0 items-center rounded-lg outline-none transition-transform duration-300 ease-out hover:scale-[1.04] focus-visible:ring-2 focus-visible:ring-ink/40"
        >
          <span className="flex items-end gap-2">
            <Image
              src="/Navbar/NavbarLogo.png"
              alt="Amenscapes"
              width={150}
              height={40}
              className="h-8 w-auto object-contain md:h-10"
              priority
            />
          </span>
        </Link>

        <ul className="hidden items-center gap-2 md:flex lg:gap-8">
          {links.map((link) => {
            const isActive = isLinkActive(link.href, link.id, pathname, active);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`group relative block rounded-full px-3 py-2 text-[17px] font-medium whitespace-nowrap outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-ink/40 lg:px-4 ${
                    isActive
                      ? "text-ink"
                      : "text-[#263B7C] hover:bg-[#263B7C]/5 hover:text-[#263B7C]"
                  }`}
                >
                  {link.label}
                  <span
                    className={`pointer-events-none absolute inset-x-3 -bottom-0.5 h-[2px] lg:inset-x-4 origin-left rounded-full bg-gold transition-transform duration-300 ${
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

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="-mr-1 flex size-11 shrink-0 items-center justify-center rounded-xl text-ink outline-none transition-colors hover:bg-ink/5 focus-visible:ring-2 focus-visible:ring-ink/40 md:hidden"
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

      <div
        id="mobile-nav"
        className={`border-t bg-[#FBF8F2]/95 backdrop-blur-xl transition-[max-height,opacity] duration-300 md:hidden
          ${
            open
              ? "max-h-[calc(100svh-60px)] overflow-y-auto border-ink/10 opacity-100"
              : "max-h-0 overflow-hidden border-transparent opacity-0"
          }
          `}
      >
        <ul className="mx-auto flex w-full max-w-[1100px] flex-col gap-1 px-5 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-6">
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
