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

export const EMAIL_TEMPLATES_QUERY = defineQuery(`
  *[_type == "emailTemplates"][0] {
    fromEmail,
    toEmails,
    businessNotification { subject, body },
    submitterConfirmation { subject, body }
  }
`);

// Add site-specific queries below
