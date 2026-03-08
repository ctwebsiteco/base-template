import Link from "next/link";
import { Button } from "@/components/ui/button";

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Coffee cup */}
      <rect x="10" y="25" width="25" height="30" rx="3" fill="#8B7355" stroke="#1B4332" strokeWidth="2" />
      <ellipse cx="22.5" cy="25" rx="12.5" ry="5" fill="#D4A574" stroke="#1B4332" strokeWidth="2" />
      <path d="M35 32 C42 32, 42 48, 35 48" stroke="#1B4332" strokeWidth="2" fill="none" />
      {/* Steam */}
      <path d="M18 18 Q16 14, 18 10" stroke="#1B4332" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M23 16 Q21 12, 23 8" stroke="#1B4332" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M28 18 Q26 14, 28 10" stroke="#1B4332" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Bagel */}
      <circle cx="58" cy="45" r="18" fill="#D4A574" stroke="#1B4332" strokeWidth="2" />
      <circle cx="58" cy="45" r="7" fill="#F5E6D3" stroke="#1B4332" strokeWidth="2" />
      {/* Seeds */}
      <circle cx="50" cy="38" r="1.5" fill="#8B7355" />
      <circle cx="66" cy="40" r="1.5" fill="#8B7355" />
      <circle cx="52" cy="52" r="1.5" fill="#8B7355" />
      <circle cx="64" cy="50" r="1.5" fill="#8B7355" />
    </svg>
  );
}

function CateringIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Container 1 */}
      <rect x="5" y="15" width="25" height="15" rx="2" fill="#8B9A73" stroke="#1B4332" strokeWidth="2" />
      <rect x="5" y="12" width="25" height="5" rx="1" fill="#A8B896" stroke="#1B4332" strokeWidth="2" />
      {/* Container 2 */}
      <rect x="5" y="35" width="25" height="15" rx="2" fill="#8B9A73" stroke="#1B4332" strokeWidth="2" />
      <rect x="5" y="32" width="25" height="5" rx="1" fill="#A8B896" stroke="#1B4332" strokeWidth="2" />
      {/* Container 3 */}
      <rect x="5" y="55" width="25" height="15" rx="2" fill="#8B9A73" stroke="#1B4332" strokeWidth="2" />
      <rect x="5" y="52" width="25" height="5" rx="1" fill="#A8B896" stroke="#1B4332" strokeWidth="2" />
      {/* Platter */}
      <ellipse cx="55" cy="55" rx="20" ry="12" fill="#D4A574" stroke="#1B4332" strokeWidth="2" />
      <ellipse cx="55" cy="52" rx="18" ry="10" fill="#E8D5C0" stroke="#1B4332" strokeWidth="1.5" />
      {/* Bagels on platter */}
      <circle cx="48" cy="48" r="6" fill="#D4A574" stroke="#1B4332" strokeWidth="1.5" />
      <circle cx="48" cy="48" r="2" fill="#F5E6D3" />
      <circle cx="62" cy="48" r="6" fill="#D4A574" stroke="#1B4332" strokeWidth="1.5" />
      <circle cx="62" cy="48" r="2" fill="#F5E6D3" />
      <circle cx="55" cy="42" r="6" fill="#D4A574" stroke="#1B4332" strokeWidth="1.5" />
      <circle cx="55" cy="42" r="2" fill="#F5E6D3" />
    </svg>
  );
}

interface FeatureCardsProps {
  data: {
    menuCardTitle?: string;
    menuCardSubtitle?: string;
    cateringCardTitle?: string;
    cateringCardSubtitle?: string;
  } | null;
}

export function FeatureCards({ data }: FeatureCardsProps) {
  const menuTitle = data?.menuCardTitle || "OUR MENU:";
  const menuSubtitle = data?.menuCardSubtitle || "EXPLORE BREW & BAKE";
  const cateringTitle = data?.cateringCardTitle || "CATERING:";
  const cateringSubtitle = data?.cateringCardSubtitle || "PERFECT PLATTERS";

  return (
    <section className="bg-secondary/50 py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Menu Card */}
          <div className="bg-card border-2 border-primary p-6 md:p-8 flex items-center justify-between gap-4 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex-1">
              <h2 className="font-serif text-xl md:text-2xl font-bold text-foreground">
                {menuTitle}
              </h2>
              <p className="text-lg md:text-xl font-medium text-muted-foreground mt-1">
                {menuSubtitle}
              </p>
              <Button asChild className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/menu">Learn More</Link>
              </Button>
            </div>
            <MenuIcon className="size-24 md:size-32 flex-shrink-0" />
          </div>

          {/* Catering Card */}
          <div className="bg-card border-2 border-primary p-6 md:p-8 flex items-center justify-between gap-4 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex-1">
              <h2 className="font-serif text-xl md:text-2xl font-bold text-foreground">
                {cateringTitle}
              </h2>
              <p className="text-lg md:text-xl font-medium text-muted-foreground mt-1">
                {cateringSubtitle}
              </p>
              <Button asChild className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/catering">Learn More</Link>
              </Button>
            </div>
            <CateringIcon className="size-24 md:size-32 flex-shrink-0" />
          </div>
        </div>
      </div>
    </section>
  );
}
