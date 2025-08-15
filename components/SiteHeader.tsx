"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''} sticky top-0 z-50`}>      
      <nav className="mx-auto max-w-7xl px-6 h-24 flex items-center justify-between gap-10">
        <Link href="/" className="font-serif tracking-wide logo-text">Seven Acres Estate</Link>
        <div className="hidden md:flex items-center gap-10 text-[13px] font-medium">
          <Link href="/about">About</Link>
          <Link href="/weddings">Weddings</Link>
            <Link href="/events">Events</Link>
          <Link href="/gallery">Gallery</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/view" className="btn-ghost">Viewing</Link>
          <Link href="/book" className="btn-primary px-4 py-2 rounded-sm text-sm">Book</Link>
        </div>
      </nav>
    </header>
  );
}
