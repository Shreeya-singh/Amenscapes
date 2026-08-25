/**
 * Gold line-art shared by the editorial sections. Everything draws in
 * `currentColor`, so colour comes from the caller (`text-gold`).
 */

/** A cross with flared arms, drawn at the centre of the wide ornaments. */
export function Cross({ top, bottom }: { top: number; bottom: number }) {
  const arm = top + (bottom - top) * 0.32;
  return (
    <g stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <path d={`M160 ${top}v${bottom - top}`} />
      <path d={`M149 ${arm}h22`} />
    </g>
  );
}

/** The scrolling vine on its own — used either side of a heading. */
const vine = (
  <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none">
    <path d="M170 31c14 0 20-11 34-13 14-2 25 4 25 12 0 8-9 12-14 7-5-5 0-13 9-12 12 1 21 4 29 5" />
    <path d="M204 18c1-6 6-10 12-11" />
  </g>
);

/**
 * Scrolling vine either side of a cross. The right half is drawn once and
 * mirrored, so the two sides stay in step.
 */
export function ScrollOrnament({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 46" className={className} fill="none" aria-hidden>
      <Cross top={4} bottom={32} />
      {vine}
      <g transform="translate(320,0) scale(-1,1)">{vine}</g>
      <g fill="currentColor">
        <circle cx="276" cy="33" r="1.8" />
        <circle cx="44" cy="33" r="1.8" />
      </g>
    </svg>
  );
}

/** A long gold rule with diamond terminals and the cross standing on it. */
export function RuleOrnament({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 40" className={className} fill="none" aria-hidden>
      <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M160 32H74c-9 0-16-2-23-6" />
        <path d="M160 32h86c9 0 16-2 23-6" />
      </g>
      <Cross top={8} bottom={32} />
      <g fill="currentColor">
        <path d="M45.5 21.5l4.2 4.5-4.2 4.5-4.2-4.5z" />
        <path d="M274.5 21.5l4.2 4.5-4.2 4.5-4.2-4.5z" />
        <circle cx="33" cy="26" r="1.8" />
        <circle cx="287" cy="26" r="1.8" />
      </g>
    </svg>
  );
}

/**
 * A single vine, cropped out of `ScrollOrnament`, for flanking a heading.
 * `flip` mirrors it for the left-hand side.
 */
export function Flourish({
  className = "",
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <svg
      viewBox="164 8 116 32"
      className={`${flip ? "-scale-x-100 " : ""}${className}`}
      fill="none"
      aria-hidden
    >
      {vine}
      <circle cx="276" cy="33" r="1.8" fill="currentColor" />
    </svg>
  );
}

/** The small cross that sits between the two edition columns. */
export function CrossMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="140 0 40 40" className={className} fill="none" aria-hidden>
      <Cross top={6} bottom={34} />
    </svg>
  );
}

/** A small ornate plus, used as a full stop between a heading and its copy. */
export function PlusMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <g stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
        <path d="M12 6v12M6 12h12" />
      </g>
      <g fill="currentColor">
        <path d="M12 2.8l1.5 2.6L12 8l-1.5-2.6z" />
        <path d="M12 16l1.5 2.6L12 21.2l-1.5-2.6z" />
        <path d="M2.8 12l2.6-1.5L8 12l-2.6 1.5z" />
        <path d="M16 12l2.6-1.5L21.2 12l-2.6 1.5z" />
      </g>
    </svg>
  );
}

/** Leaves are one shape, placed twice per node so the sprig stays symmetric. */
const oliveLeaves = [
  { x: 39, y: 26, r: -68, s: 0.7 },
  { x: 37, y: 41, r: -42, s: 0.85 },
  { x: 35, y: 41, r: 222, s: 0.85 },
  { x: 35, y: 57, r: -34, s: 1 },
  { x: 33, y: 57, r: 214, s: 1 },
  { x: 34, y: 73, r: -28, s: 0.88 },
  { x: 32, y: 73, r: 208, s: 0.88 },
];

/** A sprig of olive — the quiet sign-off beneath a block of copy. */
export function OliveBranch({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 96" className={className} fill="none" aria-hidden>
      <path
        d="M31 92c-3-22-1-44 8-66"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <g fill="currentColor">
        {oliveLeaves.map((leaf) => (
          <path
            key={`${leaf.x}-${leaf.y}`}
            d="M0 0c5-4 12-4 17 0-5 4-12 4-17 0Z"
            transform={`translate(${leaf.x},${leaf.y}) rotate(${leaf.r}) scale(${leaf.s})`}
          />
        ))}
        <circle cx="29" cy="49" r="1.6" />
        <circle cx="30" cy="65" r="1.6" />
      </g>
    </svg>
  );
}
