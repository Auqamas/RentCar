import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const display = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  applicationName: site.name,
  title: {
    default: `${site.name} | Rent a Car Lahore`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  keywords: [
    "rent a car Lahore",
    "car rental Lahore",
    "self drive car Lahore",
    "car with driver Lahore",
    "Lahore airport car rental",
  ],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} | Rent a Car Lahore`,
    description: site.description,
    images: [{ url: "cars/range-rover.jpg", alt: "Ali Baba Rent a Car fleet" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Rent a Car Lahore`,
    description: site.description,
    images: ["cars/range-rover.jpg"],
  },
  icons: { icon: "logo.png", apple: "logo.png" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-black pb-20 text-white">{children}</body>
    </html>
  );
}
