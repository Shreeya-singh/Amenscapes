import VideoSlot from "@/components/Games/VideoSlot";
import PhoneShowcase, {
  type PhoneShot,
} from "@/components/Games/PhoneShowcase";

export type GameSectionProps = {
  /** Anchor used by the navbar links. */
  id: string;
  title: string;
  /** `/videos/foo.mp4` or a Wistia/YouTube embed URL. */
  videoSrc?: string;
  /** Portrait screenshots for the phone carousel. */
  phoneImages: PhoneShot[];
  /** `light` = white surface + blue type, `blue` = brand surface + white type. */
  tone?: "light" | "blue";
};

export default function GameSection({
  id,
  title,
  videoSrc = "",
  phoneImages,
  tone = "light",
}: GameSectionProps) {
  const onBlue = tone === "blue";

  return (
    <section
      id={id}
      className={`min-h-svh overflow-x-hidden px-4 pt-12 pb-14 sm:px-6 sm:pt-18 sm:pb-20 ${
        onBlue ? "bg-brand" : "bg-white"
      }`}
    >
      <div className="mx-auto flex w-full max-w-[1050px] flex-col items-center">
        <h1
          className={`mb-6 text-center text-[26px] leading-tight font-bold tracking-tight text-balance sm:mb-10 sm:text-[32px] lg:text-[40px] ${
            onBlue ? "text-white" : "text-brand-ink"
          }`}
        >
          {title}
        </h1>

        <VideoSlot src={videoSrc} title={`${title} gameplay`} />
      </div>

      <PhoneShowcase images={phoneImages} label={`${title} screens`} />
    </section>
  );
}
