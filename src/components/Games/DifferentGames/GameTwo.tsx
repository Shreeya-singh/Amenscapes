import GameSection from "@/components/Games/GameSection";

/** Paste `/videos/game2.mp4` or a Wistia/YouTube embed URL. */
const VIDEO_SRC = "";

export default function GameTwo() {
  return (
    <GameSection
      id="game2"
      title="Game2 🎮🧩"
      videoSrc={VIDEO_SRC}
      tone="blue"
    />
  );
}
