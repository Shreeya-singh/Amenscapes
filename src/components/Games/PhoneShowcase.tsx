"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";

type ScreenKind = "discover" | "reveal" | "decorate";

type Card = {
  id: string;
  /** Drop a real screenshot here (e.g. `/games/word-places-discover.png`). */
  src?: string;
  banner: string;
  kind: ScreenKind;
};

/**
 * Three screens loop forever, so the stage always reads
 * ghost · DECORATE · DISCOVER · REVEAL · ghost — the same repeat the
 * reference frames show.
 */
const CARDS: Card[] = [
  { id: "decorate", banner: "DECORATE!", kind: "decorate" },
  { id: "discover", banner: "DISCOVER!", kind: "discover" },
  { id: "reveal", banner: "REVEAL the objects!", kind: "reveal" },
];

const START = 1; // DISCOVER sits centre on first paint

const CARD = { w: 320, h: 700, bezel: 13 } as const;

/** Horizontal drag (px) that equals exactly one card step. */
const SPACING = 286;
/** Drag past this and the deck advances even without a full step. */
const SWIPE = 46;
/** Slots rendered either side of centre (outermost pair is invisible). */
const RANGE = 3;

/** Poses for offsets -3 … +3. Index = offset + 3. */
const SLOTS = [
  { x: -556, z: -300, ry: 20, s: 0.56, op: 0 },
  { x: -470, z: -232, ry: 17, s: 0.66, op: 0.16 },
  { x: -286, z: -88, ry: 11, s: 0.8, op: 1 },
  { x: 0, z: 60, ry: 0, s: 1, op: 1 },
  { x: 286, z: -88, ry: -11, s: 0.8, op: 1 },
  { x: 470, z: -232, ry: -17, s: 0.66, op: 0.16 },
  { x: 556, z: -300, ry: -20, s: 0.56, op: 0 },
] as const;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function mod(a: number, n: number) {
  return ((a % n) + n) % n;
}

function poseFromOffset(offset: number): CSSProperties {
  const o = Math.max(-RANGE, Math.min(RANGE, offset));
  const i = o + RANGE;
  const i0 = Math.floor(i);
  const i1 = Math.min(SLOTS.length - 1, i0 + 1);
  const t = i - i0;
  const a = SLOTS[i0];
  const b = SLOTS[i1];
  const abs = Math.abs(o);

  return {
    transform: `translate3d(${lerp(a.x, b.x, t)}px, 0, ${lerp(a.z, b.z, t)}px) rotateY(${lerp(a.ry, b.ry, t)}deg) scale(${lerp(a.s, b.s, t)})`,
    opacity: lerp(a.op, b.op, t),
    zIndex: Math.round(20 - abs * 5),
    pointerEvents: abs > 1.4 ? "none" : "auto",
  };
}

/* ---------------------------------------------------------------- screens */

function Banner({ children }: { children: ReactNode }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-10 pt-4">
      <p className="px-3 text-center text-[26px] leading-none font-black tracking-tight text-white uppercase [text-shadow:0_2px_0_rgba(0,0,0,0.18),0_4px_10px_rgba(0,0,0,0.25)]">
        {children}
      </p>
      <div className="mx-auto mt-3 h-[10px] w-[130%] -translate-x-[11%] rounded-[50%] bg-[#f6ecd4]/85" />
    </div>
  );
}

function HexTile({ a, b }: { a: string; b: string }) {
  return (
    <div
      className="relative -mx-[1px] h-[58px] w-[52px]"
      style={{
        clipPath:
          "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        background: `linear-gradient(155deg, ${a} 0%, ${b} 100%)`,
      }}
    >
      <span className="absolute top-1/2 left-1/2 h-[14px] w-[20px] -translate-x-1/2 -translate-y-1/2 rounded-[3px] bg-white/35" />
      <span className="absolute bottom-[9px] left-[9px] size-[7px] rounded-full bg-white/30" />
      <span className="absolute top-[13px] right-[10px] h-[9px] w-[6px] rounded-[2px] bg-black/15" />
    </div>
  );
}

function Cluster({
  label,
  labelClass,
  align,
  tiles,
}: {
  label: string;
  labelClass: string;
  align: "left" | "right";
  tiles: [string, string][];
}) {
  return (
    <div className="relative">
      <span
        className={`absolute -top-1 z-10 rounded-[6px] px-2 py-[3px] text-[10px] font-extrabold tracking-wide text-white uppercase shadow-sm ${labelClass} ${
          align === "left" ? "left-1" : "right-1"
        }`}
      >
        {label}
      </span>
      <div className="flex flex-col items-center pt-3">
        <div className="flex">
          {tiles.slice(0, 3).map(([a, b], i) => (
            <HexTile key={i} a={a} b={b} />
          ))}
        </div>
        <div className="-mt-[15px] flex translate-x-[26px]">
          {tiles.slice(3, 6).map(([a, b], i) => (
            <HexTile key={i} a={a} b={b} />
          ))}
        </div>
      </div>
    </div>
  );
}

const GARDEN: [string, string][] = [
  ["#8fd46b", "#4f9a35"],
  ["#c7e88f", "#6fb54a"],
  ["#7fd6c0", "#3f9c86"],
  ["#f0a2c8", "#c4548f"],
  ["#b6e07a", "#5aa63c"],
  ["#8fd0ea", "#3f8fc0"],
];

const HOME: [string, string][] = [
  ["#f0c08a", "#c07f3c"],
  ["#c9b6ea", "#7b5fb5"],
  ["#9fd6e8", "#4f95bb"],
  ["#e8d2a8", "#b8935c"],
  ["#a9d9a0", "#5a9c56"],
  ["#e9b8d2", "#b1618c"],
];

const FOOD: [string, string][] = [
  ["#f2b7d8", "#c46299"],
  ["#f5d79b", "#c99a45"],
  ["#c3c9ef", "#7c85c8"],
  ["#f7c9a8", "#cf8a5c"],
  ["#e6bbe8", "#a663ad"],
  ["#a8dced", "#5aa0c4"],
];

function DiscoverScreen({ banner }: { banner: string }) {
  return (
    <div className="relative h-full w-full bg-[linear-gradient(180deg,#5fc3d6_0%,#7cc9a4_18%,#8fb6e6_52%,#c6a6e2_78%,#ecb4da_100%)]">
      <Banner>{banner}</Banner>
      <div className="flex h-full flex-col justify-center gap-7 px-2 pt-14 pb-4">
        <Cluster label="Garden" labelClass="bg-[#3f7f2e]" align="left" tiles={GARDEN} />
        <Cluster label="Home" labelClass="bg-[#2b4f9e]" align="right" tiles={HOME} />
        <Cluster label="Food" labelClass="bg-[#8b2a63]" align="left" tiles={FOOD} />
      </div>
    </div>
  );
}

function RevealRoom() {
  return (
    <svg viewBox="0 0 200 168" className="w-[86%] drop-shadow-[0_10px_14px_rgba(0,0,0,0.25)]">
      {/* walls + floor */}
      <polygon points="36,44 100,10 100,88 36,122" fill="#e6a96d" />
      <polygon points="100,10 164,44 164,122 100,88" fill="#cd8c49" />
      <polygon points="36,122 100,88 164,122 100,156" fill="#8c5c34" />
      {/* window */}
      <polygon points="118,42 152,60 152,92 118,74" fill="#7b4fa8" />
      <polygon points="120,45 133,52 133,80 120,73" fill="#a97fd0" opacity="0.7" />
      {/* shelf unit */}
      <polygon points="46,52 74,38 74,88 46,102" fill="#7a4a26" />
      <polygon points="50,60 70,50 70,58 50,68" fill="#c98f56" />
      <polygon points="50,74 70,64 70,72 50,82" fill="#c98f56" />
      {/* clock */}
      <circle cx="66" cy="34" r="6" fill="#f4ead3" stroke="#8c5c34" strokeWidth="1.5" />
      {/* hidden-object silhouette */}
      <path
        d="M104 62c10-8 26-6 30 4 6 2 8 10 3 15-3 9-18 13-28 8-11-2-15-14-10-21 1-3 3-5 5-6z"
        fill="#0d0d10"
      />
      {/* revealed sofa outside the room */}
      <g>
        <ellipse cx="46" cy="140" rx="34" ry="14" fill="#ffe98a" opacity="0.55" />
        <polygon points="18,128 46,114 74,128 74,142 46,156 18,142" fill="#8f6fc4" />
        <polygon points="18,128 46,114 46,124 18,138" fill="#a98adb" />
        <polygon points="46,114 74,128 74,138 46,124" fill="#7a5cb0" />
        <rect x="20" y="132" width="6" height="9" rx="2" fill="#5f4790" />
        <rect x="66" y="132" width="6" height="9" rx="2" fill="#5f4790" />
      </g>
      {/* arrow from sofa into the room */}
      <path
        d="M62 118c14-14 30-20 46-18"
        stroke="#ffffff"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />
      <polygon points="106,92 118,100 104,108" fill="#ffffff" />
    </svg>
  );
}

const CLUES = ["COZY", "LIE", "SOFT", "NAP"];

const GRID = [
  ["A", "S", "X", "P", "O"],
  ["N", "L", "I", "E", "C"],
  ["A", "J", "S", "U", "O"],
  ["P", "H", "O", "D", "Z"],
  ["S", "O", "F", "T", "Y"],
];

/** row,col → highlight colour (LIE pink, COZY blue, SOFT teal). */
const MARKS: Record<string, string> = {
  "1-1": "#f39ad0",
  "1-2": "#f39ad0",
  "1-3": "#f39ad0",
  "1-4": "#8fb6ee",
  "2-4": "#8fb6ee",
  "3-4": "#8fb6ee",
  "4-4": "#8fb6ee",
  "4-0": "#7fd8d0",
  "4-1": "#7fd8d0",
  "4-2": "#7fd8d0",
  "4-3": "#7fd8d0",
};

function RevealScreen({ banner }: { banner: string }) {
  return (
    <div className="relative h-full w-full bg-[linear-gradient(180deg,#79c9e8_0%,#8ed36a_24%,#5aa93f_58%,#3d8a2c_100%)]">
      <Banner>{banner}</Banner>
      <div className="flex h-full flex-col items-center gap-4 px-4 pt-16">
        <RevealRoom />

        <div className="w-[74%] overflow-hidden rounded-[10px] shadow-[0_6px_12px_rgba(0,0,0,0.25)]">
          <p className="bg-[#3f6fd0] py-1 text-center text-[19px] leading-tight font-black tracking-[0.22em] text-white">
            SOFA
          </p>
          <div className="grid grid-cols-2 gap-x-3 bg-[#e7e3d0] px-3 py-1">
            {CLUES.map((w) => (
              <span
                key={w}
                className="text-center text-[10px] font-bold tracking-wide text-[#4a4636]"
              >
                {w}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-5 gap-[2px] rounded-[8px] bg-[#efe8d6] p-[5px] shadow-[0_6px_12px_rgba(0,0,0,0.25)]">
          {GRID.flatMap((row, r) =>
            row.map((ch, c) => {
              const mark = MARKS[`${r}-${c}`];
              return (
                <span
                  key={`${r}-${c}`}
                  className="grid size-[22px] place-items-center rounded-[3px] text-[12px] font-extrabold text-[#2f2b22]"
                  style={mark ? { background: mark } : undefined}
                >
                  {ch}
                </span>
              );
            }),
          )}
        </div>
      </div>
    </div>
  );
}

function PatioScene({ muted }: { muted?: boolean }) {
  const grey = muted ? "#b9bcb6" : undefined;
  return (
    <svg viewBox="0 0 220 130" className="w-[92%]">
      {/* pool deck */}
      <polygon points="30,64 110,22 190,64 110,106" fill={muted ? "#dcdcd4" : "#f2e3c0"} />
      <polygon points="66,64 110,42 154,64 110,86" fill={grey ?? "#63c3e0"} />
      {/* loungers */}
      <polygon points="44,58 62,48 74,54 56,64" fill={grey ?? "#e9e3d2"} />
      <polygon points="146,58 164,48 176,54 158,64" fill={grey ?? "#e9e3d2"} />
      {/* parasols */}
      <g>
        <rect x="63" y="26" width="2" height="18" fill={grey ?? "#8b6a44"} />
        <polygon points="46,28 64,18 82,28 64,34" fill={grey ?? "#5fb6e2"} />
      </g>
      <g>
        <rect x="155" y="26" width="2" height="18" fill={grey ?? "#8b6a44"} />
        <polygon points="138,28 156,18 174,28 156,34" fill={grey ?? "#f08aa8"} />
      </g>
      {/* shrubs */}
      <circle cx="34" cy="46" r="10" fill={grey ?? "#5aa63c"} />
      <circle cx="188" cy="46" r="10" fill={grey ?? "#4f9a35"} />
    </svg>
  );
}

function DecorateScreen({ banner }: { banner: string }) {
  return (
    <div className="relative h-full w-full bg-[linear-gradient(180deg,#a7d9ef_0%,#c9e7a3_34%,#efe2bd_56%,#eed6a0_100%)]">
      <Banner>{banner}</Banner>
      <div className="flex h-full flex-col items-center justify-center gap-2 px-2 pt-12 pb-6">
        <PatioScene muted />
        <svg viewBox="0 0 60 46" className="w-[52px]">
          <path
            d="M8 6c22 2 34 12 38 26"
            stroke="#ffffff"
            strokeWidth="7"
            fill="none"
            strokeLinecap="round"
          />
          <polygon points="34,32 52,36 42,44" fill="#ffffff" />
        </svg>
        <PatioScene />
      </div>
    </div>
  );
}

function PhoneScreen({ kind, banner }: { kind: ScreenKind; banner: string }) {
  if (kind === "discover") return <DiscoverScreen banner={banner} />;
  if (kind === "reveal") return <RevealScreen banner={banner} />;
  return <DecorateScreen banner={banner} />;
}

/* ------------------------------------------------------------------ phone */

function Phone({
  card,
  offset,
  onSelect,
}: {
  card: Card;
  offset: number;
  onSelect: () => void;
}) {
  const abs = Math.min(RANGE, Math.abs(offset));
  const veil = Math.min(0.42, abs * 0.3);
  const bezel = `hsl(220 6% ${lerp(6, 52, Math.min(1, abs))}%)`;

  return (
    <button
      type="button"
      onClick={onSelect}
      tabIndex={abs < 0.5 ? 0 : -1}
      className="absolute top-1/2 left-1/2 origin-center cursor-grab border-0 bg-transparent p-0 will-change-transform [backface-visibility:hidden] active:cursor-grabbing"
      style={{
        ...poseFromOffset(offset),
        width: CARD.w,
        marginLeft: -CARD.w / 2,
        marginTop: -CARD.h / 2,
      }}
      aria-label={card.banner}
    >
      <div
        className="rounded-[46px]"
        style={{
          width: CARD.w,
          height: CARD.h,
          padding: CARD.bezel,
          background: bezel,
          boxShadow: `0 ${lerp(30, 12, Math.min(1, abs))}px ${lerp(52, 24, Math.min(1, abs))}px rgba(0,0,0,${lerp(0.3, 0.14, Math.min(1, abs))})`,
        }}
      >
        <div className="relative h-full w-full overflow-hidden rounded-[34px] bg-[#b9e0f5]">
          {card.src ? (
            <Image
              src={card.src}
              alt={card.banner}
              fill
              sizes="320px"
              className="pointer-events-none object-cover"
            />
          ) : (
            <PhoneScreen kind={card.kind} banner={card.banner} />
          )}
          <div
            className="pointer-events-none absolute inset-0 bg-white"
            style={{ opacity: veil }}
          />
        </div>
      </div>
    </button>
  );
}

/* -------------------------------------------------------------- showcase */

export default function PhoneShowcase() {
  const n = CARDS.length;
  const [pos, setPos] = useState(START);

  const posRef = useRef(START);
  const targetRef = useRef(START);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef(0);
  const draggingRef = useRef(false);
  const startX = useRef(0);
  const startPos = useRef(START);
  const didDrag = useRef(false);

  const write = (value: number) => {
    posRef.current = value;
    setPos(value);
  };

  const animate = useCallback(() => {
    if (rafRef.current !== null) return;
    lastRef.current = 0;

    const loop = (time: number) => {
      const dt = Math.min(0.05, (time - (lastRef.current || time)) / 1000);
      lastRef.current = time;

      const target = targetRef.current;
      const next = posRef.current + (target - posRef.current) * (1 - Math.exp(-11 * dt));

      if (Math.abs(target - next) < 0.001) {
        rafRef.current = null;
        write(target);
        return;
      }
      write(next);
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
  }, []);

  const stop = () => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  useEffect(() => stop, []);

  const goTo = useCallback(
    (index: number) => {
      targetRef.current = index;
      animate();
    },
    [animate],
  );

  const step = useCallback(
    (dir: number) => goTo(Math.round(posRef.current) + dir),
    [goTo],
  );

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    stop();
    didDrag.current = false;
    draggingRef.current = true;
    startX.current = e.clientX;
    startPos.current = posRef.current;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    const dx = e.clientX - startX.current;
    if (Math.abs(dx) > 6) didDrag.current = true;
    write(startPos.current - dx / SPACING);
  };

  const onPointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    const dx = e.clientX - startX.current;

    let target = Math.round(posRef.current);
    if (Math.abs(dx) > SWIPE && target === Math.round(startPos.current)) {
      target = Math.round(startPos.current) - Math.sign(dx);
    }
    goTo(target);
  };

  const base = Math.round(pos);
  const slots = [];
  for (let k = base - RANGE; k <= base + RANGE; k++) {
    slots.push({ k, card: CARDS[mod(k, n)], offset: k - pos });
  }

  return (
    <div className="relative mt-8 w-full overflow-x-hidden py-4 sm:mt-16 sm:py-6">
      <div className="relative mx-auto h-[400px] w-full max-w-[1280px] min-[420px]:h-[470px] sm:h-[600px] lg:h-[820px]">
        <div
          className="absolute inset-0 origin-center scale-[0.46] cursor-grab touch-pan-y select-none focus:outline-none active:cursor-grabbing min-[420px]:scale-[0.54] sm:scale-[0.7] lg:scale-100"
          style={{ perspective: "1600px", perspectiveOrigin: "50% 50%" }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") step(1);
            if (e.key === "ArrowLeft") step(-1);
          }}
          tabIndex={0}
          role="region"
          aria-label="Word Places screens"
        >
          <div className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
            {slots.map(({ k, card, offset }) => (
              <Phone
                key={k}
                card={card}
                offset={offset}
                onSelect={() => {
                  if (didDrag.current) return;
                  goTo(k);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
