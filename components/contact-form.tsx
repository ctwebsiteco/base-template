"use client";

import { useActionState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendGAEvent } from "@next/third-parties/google";
import { CheckCircle } from "lucide-react";
import { contactSchema, type ContactFormData } from "@/lib/contact-schema";
import {
  submitContactForm,
  type ContactFormState,
} from "@/app/actions/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function ContactForm() {
  const [state, formAction, isPending] = useActionState<
    ContactFormState,
    FormData
  >(submitContactForm, { success: false });

  const {
    register,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
  });

  const hasFired = useRef(false);

  useEffect(() => {
    if (state.success && !hasFired.current) {
      hasFired.current = true;
      sendGAEvent("event", "generate_lead", {
        value: 1,
        currency: "USD",
      });
    }
  }, [state.success]);

  if (state.success) {
    return (
      <div
        className="rounded-lg border bg-card p-10 text-center"
        data-testid="contact-success"
      >
        <CheckCircle className="mx-auto mb-4 h-12 w-12 text-primary" />
        <h2 className="text-2xl font-bold">Thank You!</h2>
        <p className="mt-3 text-muted-foreground">
          We received your message and will get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="space-y-6"
      data-testid="contact-form"
    >
      {!state.success && state.error && (
        <div
          className="rounded-md bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive"
          data-testid="contact-error"
        >
          {state.error}
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            {...register("name")}
            placeholder="Your name"
            data-testid="contact-name"
          />
          {errors.name && (
            <p className="mt-1 text-xs text-destructive" data-testid="error-name">
              {errors.name.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            placeholder="you@example.com"
            data-testid="contact-email"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-destructive" data-testid="error-email">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="phone">Phone (optional)</Label>
        <Input
          id="phone"
          type="tel"
          {...register("phone")}
          placeholder="(555) 555-5555"
          data-testid="contact-phone"
        />
      </div>

      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          rows={5}
          {...register("message")}
          placeholder="Tell us about your project..."
          data-testid="contact-message"
        />
        {errors.message && (
          <p className="mt-1 text-xs text-destructive" data-testid="error-message">
            {errors.message.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="w-full"
        data-testid="contact-submit"
      >
        {isPending ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
