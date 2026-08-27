export const FOOTER = {
  logoAlt: "Amenscapes",
  blurb:
    "Creating faith-filled puzzles and books that inspire hearts and minds through God's Word.",
  socialsHeading: "Follow Us",
  copyright: (year: number) => `© ${year} Amenscapes. All rights reserved.`,
  columns: [
    {
      heading: "Shop",
      links: [
        { label: "Wordalight", href: "/#wordalight" },
        { label: "Bentobox", href: "/#bentobox" },
        { label: "T-Shirts", href: "/#t-shirt" },
      ],
    },
    {
      heading: "Company",
      links: [
        { label: "About Us", href: "/#About" },
        { label: "Our Mission", href: "/#About" },
        { label: "Contact", href: "#" },
      ],
    },
    {
      heading: "Support",
      links: [
        { label: "FAQ", href: "#" },
        { label: "Shipping & Returns", href: "#" },
        { label: "Privacy Policy", href: "#" },
      ],
    },
  ],
  socials: [
    { label: "Instagram", href: "#" },
    { label: "Facebook", href: "#" },
    { label: "Email", href: "#" },
  ],
} as const;
