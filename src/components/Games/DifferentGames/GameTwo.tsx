import GameSection from "@/components/Games/GameSection";

/** Paste `/videos/game2.mp4` or a Wistia/YouTube embed URL. */
const VIDEO_SRC = "";

export default function GameTwo() {
  return (
    <GameSection
      id="game2"
      title="Game2 🎮🧩"
      videoSrc="/Amenscapes/Game2_Video.jpg"
      phoneImages={[
        {
          src: "/Amenscapes/Game2_Phone1.jpg",
          alt: "Game2 Last Supper screen",
        },
        {
          src: "/Amenscapes/Game2_Phone2.jpg",
          alt: "Game2 chalice and bread screen",
        },
        {
          src: "/Amenscapes/Game2_Phone3.jpg",
          alt: "Game2 Jesus puzzle screen",
        },
      ]}
      tone="blue"
    />
  );
}
