import { defineQuery } from "next-sanity";

export const COMPANY_INFO_QUERY = defineQuery(`
  *[_type == "companyInfo"][0] {
    name,
    phone,
    email,
    address,
    tagline,
    description,
    licensingInfo,
    businessHours,
    ownerName,
    ownerBio,
    yearsExperience,
    priceRange,
    aggregateRating,
    reviewCount,
    "logoUrl": logo.asset->url,
    seo
  }
`);

export const CONTACT_FORM_QUERY = defineQuery(`
  *[_type == "contactForm"][0] {
    formName,
    submitButtonText,
    successMessage,
    fromEmail,
    toEmails,
    adminEmailTemplate { subject, body },
    autoReplyTemplate { enabled, subject, body },
    fields[] {
      _key,
      fieldMode,
      standardType,
      customType,
      label,
      placeholder,
      required,
      options { list },
      validation { minLength, maxLength, pattern },
      showIf {
        otherField,
        hasValue
      }
    }
  }
`);
