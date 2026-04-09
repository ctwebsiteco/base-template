import { getContactForm } from "@/lib/data/forms"
import { ContactForm } from "@/components/contact-form"
import { createPageMetadata } from "@/lib/metadata"

export const metadata = createPageMetadata({
  title: "Contact Us",
  description: "Get in touch with us.",
  path: "/contact",
})

export default async function ContactPage() {
  const formConfig = await getContactForm()

  return (
    <section className="container py-16">
      <h1 className="mb-2 text-4xl font-bold text-balance">Contact Us</h1>
      <p className="mb-8 text-muted-foreground">
        Have a question or ready to get started? Fill out the form below.
      </p>
      <div className="mx-auto max-w-xl">
        <ContactForm
          fields={formConfig.fields || []}
          submitButtonText={formConfig.submitButtonText}
          successMessage={formConfig.successMessage}
        />
      </div>
    </section>
  )
}