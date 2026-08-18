import type { ReactNode } from "react";

type VideoSlotProps = {
  /** Image (`/cover.jpg`) or video (`/videos/foo.mp4`) URL. Leave empty for the placeholder. */
  src?: string;
  poster?: string;
  title: string;
  children?: ReactNode;
};

function isImageSrc(src: string) {
  return (
    src.startsWith("data:image/") ||
    /\.(jpe?g|png|gif|webp|avif|svg|bmp|ico)(\?|$)/i.test(src)
  );
}

function isVideoSrc(src: string) {
  return (
    src.startsWith("blob:") ||
    src.startsWith("data:video/") ||
    /\.(mp4|webm|ogg|mov|m4v)(\?|$)/i.test(src)
  );
}

export default function VideoSlot({
  src,
  poster,
  title,
  children,
}: VideoSlotProps) {
  const media = src?.trim();

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-[6px] bg-[#1a1a1a] shadow-[0_8px_28px_rgba(0,0,0,0.18)]">
      {children ? (
        <div className="absolute inset-0 size-full [&_iframe]:size-full [&_video]:size-full">
          {children}
        </div>
      ) : media && isImageSrc(media) ? (
        <img
          src={media}
          alt={title}
          className="absolute inset-0 size-full object-cover"
        />
      ) : media && isVideoSrc(media) ? (
        <video
          className="absolute inset-0 size-full object-cover"
          src={media}
          poster={poster}
          controls
          playsInline
          preload="metadata"
        >
          Your browser does not support the video tag.
        </video>
      ) : (
        <div className="absolute inset-0 grid place-items-center bg-[linear-gradient(180deg,#9fd4f5_0%,#b7e08a_70%,#7ec85a_100%)]">
          <span
            aria-hidden
            className="grid h-[124px] w-[200px] place-items-center rounded-[14px] bg-[#3a7a2e]/85 shadow-[0_8px_24px_rgba(0,0,0,0.28)]"
          >
            <svg
              width="52"
              height="60"
              viewBox="0 0 52 60"
              fill="none"
              className="translate-x-[4px]"
            >
              <path d="M50 30 4 56.5V3.5L50 30Z" fill="white" />
            </svg>
          </span>
          <span className="sr-only">{title} video placeholder</span>
        </div>
      )}
    </div>
  );
}
