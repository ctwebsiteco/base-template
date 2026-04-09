import companyInfo from "./companyInfo";
import emailTemplates from "./emailTemplates";
import service from "./service";
import seo from "./objects/seo";
import imageWithAlt from "./objects/imageWithAlt";
import sectionHeader from "./objects/sectionHeader";

export const schemaTypes = [
  // Document types
  companyInfo,
  emailTemplates,
  service,
  // Object types
  seo,
  imageWithAlt,
  sectionHeader,
  // Add site-specific schemas below
];
