import Image from "next/image";

interface CoffeeSectionProps {
  data: {
    coffeeSectionImageUrl?: string;
    coffeeSectionTitle?: string;
    coffeeSectionSubtitle?: string;
  } | null;
}

export function CoffeeSection({ data }: CoffeeSectionProps) {
  const imageUrl = data?.coffeeSectionImageUrl || "/images/coffee-latte.jpg";
  const title = data?.coffeeSectionTitle || "Specialty Coffee & More";
  const subtitle = data?.coffeeSectionSubtitle || "The perfect complement to your bagel";

  return (
    <section className="relative h-64 md:h-80 overflow-hidden">
      <Image
        src={imageUrl}
        alt="Specialty latte art coffee"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-primary/40" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-primary-foreground">
          <h2 className="font-serif text-2xl md:text-4xl font-bold">
            {title}
          </h2>
          <p className="mt-2 text-lg md:text-xl">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}
