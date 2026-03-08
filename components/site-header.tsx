"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Phone, MapPin, Clock, Facebook, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/catering", label: "Catering" },
  { href: "/locations", label: "Locations" },
  { href: "/about", label: "About Us" },
];

function BagelLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="30" cy="30" r="28" fill="#D4A574" stroke="#1B4332" strokeWidth="2" />
      <circle cx="30" cy="30" r="12" fill="#F5E6D3" stroke="#1B4332" strokeWidth="2" />
      <circle cx="20" cy="20" r="2" fill="#8B7355" />
      <circle cx="40" cy="18" r="1.5" fill="#8B7355" />
      <circle cx="42" cy="32" r="2" fill="#8B7355" />
      <circle cx="38" cy="42" r="1.5" fill="#8B7355" />
      <circle cx="22" cy="40" r="2" fill="#8B7355" />
      <circle cx="18" cy="30" r="1.5" fill="#8B7355" />
      <circle cx="30" cy="16" r="1.5" fill="#8B7355" />
      <circle cx="44" cy="26" r="1" fill="#8B7355" />
      <circle cx="16" cy="36" r="1" fill="#8B7355" />
    </svg>
  );
}

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-secondary border-b-2 border-primary" data-testid="site-header">
      {/* Top bar with contact info */}
      <div className="bg-primary text-primary-foreground py-2">
        <div className="mx-auto max-w-7xl px-4 flex flex-wrap items-center justify-between gap-2 text-sm">
          <div className="flex items-center gap-4 flex-wrap">
            <a
              href="https://maps.google.com/?q=405+Queen+St+Southington+CT"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:underline"
            >
              <MapPin className="size-4" />
              <span className="hidden sm:inline">405 Queen St. (Route 10), Southington, CT</span>
              <span className="sm:hidden">Southington, CT</span>
            </a>
            <a href="tel:8606210055" className="flex items-center gap-1.5 hover:underline">
              <Phone className="size-4" />
              <span>(860) 621-0055</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-1.5">
              <Clock className="size-4" />
              <span className="text-xs">Mon-Fri: 6am-2pm | Sat: 6:30am-2pm | Sun: 7am-1:30pm</span>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="https://facebook.com/fancybagels"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="hover:opacity-80 transition-opacity"
              >
                <Facebook className="size-5" />
              </a>
              <a
                href="https://instagram.com/fancybagels"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:opacity-80 transition-opacity"
              >
                <Instagram className="size-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex items-center">
              <span className="font-serif text-2xl md:text-3xl font-bold text-primary tracking-wide">
                FANCY
              </span>
              <BagelLogo className="size-10 md:size-12 mx-2" />
              <span className="font-serif text-2xl md:text-3xl font-bold text-primary tracking-wide">
                BAGELS
              </span>
            </div>
          </Link>

          {/* Desktop Navigation & CTAs */}
          <div className="hidden lg:flex items-center gap-6">
            <nav className="flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-3">
              <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <a href="https://order.fancybagels.com" target="_blank" rel="noopener noreferrer">
                  Order Online
                </a>
              </Button>
              <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <a
                  href="https://maps.google.com/?q=405+Queen+St+Southington+CT"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Directions
                </a>
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-foreground"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-primary/20 pt-4">
            <nav className="flex flex-col gap-3 mb-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-base font-medium text-foreground hover:text-primary transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-3">
              <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                <a href="https://order.fancybagels.com" target="_blank" rel="noopener noreferrer">
                  Order Online
                </a>
              </Button>
              <Button asChild variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <a
                  href="https://maps.google.com/?q=405+Queen+St+Southington+CT"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Directions
                </a>
              </Button>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-sm text-muted-foreground">
              <Clock className="size-4" />
              <span>Mon-Fri: 6am-2pm | Sat: 6:30am-2pm | Sun: 7am-1:30pm</span>
            </div>
          </div>
        )}
      </div>

      {/* Tagline */}
      <div className="bg-secondary border-t border-primary/20 py-2 text-center">
        <p className="font-serif text-sm md:text-base text-foreground italic">
          Est. 1988 — Magic in Every Fancy Day
        </p>
      </div>
    </header>
  );
}
