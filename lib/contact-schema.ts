import { z } from "zod"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const standardFieldSchemas: Record<string, any> = {
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
  company: z.string().optional(),
  service: z.string().optional(),
  budget: z.string().optional(),
  textarea: z.string().optional(),
  select: z.string().optional(),
  checkbox: z.boolean(),
}

export interface FormField {
  fieldMode?: "standard" | "custom"
  standardType?: string
  customType?: string
  label?: string
  placeholder?: string
  required?: boolean
  options?: { list?: string[] }
  validation?: { minLength?: number; maxLength?: number; pattern?: string }
  showIf?: { otherField?: string; hasValue?: boolean }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ZodType = Record<string, any>

export function buildContactSchema(fields: FormField[]) {
  const shape: ZodType = {}

  for (const field of fields) {
    if (field.fieldMode === "custom" && field.customType) {
      // Custom field — build schema from validation rules
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let schema: any = z.string()
      const label = field.label || field.customType

      if (field.validation?.minLength) {
        schema = schema.minLength(field.validation.minLength)
      }
      if (field.validation?.maxLength) {
        schema = schema.maxLength(field.validation.maxLength)
      }
      if (field.validation?.pattern) {
        schema = schema.regex(new RegExp(field.validation.pattern))
      }

      shape[field.customType] = field.required
        ? schema.min(1, `${label} is required`)
        : schema.optional()
    } else if (field.standardType && standardFieldSchemas[field.standardType]) {
      const base = standardFieldSchemas[field.standardType]!
      if (field.standardType === "checkbox") {
        shape[field.standardType] = field.required
          ? z.boolean().refine((val: boolean) => val === true, {
              message: `${field.label || field.standardType} is required`,
            })
          : base
      } else {
        shape[field.standardType] = field.required
          ? base.min(1, `${field.label || field.standardType} is required`)
          : base.optional()
      }
    }
  }

  return z.object(shape)
}

export type ContactFormData = z.infer<ReturnType<typeof buildContactSchema>>