import type { Metadata } from "next";
import BentoBoxComingSoon from "@/components/Home/BentoBoxComingSoon";

export const metadata: Metadata = {
  title: "Bent-o-Box",
  description: "A faith-filled puzzle game from Amenscapes.",
};

export default function BentOBoxPage() {
  return <BentoBoxComingSoon />;
}
