import companyInfo from "./companyInfo";
import emailTemplates from "./emailTemplates";
import seo from "./objects/seo";
import imageWithAlt from "./objects/imageWithAlt";
import sectionHeader from "./objects/sectionHeader";

export const schemaTypes = [
  // Document types
  companyInfo,
  emailTemplates,
  // Object types
  seo,
  imageWithAlt,
  sectionHeader,
  // Add site-specific schemas below
];
