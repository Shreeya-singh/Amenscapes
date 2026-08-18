import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/layout/Navbar";
import Footer from "@/layout/Footer";


export const metadata: Metadata = {
  title: "Amenscapes",
  description: "Amenscape is a platform for creating and sharing your own landscapes",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
