"use client"

import { useActionState, useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CheckCircle } from "lucide-react"
import { sendGAEvent } from "@next/third-parties/google"
import { submitContactForm, type ContactFormState } from "@/app/actions/contact"
import { buildContactSchema, type FormField } from "@/lib/contact-schema"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface ContactFormProps {
  fields: FormField[]
  submitButtonText?: string
  successMessage?: string
}

export function ContactForm({ fields, submitButtonText = "Send Message", successMessage }: ContactFormProps) {
  const [state, formAction, isPending] = useActionState<ContactFormState, FormData>(
    submitContactForm,
    { success: false }
  )

  const schema = buildContactSchema(fields)
  const {
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onBlur",
  })

  const hasFired = useRef(false)

  useEffect(() => {
    if (state.success && !hasFired.current) {
      hasFired.current = true
      sendGAEvent("event", "generate_lead", { value: 1, currency: "USD" })
    }
  }, [state.success])

  if (state.success) {
    return (
      <div className="rounded-lg border bg-card p-10 text-center" data-testid="contact-success">
        <CheckCircle className="mx-auto mb-4 h-12 w-12 text-primary" />
        <h2 className="text-2xl font-bold">Thank You!</h2>
        <p className="mt-3 text-muted-foreground">
          {successMessage || "We received your message and will get back to you within 24 hours."}
        </p>
      </div>
    )
  }

  return (
    <form action={formAction} className="space-y-6" data-testid="contact-form">
      {state.error && (
        <div
          className="rounded-md border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive"
          data-testid="contact-error"
        >
          {state.error}
        </div>
      )}

      {fields.map((field) => (
        <div key={field.fieldType}>
          <Label htmlFor={field.fieldType}>{field.label}</Label>
          {field.fieldType === "message" ? (
            <Textarea
              id={field.fieldType}
              rows={5}
              placeholder={field.placeholder}
              data-testid={`contact-${field.fieldType}`}
              {...register(field.fieldType)}
            />
          ) : (
            <Input
              id={field.fieldType}
              type={
                field.fieldType === "email" ? "email" : field.fieldType === "phone" ? "tel" : "text"
              }
              placeholder={field.placeholder}
              data-testid={`contact-${field.fieldType}`}
              {...register(field.fieldType)}
            />
          )}
          {errors[field.fieldType] && (
            <p className="mt-1 text-xs text-destructive" data-testid={`error-${field.fieldType}`}>
              {errors[field.fieldType].message as string}
            </p>
          )}
        </div>
      ))}

      <Button type="submit" disabled={isPending} className="w-full" data-testid="contact-submit">
        {isPending ? "Sending..." : submitButtonText}
      </Button>
    </form>
  )
}