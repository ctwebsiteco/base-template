import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { sanityFetch } from "@/sanity/lib/live";
import { CATERING_PACKAGES_QUERY } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Catering | Fancy Bagels | Bagel Platters & Event Catering in CT",
  description:
    "Order bagel platters, breakfast catering, and coffee service for your next event from Fancy Bagels in Southington, CT. Perfect for meetings, parties, and corporate events.",
};

interface CateringPackage {
  _id: string;
  title: string;
  description: string;
  servings: string;
  price: string;
  includes: string[];
}

export default async function CateringPage() {
  const { data: packages } = await sanityFetch({ query: CATERING_PACKAGES_QUERY });

  // Fallback data if Sanity is empty
  const cateringOptions: CateringPackage[] = packages?.length > 0 ? packages : [
    {
      _id: "bagel-platters",
      title: "Bagel Platters",
      description: "Fresh-baked assorted bagels with a variety of cream cheese spreads",
      servings: "Serves 10-12",
      price: "Starting at $39.99",
      includes: ["12 assorted bagels", "3 cream cheese varieties", "Butter", "Serving utensils"],
    },
    {
      _id: "breakfast-platter",
      title: "Breakfast Sandwich Platter",
      description: "Assorted breakfast sandwiches for your hungry crowd",
      servings: "Serves 8-10",
      price: "Starting at $69.99",
      includes: ["10 assorted breakfast sandwiches", "Mix of bacon, sausage, and veggie options", "Napkins and plates"],
    },
    {
      _id: "deli-platter",
      title: "Deli Lunch Platter",
      description: "Premium deli sandwiches and wraps",
      servings: "Serves 10-12",
      price: "Starting at $89.99",
      includes: ["12 half sandwiches/wraps", "Turkey, ham, roast beef, and veggie options", "Pickle spears", "Chips"],
    },
    {
      _id: "coffee-service",
      title: "Coffee & Tea Service",
      description: "Hot beverages for your meeting or event",
      servings: "Serves 10-12",
      price: "Starting at $29.99",
      includes: ["96 oz fresh brewed coffee", "Assorted teas", "Cream, sugar, stirrers", "Cups and lids"],
    },
  ];

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold">Catering</h1>
          <p className="mt-4 text-lg md:text-xl text-primary-foreground/80">
            Perfect platters for every occasion
          </p>
        </div>
      </section>

      {/* Catering Options */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
              Our Catering Packages
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              From morning meetings to afternoon parties, we have the perfect spread 
              for your event. All orders require 24-hour advance notice.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {cateringOptions.map((option) => (
              <div
                key={option._id}
                className="bg-card border-2 border-primary p-6 shadow-lg"
              >
                <h3 className="font-serif text-xl font-bold text-foreground">
                  {option.title}
                </h3>
                <p className="mt-2 text-muted-foreground">{option.description}</p>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{option.servings}</span>
                  <span className="font-semibold text-primary">{option.price}</span>
                </div>
                <ul className="mt-4 space-y-1">
                  {option.includes?.map((item, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="size-1.5 bg-primary rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-secondary py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
            Ready to Place Your Order?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Call us at <a href="tel:8606210055" className="text-primary hover:underline font-medium">(860) 621-0055</a> or 
            fill out our inquiry form. We recommend ordering at least 24 hours in advance 
            for catering orders.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/contact">Request a Quote</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              <a href="tel:8606210055">Call to Order</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
