import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { Providers } from "./providers";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Seven Acres Estate – Luxury Countryside Venue",
    template: "%s | Seven Acres Estate",
  },
  description: "A refined seven-acre estate for elevated weddings & private events. Photography included.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${inter.variable} antialiased`}>        
    <Providers>
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <footer className="mt-24 border-t border-[var(--border-soft)]">
              <div className="mx-auto max-w-7xl px-6 py-16 grid gap-12 md:grid-cols-4 text-sm">
                <div className="space-y-4">
                  <h4 className="font-serif text-lg">Seven Acres Estate</h4>
                  <p className="muted">A luxury countryside venue for weddings & private events. Photography included.</p>
                </div>
                <div>
                  <h5 className="font-semibold mb-3 text-[11px] tracking-widest">Explore</h5>
                  <ul className="space-y-2">
                    <li><Link href="/weddings">Weddings</Link></li>
                    <li><Link href="/events">Events</Link></li>
                    <li><Link href="/gallery">Gallery</Link></li>
                    <li><Link href="/pricing">Investment</Link></li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold mb-3 text-[11px] tracking-widest">Plan</h5>
                  <ul className="space-y-2">
                    <li><Link href="/view">Schedule Viewing</Link></li>
                    <li><Link href="/book">Reserve Date</Link></li>
                    <li><Link href="/about">About</Link></li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h5 className="font-semibold mb-3 text-[11px] tracking-widest">Contact</h5>
                  <p className="muted text-[13px] leading-relaxed">123 Estate Lane<br/>Hill Country, ST<br/>info@sevenacres.test</p>
                  <p className="text-[12px] muted">© {new Date().getFullYear()} Seven Acres Estate</p>
                </div>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
