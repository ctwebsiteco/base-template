import type { CompanyInfo } from "@/sanity/types";

export const companyInfo: CompanyInfo = {
  _type: "companyInfo",
  _id: "default-company-info",
  name: "Your Business Name",
  tagline: "Your trusted local service provider.",
  description:
    "We provide high-quality services to residential and commercial customers. Contact us today for a free estimate.",
  phone: "(555) 555-5555",
  email: "info@yourdomain.com",
  address: { city: "City", state: "State", country: "United States" },
  ownerName: "",
  ownerBio: "",
  serviceArea: { description: "", radiusMiles: 0 },
  licensingInfo: { licenseNumber: "", status: "" },
  businessHours: "",
  yearsExperience: "",
  priceRange: "",
  aggregateRating: 0,
  reviewCount: 0,
  seo: { metaTitle: "", metaDescription: "" },
};
