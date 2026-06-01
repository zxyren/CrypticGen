import type { Metadata } from "next";
import { Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const BASE_URL = "https://cryptgen.pages.dev";

export const metadata: Metadata = {
  title: "CryptGen — Create Strong Passwords",
  description:
    "A typography-first password generator. Generated locally. Never stored. Never sent.",
  metadataBase: new URL(BASE_URL),
  generator: "v0.app",
  openGraph: {
    title: "CryptGen — Create Strong Passwords",
    description:
      "A typography-first password generator. Generated locally. Never stored. Never sent.",
    url: BASE_URL,
    siteName: "CryptGen",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CryptGen — Create Strong Passwords",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "CryptGen — Create Strong Passwords",
    description:
      "A typography-first password generator. Generated locally. Never stored. Never sent.",
    images: ["/og-image.png"],
  },
  // Replace your current icons block with this:
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark bg-background ${bricolage.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-sans antialiased">
        <TooltipProvider>
          {children}
          {process.env.NODE_ENV === "production" && <Analytics />}
        </TooltipProvider>
      </body>
    </html>
  );
}
