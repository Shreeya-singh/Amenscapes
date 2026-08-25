import type { Metadata } from "next";
import BibleWordALight from "@/components/Games/DifferentGames/BibleWordALight";

export const metadata: Metadata = {
  title: "Bible WordaLight",
  description: "Discover God's Word, one puzzle at a time.",
};

export default function WordALightPage() {
  return <BibleWordALight />;
}
