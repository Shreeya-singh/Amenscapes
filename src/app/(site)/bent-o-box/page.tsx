import type { Metadata } from "next";
import GameTwo from "@/components/Games/DifferentGames/GameTwo";

export const metadata: Metadata = {
  title: "Bent-o-Box",
  description: "A faith-filled puzzle game from Amenscapes.",
};

export default function BentOBoxPage() {
  return <GameTwo />;
}
