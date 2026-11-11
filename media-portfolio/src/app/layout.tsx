import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vladyslavrutskyi.github.io/Website"),
  title: "Vladyslav Rutskyi | Creative Producer & Videography Studio",
  description:
    "Cinematic videography, commercial production, and creative marketing services for brands, automotive businesses, and premium product launches.",
  keywords: [
    "videography",
    "commercial production",
    "creative producer",
    "automotive videography",
    "jewelry videography",
    "brand campaigns",
    "Sacramento videographer",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Vladyslav Rutskyi | Creative Producer & Videography Studio",
    description:
      "Visual storytelling that moves businesses forward through commercial videography, luxury product content, and brand campaigns.",
    url: "https://vladyslavrutskyi.github.io/Website/",
    siteName: "Vladyslav Rutskyi Creative Studios",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vladyslav Rutskyi | Creative Producer & Videography Studio",
    description:
      "Cinematic video and creative production for brands, businesses, and premium product launches.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0d0d0d",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
