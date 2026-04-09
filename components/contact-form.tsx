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

export function ContactForm({
  fields,
  submitButtonText = "Send Message",
  successMessage,
}: ContactFormProps) {
  const [state, formAction, isPending] = useActionState<ContactFormState, FormData>(
    submitContactForm,
    { success: false },
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

      {fields.map((field) => {
        const fieldKey =
          field.fieldMode === "custom" ? field.customType : field.standardType
        if (!fieldKey) return null

        const inputType =
          field.standardType === "message" || field.standardType === "textarea"
            ? "textarea"
            : field.standardType === "checkbox"
              ? "checkbox"
              : field.standardType === "select"
                ? "select"
                : "input"

        return (
          <div key={fieldKey}>
            <Label htmlFor={fieldKey}>{field.label}</Label>
            {inputType === "textarea" ? (
              <Textarea
                id={fieldKey}
                rows={5}
                placeholder={field.placeholder}
                data-testid={`contact-${fieldKey}`}
                {...register(fieldKey)}
              />
            ) : inputType === "checkbox" ? (
              <input
                type="checkbox"
                id={fieldKey}
                className="mt-1 h-4 w-4"
                {...register(fieldKey)}
              />
            ) : inputType === "select" ? (
              <select
                id={fieldKey}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                {...register(fieldKey)}
              >
                <option value="">Select...</option>
                {(field.options?.list || []).map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : (
              <Input
                id={fieldKey}
                type={
                  field.standardType === "email"
                    ? "email"
                    : field.standardType === "phone"
                      ? "tel"
                      : "text"
                }
                placeholder={field.placeholder}
                data-testid={`contact-${fieldKey}`}
                {...register(fieldKey)}
              />
            )}
            {errors[fieldKey] && (
              <p
                className="mt-1 text-xs text-destructive"
                data-testid={`error-${fieldKey}`}
              >
                {String(errors[fieldKey]?.message)}
              </p>
            )}
          </div>
        )
      })}

      <Button type="submit" disabled={isPending} className="w-full" data-testid="contact-submit">
        {isPending ? "Sending..." : submitButtonText}
      </Button>
    </form>
  )
}
