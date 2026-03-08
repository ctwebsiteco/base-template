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

// Homepage query
export const HOMEPAGE_QUERY = defineQuery(`
  *[_type == "homepage"][0] {
    "heroImageUrl": heroImage.asset->url,
    heroImageAlt,
    welcomeTitle,
    welcomeSubtitle,
    establishedYear,
    welcomeDescription,
    menuCardTitle,
    menuCardSubtitle,
    cateringCardTitle,
    cateringCardSubtitle,
    "coffeeSectionImageUrl": coffeeSectionImage.asset->url,
    coffeeSectionTitle,
    coffeeSectionSubtitle,
    seo
  }
`);

// Menu categories query
export const MENU_CATEGORIES_QUERY = defineQuery(`
  *[_type == "menuCategory"] | order(order asc) {
    _id,
    title,
    description,
    items[] {
      _key,
      name,
      description,
      price
    }
  }
`);

// Catering packages query
export const CATERING_PACKAGES_QUERY = defineQuery(`
  *[_type == "cateringPackage"] | order(order asc) {
    _id,
    title,
    description,
    servings,
    price,
    includes
  }
`);

// Locations query
export const LOCATIONS_QUERY = defineQuery(`
  *[_type == "location"] | order(order asc) {
    _id,
    name,
    "slug": slug.current,
    address,
    city,
    phone,
    weekdayHours,
    saturdayHours,
    sundayHours,
    mapUrl,
    mapEmbedUrl,
    isFlagship,
    seo
  }
`);
