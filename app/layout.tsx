import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") || requestHeaders.get("host") || "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") || (host.includes("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const title = "Divine Collection | Premium Spiritual & Decorative Products";
  const description = "Shop premium spiritual, temple and decorative products crafted for peaceful, meaningful spaces across Malaysia.";
  return {
    metadataBase: new URL(origin),
    title: { default: title, template: "%s | Divine Collection" },
    description,
    keywords: ["spiritual decor Malaysia", "home temple", "pooja accessories", "Divine Collection"],
    icons: { icon: "/og.png", shortcut: "/og.png" },
    openGraph: {
      title,
      description,
      type: "website",
      locale: "en_MY",
      siteName: "Divine Collection",
      url: origin,
      images: [{ url: `${origin}/og.png`, width: 1536, height: 1024, alt: "Divine Collection — Bring Divine Beauty Into Your Space" }],
    },
    twitter: { card: "summary_large_image", title, description, images: [`${origin}/og.png`] },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
