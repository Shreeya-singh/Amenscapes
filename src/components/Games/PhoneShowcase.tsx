"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";

export type PhoneShot = {
  src: string;
  alt: string;
};

const START = 1;

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

function Phone({
  shot,
  offset,
  onSelect,
}: {
  shot: PhoneShot;
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
      aria-label={shot.alt}
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
        <div className="relative h-full w-full overflow-hidden rounded-[34px] bg-[#111]">
          <Image
            src={shot.src}
            alt={shot.alt}
            fill
            sizes="320px"
            className="pointer-events-none object-cover"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-white"
            style={{ opacity: veil }}
          />
        </div>
      </div>
    </button>
  );
}

export default function PhoneShowcase({
  images,
  label,
}: {
  images: PhoneShot[];
  label: string;
}) {
  const n = images.length;
  const [pos, setPos] = useState(Math.min(START, Math.max(0, n - 1)));

  const posRef = useRef(pos);
  const targetRef = useRef(pos);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef(0);
  const draggingRef = useRef(false);
  const startX = useRef(0);
  const startPos = useRef(pos);
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

  if (n === 0) return null;

  const base = Math.round(pos);
  const slots = [];
  for (let k = base - RANGE; k <= base + RANGE; k++) {
    slots.push({ k, shot: images[mod(k, n)], offset: k - pos });
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
          aria-label={label}
        >
          <div className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
            {slots.map(({ k, shot, offset }) => (
              <Phone
                key={k}
                shot={shot}
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
