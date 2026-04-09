import type { Metadata } from "next"
import { client } from "@/sanity/lib/client"
import { CONTACT_FORM_QUERY } from "@/sanity/lib/queries"
import { createPageMetadata } from "@/lib/metadata"
import { ContactForm } from "@/components/contact-form"

export const metadata: Metadata = createPageMetadata({
  title: "Contact Us",
  description: "Get in touch with us. Fill out the form below and we will get back to you within 24 hours.",
  path: "/contact",
})

interface FormField {
  fieldType: string
  label: string
  placeholder?: string
  required?: boolean
}

export default async function ContactPage() {
  let formConfig: {
    submitButtonText?: string
    successMessage?: string
    fields?: FormField[]
  } | null = null

  if (client) {
    try {
      formConfig = await client.fetch(CONTACT_FORM_QUERY)
    } catch {
      // Sanity fetch failed
    }
  }

  // Fallback fields when Sanity not configured
  const fields = formConfig?.fields?.length
    ? formConfig.fields
    : [
        { fieldType: "name", label: "Name", required: true, placeholder: "Your name" },
        { fieldType: "email", label: "Email", required: true, placeholder: "you@example.com" },
        { fieldType: "phone", label: "Phone", required: false, placeholder: "(555) 555-5555" },
        { fieldType: "message", label: "Message", required: true, placeholder: "Tell us about your project..." },
      ]

  const submitButtonText = formConfig?.submitButtonText || "Send Message"
  const successMessage = formConfig?.successMessage || "Thank you! We'll be in touch soon."

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-4xl font-bold tracking-tight text-balance">Contact Us</h1>
      <p className="mt-4 text-muted-foreground">
        Fill out the form below and we will get back to you within 24 hours.
      </p>
      <div className="mt-8">
        <ContactForm
          fields={fields}
          submitButtonText={submitButtonText}
          successMessage={successMessage}
        />
      </div>
    </div>
  )
}