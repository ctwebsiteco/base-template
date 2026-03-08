import Image from "next/image";

export function CoffeeSection() {
  return (
    <section className="relative h-64 md:h-80 overflow-hidden">
      <Image
        src="/images/coffee-latte.jpg"
        alt="Specialty latte art coffee"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-primary/40" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-primary-foreground">
          <h2 className="font-serif text-2xl md:text-4xl font-bold">
            Specialty Coffee & More
          </h2>
          <p className="mt-2 text-lg md:text-xl">
            The perfect complement to your bagel
          </p>
        </div>
      </div>
    </section>
  );
}
