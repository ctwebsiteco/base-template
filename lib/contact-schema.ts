import { z } from "zod"

const fieldTypeToZod: Record<string, z.ZodTypeAny> = {
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000),
  company: z.string().optional(),
  service: z.string().optional(),
  budget: z.string().optional(),
}

export interface FormField {
  fieldType: string
  label: string
  placeholder?: string
  required?: boolean
  showIf?: {
    otherField: string
    hasValue: boolean
  }
}

export function buildContactSchema(fields: FormField[]) {
  const shape: Record<string, z.ZodTypeAny> = {}
  for (const field of fields) {
    const schema = fieldTypeToZod[field.fieldType]
    if (schema) {
      shape[field.fieldType] = field.required ? schema : schema.optional()
    }
  }
  return z.object(shape)
}

export type ContactFormData = z.infer<ReturnType<typeof buildContactSchema>>