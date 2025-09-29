import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Rafiki Partners",
    default: "Rafiki Partners - Architectural & Construction Services",
  },
  description:
    "Professional architectural design and construction services for residential and commercial projects.",
  keywords: [
    "architecture",
    "construction",
    "residential",
    "commercial",
    "design",
    "building",
    "Kenya",
    "East Africa",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={inter.variable}>
        <body className="min-h-screen bg-neutral-50 font-sans antialiased">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
