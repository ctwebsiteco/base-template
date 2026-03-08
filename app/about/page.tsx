import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Us | Fancy Bagels | Family-Owned Since 1988",
  description:
    "Learn about Fancy Bagels, a family-owned bagel shop serving Southington, CT since 1988. Discover our story, commitment to quality, and community involvement.",
};

export default function AboutPage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold">About Us</h1>
          <p className="mt-4 text-lg md:text-xl text-primary-foreground/80">
            Magic in Every Fancy Day since 1988
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-5xl px-4">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
                Our Story
              </h2>
              <div className="flex items-center mt-4 mb-6">
                <div className="h-px w-12 bg-primary" />
                <div className="size-2 bg-primary rotate-45 mx-2" />
                <div className="h-px w-12 bg-primary" />
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  In 1988, Fancy Bagels opened its doors in Southington, Connecticut, 
                  with a simple mission: to bring authentic, New York-style bagels to 
                  our community. What started as a small family operation has grown 
                  into a beloved local institution.
                </p>
                <p>
                  Every morning, our bakers arrive before dawn to kettle-boil and 
                  bake our bagels fresh, just like they did in the original New York 
                  bagel shops. We believe in the time-honored traditions that make 
                  a bagel truly exceptional—crispy on the outside, chewy on the inside.
                </p>
                <p>
                  Over three decades later, we remain committed to the same quality 
                  and care that our founders brought to that first batch of bagels. 
                  {"We're"} proud to serve generations of families who have made Fancy 
                  Bagels a part of their morning routine.
                </p>
              </div>
            </div>
            <div className="relative aspect-square">
              <Image
                src="/images/bakery-interior.jpg"
                alt="Inside Fancy Bagels bakery"
                fill
                className="object-cover rounded-lg border-2 border-primary"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-secondary py-12 md:py-16">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground text-center">
            Our Commitment
          </h2>
          <div className="flex items-center justify-center mt-4 mb-10">
            <div className="h-px w-12 bg-primary" />
            <div className="size-2 bg-primary rotate-45 mx-2" />
            <div className="h-px w-12 bg-primary" />
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            <div className="bg-card border-2 border-primary p-6 text-center">
              <div className="size-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="size-8 text-primary"
                >
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
              </div>
              <h3 className="font-serif text-lg font-bold text-foreground">Quality First</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                We never compromise on ingredients. Every bagel is made with premium flour, 
                real malt, and traditional techniques.
              </p>
            </div>

            <div className="bg-card border-2 border-primary p-6 text-center">
              <div className="size-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="size-8 text-primary"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3 className="font-serif text-lg font-bold text-foreground">Family Values</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {"We're"} a family-owned business that treats every customer like family. 
                Your satisfaction is our priority.
              </p>
            </div>

            <div className="bg-card border-2 border-primary p-6 text-center">
              <div className="size-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="size-8 text-primary"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9,22 9,12 15,12 15,22" />
                </svg>
              </div>
              <h3 className="font-serif text-lg font-bold text-foreground">Community Focused</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                From local sports teams to school fundraisers, {"we're"} proud to give back 
                to the community {"that's"} supported us for over 35 years.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground text-center">
            Our Journey
          </h2>
          <div className="flex items-center justify-center mt-4 mb-10">
            <div className="h-px w-12 bg-primary" />
            <div className="size-2 bg-primary rotate-45 mx-2" />
            <div className="h-px w-12 bg-primary" />
          </div>

          <div className="space-y-8">
            {[
              { year: "1988", event: "Fancy Bagels opens in Southington" },
              { year: "1995", event: "Expanded menu to include lunch options" },
              { year: "2003", event: "Opened second location in Plantsville" },
              { year: "2015", event: "Introduced specialty coffee program" },
              { year: "2018", event: "Celebrated 30 years of service" },
              { year: "2020", event: "Launched online ordering" },
              { year: "2023", event: "Opened third location in Farmington" },
            ].map((milestone) => (
              <div key={milestone.year} className="flex items-start gap-4">
                <span className="font-serif text-lg font-bold text-primary min-w-[60px]">
                  {milestone.year}
                </span>
                <div className="flex-1 border-l-2 border-primary pl-4 pb-4">
                  <p className="text-foreground">{milestone.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
