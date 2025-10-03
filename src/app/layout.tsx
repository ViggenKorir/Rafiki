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
        <head>
          {/* Google Tag Manager */}
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                     window.dataLayer = window.dataLayer || [];
                     function gtag(){dataLayer.push(arguments);}
                     gtag('js', new Date());
                     gtag('config', 'GTM-M8RJ32JC');
                   `,
            }}
          />
        </head>
        <body className="min-h-screen bg-neutral-50 font-sans antialiased">
          {/*<!-- Google Tag Manager (noscript) -->*/}
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-M8RJ32JC"
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            ></iframe>
          </noscript>
          {/*<!-- End Google Tag Manager (noscript) -->*/}
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
