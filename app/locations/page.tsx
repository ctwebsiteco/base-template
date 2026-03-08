import { Metadata } from "next";
import { MapPin, Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Locations | Fancy Bagels | Find Us in Connecticut",
  description:
    "Find Fancy Bagels locations in Southington, Plantsville, and Farmington, CT. Get directions, hours, and contact information for each store.",
};

const locations = [
  {
    name: "Southington",
    address: "405 Queen St. (Route 10)",
    city: "Southington, CT 06489",
    phone: "(860) 621-0055",
    hours: {
      weekday: "Mon-Fri: 6:00 AM - 2:00 PM",
      saturday: "Sat: 6:30 AM - 2:00 PM",
      sunday: "Sun: 7:00 AM - 1:30 PM",
    },
    mapUrl: "https://maps.google.com/?q=405+Queen+St+Southington+CT",
    flagship: true,
  },
  {
    name: "Plantsville",
    address: "123 Main St.",
    city: "Plantsville, CT 06479",
    phone: "(860) 555-0123",
    hours: {
      weekday: "Mon-Fri: 6:00 AM - 2:00 PM",
      saturday: "Sat: 6:30 AM - 2:00 PM",
      sunday: "Sun: 7:00 AM - 1:30 PM",
    },
    mapUrl: "https://maps.google.com/?q=Plantsville+CT",
    flagship: false,
  },
  {
    name: "Farmington",
    address: "456 Farmington Ave.",
    city: "Farmington, CT 06032",
    phone: "(860) 555-0456",
    hours: {
      weekday: "Mon-Fri: 6:00 AM - 2:00 PM",
      saturday: "Sat: 6:30 AM - 2:00 PM",
      sunday: "Sun: 7:00 AM - 1:30 PM",
    },
    mapUrl: "https://maps.google.com/?q=Farmington+CT",
    flagship: false,
  },
];

export default function LocationsPage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold">Our Locations</h1>
          <p className="mt-4 text-lg md:text-xl text-primary-foreground/80">
            Three convenient locations across Connecticut
          </p>
        </div>
      </section>

      {/* Locations */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid md:grid-cols-3 gap-6">
            {locations.map((location) => (
              <div
                key={location.name}
                className={`bg-card border-2 p-6 shadow-lg ${
                  location.flagship ? "border-accent" : "border-primary"
                }`}
              >
                {location.flagship && (
                  <span className="inline-block bg-accent text-accent-foreground text-xs font-semibold px-2 py-1 mb-3">
                    FLAGSHIP LOCATION
                  </span>
                )}
                <h2 className="font-serif text-2xl font-bold text-foreground">
                  {location.name}
                </h2>

                <div className="mt-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="size-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-foreground">{location.address}</p>
                      <p className="text-muted-foreground">{location.city}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="size-5 text-primary flex-shrink-0" />
                    <a
                      href={`tel:${location.phone.replace(/\D/g, "")}`}
                      className="text-foreground hover:text-primary transition-colors"
                    >
                      {location.phone}
                    </a>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="size-5 text-primary mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-muted-foreground">
                      <p>{location.hours.weekday}</p>
                      <p>{location.hours.saturday}</p>
                      <p>{location.hours.sunday}</p>
                    </div>
                  </div>
                </div>

                <Button
                  asChild
                  className="w-full mt-6 bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <a href={location.mapUrl} target="_blank" rel="noopener noreferrer">
                    Get Directions
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Embed */}
      <section className="bg-secondary py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground text-center mb-8">
            Find Us
          </h2>
          <div className="aspect-video bg-muted rounded-lg overflow-hidden border-2 border-primary">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2989.5!2d-72.87!3d41.59!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDM1JzI0LjAiTiA3MsKwNTInMTIuMCJX!5e0!3m2!1sen!2sus!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Fancy Bagels Southington Location"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
