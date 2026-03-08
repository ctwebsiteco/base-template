import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gemini_Generated_Image_v6k6iv6k6iv6k6iv.png-zBiLhtX14Gkh4UzskDhFu33PmKOy65.jpeg"
          alt="Delicious bacon, egg, and cheese breakfast sandwich on an everything bagel"
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
              <span className="block text-primary">WELCOME TO FANCY BAGELS</span>
              <span className="block text-lg md:text-xl font-normal mt-2">in Southington.</span>
              <span className="block text-lg md:text-xl font-normal">Established in 1988.</span>
            </h1>

            {/* Decorative line */}
            <div className="flex items-center justify-center my-4">
              <div className="h-px w-12 bg-primary" />
              <div className="size-2 bg-primary rotate-45 mx-2" />
              <div className="h-px w-12 bg-primary" />
            </div>

            <p className="text-center text-muted-foreground leading-relaxed">
              We craft fresh, authentic bagels, hearty sandwiches, & specialty coffee for
              a "Fancy" start to your day. Discover the taste of quality.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
