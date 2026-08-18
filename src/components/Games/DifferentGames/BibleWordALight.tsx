import GameSection from "@/components/Games/GameSection";

/** Paste `/videos/bible-word-a-light.mp4` or a Wistia/YouTube embed URL. */
const VIDEO_SRC = "";

export default function BibleWordALight() {
  return (
    <GameSection
      id="bible-word-a-light"
      title="BibleWordALight 📖✨"
      videoSrc={VIDEO_SRC}
      tone="light"
    />
  );
}
