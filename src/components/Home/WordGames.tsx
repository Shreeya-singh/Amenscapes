"use client";

import Image from "next/image";
import Link from "next/link";

type Game = {
  name: string;
  src: string;
  href: string;
};

const games: Game[] = [
  {
    name: "BibleWordALight",
    src: "/Amenscapes/BibleWordALight_Cover.jpg",
    href: "#bible-word-a-light",
  },
  {
    name: "Bent-o-Box",
    src: "/Amenscapes/Bent-o-Box.jpg",
    href: "#Bent-o-Box",
  },
];

function AndroidIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="white" aria-hidden>
      <path d="M17.6 9.48 19.2 6.7a.4.4 0 0 0-.7-.4l-1.62 2.8A8.1 8.1 0 0 0 12 8.2a8.1 8.1 0 0 0-4.88.9L5.5 6.3a.4.4 0 1 0-.7.4l1.6 2.78A7.7 7.7 0 0 0 4 15.1v.4c0 .9.73 1.6 1.63 1.6h.37v2.3c0 .88.72 1.6 1.6 1.6s1.6-.72 1.6-1.6v-2.3h5.6v2.3c0 .88.72 1.6 1.6 1.6s1.6-.72 1.6-1.6v-2.3h.37c.9 0 1.63-.7 1.63-1.6v-.4a7.7 7.7 0 0 0-2.4-5.62ZM9.1 13.35a.85.85 0 1 1 0-1.7.85.85 0 0 1 0 1.7Zm5.8 0a.85.85 0 1 1 0-1.7.85.85 0 0 1 0 1.7Z" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M4.5 11.5 11.5 4.5M11.5 4.5H6.2M11.5 4.5v5.3"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GameCard({ name, src, href }: Game) {
  return (
    <div className="flex w-full max-w-[300px] flex-col items-center gap-3">
      <Link
        href={href}
        aria-label={name}
        className="group block aspect-square w-full overflow-hidden rounded-[28px] bg-white p-2 shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-transform duration-300 hover:scale-[1.03]"
      >
        {/* `contain` so the full cover art is visible instead of being cropped. */}
        <Image
          src={src}
          alt={name}
          width={1024}
          height={1024}
          sizes="(max-width: 640px) 80vw, 300px"
          className="size-full rounded-[20px] object-contain"
          priority
        />
      </Link>

      <div className="flex w-full items-stretch justify-center gap-[3px]">
        <button
          type="button"
          className="flex h-[52px] min-w-0 flex-1 cursor-default items-center justify-center gap-2 rounded-[8px] bg-black px-3 text-white sm:flex-none sm:px-4"
        >
          <AndroidIcon />
          <span className="flex flex-col items-start leading-none">
            <span className="text-[10px] tracking-wide">
              DIRECT DOWNLOAD
            </span>
            <span className="text-[18px] font-bold tracking-wide">
              .APK FILE
            </span>
          </span>
        </button>
        <button
          type="button"
          aria-label={`${name} external link`}
          className="flex size-[52px] shrink-0 cursor-default items-center justify-center rounded-[5px] bg-black"
        >
          <ExternalIcon />
        </button>
      </div>
    </div>
  );
}

export default function WordGames() {
  return (
    <section className="relative flex min-h-[calc(100svh-80px)] flex-col bg-brand px-4 pt-10 pb-24 sm:px-6 sm:pt-16 sm:pb-16">
      <div className="mx-auto flex w-full max-w-[1100px] flex-1 flex-col items-center">
        <div className="flex w-full flex-wrap items-start justify-center gap-10 pt-2 sm:gap-14 sm:pt-6 lg:gap-16">
          {games.map((game) => (
            <GameCard key={game.name} {...game} />
          ))}
        </div>

        <h1 className="mt-10 max-w-[700px] text-center text-[30px] leading-tight font-bold text-balance text-black sm:mt-14 sm:text-[44px] lg:mt-16 lg:text-[60px]">
          Play the most Unique Word Games! 😃
        </h1>
      </div>

      <button
        type="button"
        aria-label="Scroll down"
        onClick={() =>
          window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
        }
        className="absolute bottom-6 left-1/2 flex size-10 -translate-x-1/2 items-center justify-center rounded-full bg-white/25 text-white transition-colors hover:bg-white/40 sm:bottom-12"
      >
        <svg width="18" height="18" viewBox="0 0 14 14" fill="none" aria-hidden>
          <path
            d="M3.5 5.5 7 9l3.5-3.5"
            stroke="white"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </section>
  );
}
