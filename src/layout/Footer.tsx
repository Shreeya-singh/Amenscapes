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
      { label: "T-Shirts", href: "/#t-shirt" },
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
  { label: "Instagram", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "Email", href: "#" },
] as const;

/** Shared by every link in the footer — muted grey that darkens to navy. */
const linkClass =
  "inline-block py-1.5 text-[16px] font-medium text-[#5D606A] underline-offset-4 outline-none transition-colors hover:text-[#223574] hover:underline focus-visible:ring-2 focus-visible:ring-[#223574]/40 sm:py-1 sm:text-[17px]";

const headingClass = "text-[17px] font-bold text-[#223574] sm:text-[18px]";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[#223574]/10 bg-[#FBF8F2]">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-x-5 gap-y-8 px-5 py-11 sm:grid-cols-3 sm:gap-10 sm:px-6 sm:py-14 lg:grid-cols-[minmax(0,17rem)_repeat(4,minmax(0,1fr))] lg:gap-8">
        {/* The stacked lockup — mark over wordmark, as the brand sheet has it. */}
        <div className="col-span-2 flex flex-col items-start gap-3.5 border-b border-[#223574]/10 pb-7 sm:col-span-3 sm:gap-4 sm:border-b-0 sm:pb-0 lg:col-span-1">
          <Link
            href="/"
            className="rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-[#223574]/40"
          >
            <Image
              src="/Footer/Footer_Logo.png"
              alt="Amenscapes"
              width={120}
              height={63}
              sizes="120px"
              className="h-auto w-[120px] max-w-none object-contain"
            />
          </Link>

          <p className="max-w-[42ch] text-[16px] leading-relaxed font-medium text-[#5D606A] sm:text-[17px]">
            Creating faith-filled puzzles and books that inspire hearts and
            minds through God&apos;s Word.
          </p>
        </div>

        
        {COLUMNS.map((column) => (
          <nav
            key={column.heading}
            aria-label={column.heading}
            className="min-w-0"
          >
            <h2 className={headingClass}>{column.heading}</h2>
            <ul className="mt-2 flex flex-col gap-1">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <nav aria-label="Follow Us" className="min-w-0">
          <h2 className={headingClass}>Follow Us</h2>
          <ul className="mt-2 flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4 sm:gap-y-1 lg:gap-4">
            {SOCIALS.map((social) => (
              <li key={social.label}>
                <Link href={social.href} className={linkClass}>
                  {social.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Hairline sign-off with the gold plus standing on it. */}
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6">
        <div className="flex items-center gap-3 text-gold">
          <span className="h-px flex-1 bg-[#223574]/10" />
          <PlusMark className="w-3.5" />
          <span className="h-px flex-1 bg-[#223574]/10" />
        </div>
        <p className="py-5 text-center text-[14px] font-medium text-[#5D606A] sm:text-[16px]">
          © {new Date().getFullYear()} Amenscapes. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
