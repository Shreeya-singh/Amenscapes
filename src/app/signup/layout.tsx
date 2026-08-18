import Link from "next/link";

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative flex-1">
      <Link
        href="/"
        className="fixed top-5 left-5 z-50 inline-flex h-11 items-center rounded-full bg-white px-5 text-[14px] font-bold text-brand-deep shadow-[0_8px_24px_rgba(0,0,0,0.14)] outline-none transition-transform hover:scale-[1.04] focus-visible:ring-2 focus-visible:ring-white"
      >
        Home
      </Link>
      {children}
    </main>
  );
}
