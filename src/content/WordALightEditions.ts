export type Edition = {
  title: string;
  blurb: string;
  src: string;
  width: number;
  height: number;
  href?: string;
  cta?: string;
};

export const WORDALIGHT = {
  heading: "WordaLight",
  tagline: "Discover God's Word, one puzzle at a time.",
  playCta: "Try the game NOW!",
  playHref: "#",
  comingSoon: "Coming soon",
  editionAlt: (title: string) => `WordaLight — ${title} edition`,
  editions: [
    {
      title: "Traditional",
      blurb: "Classic ornate\nedition.",
      src: "/WordALight/bible_Left.png",
      width: 300,
      height: 451,
      href: "#",
      cta: "Buy eBook on Gumroad",
    },
    {
      title: "Minimal / Baptist",
      blurb: "Clean minimal\nedition.",
      src: "/WordALight/bible_Right.png",
      width: 300,
      height: 451,
    },
  ] satisfies Edition[],
};
