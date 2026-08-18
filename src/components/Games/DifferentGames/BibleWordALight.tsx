import GameSection from "@/components/Games/GameSection";

/** Paste `/videos/bible-word-a-light.mp4` or a Wistia/YouTube embed URL. */
const VIDEO_SRC = "";

export default function BibleWordALight() {
  return (
    <GameSection
      id="bible-word-a-light"
      title="BibleWordALight 📖✨"
      videoSrc="/Amenscapes/BibleWordALight.jpg"
      phoneImages={[
        {
          src: "/Amenscapes/BibleWordALight_Phone1.jpg",
          alt: "Bible Word A Light verse fill-in",
        },
        {
          src: "/Amenscapes/BibleWordALight_Phone2.jpg",
          alt: "Bible Word A Light word search",
        },
        {
          src: "/Amenscapes/BibleWordALight_Phone3.jpg",
          alt: "Bible Word A Light cover puzzle",
        },
      ]}
      tone="light"
    />
  );
}
