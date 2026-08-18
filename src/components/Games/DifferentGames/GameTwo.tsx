import GameSection from "@/components/Games/GameSection";

/** Paste `/videos/Bent-o-Box.mp4` or a Wistia/YouTube embed URL. */
const VIDEO_SRC = "";

export default function GameTwo() {
  return (
    <GameSection
      id="Bent-o-Box"
      title="Bent-o-Box 🎮🧩"
      videoSrc="/Amenscapes/Bent-o-Box_Video.jpg"
      phoneImages={[
        {
          src: "/Amenscapes/Bent-o-Box_Phone1.jpg",
          alt: "Bent-o-Box Last Supper screen",
        },
        {
          src: "/Amenscapes/Bent-o-Box_Phone2.jpg",
          alt: "Bent-o-Box chalice and bread screen",
        },
        {
          src: "/Amenscapes/Bent-o-Box_Phone3.jpg",
          alt: "Bent-o-Box Jesus puzzle screen",
        },
      ]}
      tone="blue"
    />
  );
}
