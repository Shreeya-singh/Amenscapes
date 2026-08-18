import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Amenscapes",
  description: "Amenscape is a platform for creating and sharing your own landscapes",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
