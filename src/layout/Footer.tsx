import Image from "next/image";
import Link from "next/link";
import { PlusMark } from "@/components/ui/Ornaments";

/**
 * `#` marks a destination that has no page or account yet — swap in the real
 * URL as each one lands rather than pointing at a route that 404s.
 */
const COLUMNS = [
  {
    heading: "Shop",
    links: [
      { label: "Wordalight", href: "/#wordalight" },
      { label: "Bentobox", href: "/#bentobox" },
      { label: "T-Shirts", href: "/#apparel" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/#About" },
      { label: "Our Mission", href: "/#About" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "FAQ", href: "#" },
      { label: "Shipping & Returns", href: "#" },
      { label: "Privacy Policy", href: "#" },
    ],
  },
] as const;

const SOCIALS = [
  {
    label: "Amenscapes on Facebook",
    href: "#",
    path: "M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5H16.7V3.6A21 21 0 0 0 14.3 3.5c-2.4 0-4 1.45-4 4.12V9.9H7.6V13h2.7v8Z",
  },
  {
    label: "Amenscapes on Instagram",
    href: "#",
    path: "M8.2 3h7.6A5.2 5.2 0 0 1 21 8.2v7.6a5.2 5.2 0 0 1-5.2 5.2H8.2A5.2 5.2 0 0 1 3 15.8V8.2A5.2 5.2 0 0 1 8.2 3Zm0 1.9A3.3 3.3 0 0 0 4.9 8.2v7.6a3.3 3.3 0 0 0 3.3 3.3h7.6a3.3 3.3 0 0 0 3.3-3.3V8.2a3.3 3.3 0 0 0-3.3-3.3ZM12 7.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Zm0 1.9a2.6 2.6 0 1 0 0 5.2 2.6 2.6 0 0 0 0-5.2Zm4.9-2.6a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Z",
  },
  {
    label: "Email Amenscapes",
    href: "#",
    path: "M4 5.5h16c.8 0 1.5.7 1.5 1.5v10c0 .8-.7 1.5-1.5 1.5H4c-.8 0-1.5-.7-1.5-1.5V7c0-.8.7-1.5 1.5-1.5Zm.9 1.9 6.6 4.7c.3.2.7.2 1 0l6.6-4.7Zm-.4 1.8V16.6h15V9.2l-6.3 4.5a2.9 2.9 0 0 1-3.4 0Z",
  },
] as const;

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-ink/10 bg-cream">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-12 sm:grid-cols-2 sm:py-14 lg:grid-cols-[auto_minmax(0,15rem)_repeat(3,minmax(0,1fr))_auto] lg:gap-8">
        {/* The stacked lockup — mark over wordmark, as the brand sheet has it. */}
        <Link
          href="/"
          className="flex flex-col items-center gap-2 self-start rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ink/40 sm:items-start"
        >
          <Image
            src="/Amenscapes/LogoMark.png"
            alt=""
            width={198}
            height={298}
            className="h-11 w-auto object-contain"
          />
          <Image
            src="/Amenscapes/LogoWordmark.png"
            alt="Amenscapes"
            width={649}
            height={88}
            className="h-[15px] w-auto object-contain"
          />
        </Link>

        <p className="text-center text-[16px] leading-relaxed font-medium text-ink/70 sm:text-left sm:text-[17px]">
          Creating faith-filled puzzles and books that inspire hearts and minds
          through God&apos;s Word.
        </p>

        {COLUMNS.map((column) => (
          <nav key={column.heading} aria-label={column.heading}>
            <h2 className="text-[17px] font-bold text-ink sm:text-[18px]">
              {column.heading}
            </h2>
            <ul className="mt-3 flex flex-col gap-2">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[16px] font-medium text-ink/70 underline-offset-4 outline-none transition-colors hover:text-ink hover:underline focus-visible:ring-2 focus-visible:ring-ink/40 sm:text-[17px]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div className="flex flex-col items-center gap-3 sm:items-start lg:items-end">
          <h2 className="text-[17px] font-bold text-ink sm:text-[18px]">
            Follow Us
          </h2>
          <ul className="flex items-center gap-3">
            {SOCIALS.map((social) => (
              <li key={social.label}>
                <Link
                  href={social.href}
                  aria-label={social.label}
                  className="flex size-9 items-center justify-center rounded-full bg-ink text-cream outline-none transition-transform hover:scale-[1.08] focus-visible:ring-2 focus-visible:ring-ink/40"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="size-[18px]"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path d={social.path} />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Hairline sign-off with the gold plus standing on it. */}
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="flex items-center gap-3 text-gold">
          <span className="h-px flex-1 bg-ink/10" />
          <PlusMark className="w-3.5" />
          <span className="h-px flex-1 bg-ink/10" />
        </div>
        <p className="py-5 text-center text-[15px] font-medium text-ink/60 sm:text-[16px]">
          © {new Date().getFullYear()} Amenscapes. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
