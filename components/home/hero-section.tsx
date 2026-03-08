import Image from "next/image";

interface HeroSectionProps {
  data: {
    heroImageUrl?: string;
    heroImageAlt?: string;
    welcomeTitle?: string;
    welcomeSubtitle?: string;
    establishedYear?: string;
    welcomeDescription?: string;
  } | null;
}

export function HeroSection({ data }: HeroSectionProps) {
  const heroImageUrl = data?.heroImageUrl || "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gemini_Generated_Image_v6k6iv6k6iv6k6iv.png-zBiLhtX14Gkh4UzskDhFu33PmKOy65.jpeg";
  const heroImageAlt = data?.heroImageAlt || "Delicious bacon, egg, and cheese breakfast sandwich on an everything bagel";
  const welcomeTitle = data?.welcomeTitle || "WELCOME TO FANCY BAGELS";
  const welcomeSubtitle = data?.welcomeSubtitle || "in Southington.";
  const establishedYear = data?.establishedYear || "Established in 1988.";
  const welcomeDescription = data?.welcomeDescription || 'We craft fresh, authentic bagels, hearty sandwiches, & specialty coffee for a "Fancy" start to your day. Discover the taste of quality.';

  return (
    <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImageUrl}
          alt={heroImageAlt}
          fill
          className="object-cover object-center"
          priority
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 w-full">
        <div className="max-w-md">
          {/* Welcome Card */}
          <div className="bg-card/95 backdrop-blur-sm border-2 border-primary p-6 md:p-8 shadow-xl">
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-foreground text-center leading-tight">
              <span className="block text-primary">{welcomeTitle}</span>
              <span className="block text-lg md:text-xl font-normal mt-2">{welcomeSubtitle}</span>
              <span className="block text-lg md:text-xl font-normal">{establishedYear}</span>
            </h1>

            {/* Decorative line */}
            <div className="flex items-center justify-center my-4">
              <div className="h-px w-12 bg-primary" />
              <div className="size-2 bg-primary rotate-45 mx-2" />
              <div className="h-px w-12 bg-primary" />
            </div>

            <p className="text-center text-muted-foreground leading-relaxed">
              {welcomeDescription}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
