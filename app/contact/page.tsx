import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | Fancy Bagels | Catering Inquiries & Feedback",
  description:
    "Contact Fancy Bagels for catering orders, feedback, or questions. Reach us by phone, email, or fill out our contact form.",
};

export default function ContactPage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold">Contact Us</h1>
          <p className="mt-4 text-lg md:text-xl text-primary-foreground/80">
            {"We'd"} love to hear from you
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="font-serif text-2xl font-bold text-foreground">
                Get In Touch
              </h2>
              <div className="flex items-center mt-4 mb-6">
                <div className="h-px w-12 bg-primary" />
                <div className="size-2 bg-primary rotate-45 mx-2" />
                <div className="h-px w-12 bg-primary" />
              </div>
              <p className="text-muted-foreground mb-8">
                Have a question about our menu, catering services, or want to 
                share feedback? {"We're"} here to help!
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="size-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="size-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Phone</h3>
                    <a
                      href="tel:8606210055"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      (860) 621-0055
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="size-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="size-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Email</h3>
                    <a
                      href="mailto:info@fancybagels.com"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      info@fancybagels.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="size-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="size-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Address</h3>
                    <p className="text-muted-foreground">
                      405 Queen St. (Route 10)<br />
                      Southington, CT 06489
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="size-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="size-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Hours</h3>
                    <p className="text-muted-foreground text-sm">
                      Mon-Fri: 6:00 AM - 2:00 PM<br />
                      Sat: 6:30 AM - 2:00 PM<br />
                      Sun: 7:00 AM - 1:30 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card border-2 border-primary p-6 md:p-8 shadow-lg">
              <h2 className="font-serif text-xl font-bold text-foreground mb-6">
                Send Us a Message
              </h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
