import type { Metadata } from "next";
import { cormorant, jost } from "./fonts";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import CustomCursor from "@/components/ui/CustomCursor";
import ClientReveal from "@/components/ui/ClientReveal";

export const metadata: Metadata = {
  title: "Vrew Kriya — Luxury Jewelry Marketing Studio",
  description:
    "A luxury visual studio crafting campaigns, shoots, and digital presence for jewelry brands that deserve to be felt.",
  keywords: [
    "jewelry marketing",
    "luxury shoots",
    "jewelry campaigns",
    "jewelry branding",
    "Mumbai",
  ],
  openGraph: {
    title: "Vrew Kriya",
    description: "Where jewelry brands find their light.",
    url: "https://vrewkriya.com",
    siteName: "Vrew Kriya",
    type: "website",
  },
  metadataBase: new URL('https://vrewkriya.com'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body
        className="bg-bg text-cream font-sans antialiased"
        suppressHydrationWarning
      >
        <LenisProvider>
          <ClientReveal />
          <CustomCursor />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
