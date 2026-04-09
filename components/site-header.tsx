import Link from "next/link";

// Navigation links — add site-specific routes here
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const companyName = process.env.NEXT_PUBLIC_COMPANY_NAME || "Business Name";

  return (
    <header className="border-b bg-background" data-testid="site-header">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="text-lg font-bold">
          {companyName}
        </Link>
        <nav className="hidden gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
