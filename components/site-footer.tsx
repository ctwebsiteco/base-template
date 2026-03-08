"use client";

import Link from "next/link";
import { useState } from "react";
import { Facebook, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/catering", label: "Catering" },
  { href: "/locations", label: "Locations" },
  { href: "/about", label: "About Us" },
];

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setMessage("");

    // Simulate submission - in production, this would call a Server Action
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setMessage("Thanks for signing up!");
    setEmail("");
    setIsSubmitting(false);
  };

  return (
    <footer className="bg-primary text-primary-foreground" data-testid="site-footer">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Navigation */}
          <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            {navLinks.map((link, index) => (
              <div key={link.href} className="flex items-center">
                <Link
                  href={link.href}
                  className="text-sm font-medium hover:underline transition-colors"
                >
                  {link.label}
                </Link>
                {index < navLinks.length - 1 && (
                  <span className="ml-4 text-primary-foreground/50">|</span>
                )}
              </div>
            ))}
          </nav>

          {/* Email Signup */}
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <Input
              type="email"
              placeholder={'Join our "Fancy" email list!'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-64 bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/60 focus:border-accent"
              required
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              {isSubmitting ? "..." : "Sign Up"}
            </Button>
          </form>
        </div>

        {message && (
          <p className="text-center text-sm text-accent mt-4">{message}</p>
        )}

        {/* Social & Copyright */}
        <div className="mt-8 pt-6 border-t border-primary-foreground/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
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
          <p className="text-sm text-primary-foreground/80">
            &copy; {new Date().getFullYear()} Fancy Bagels. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
