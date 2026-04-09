import { getCompanyInfo } from "@/lib/data/company";

export async function GET() {
  const company = await getCompanyInfo();

  const companyName = company.name || "Business Name";
  const phone = company.phone || "(555) 555-5555";
  const emailAddr = company.email || "info@example.com";
  const addressObj = company.address;
  const location = addressObj
    ? [addressObj.city, addressObj.state].filter(Boolean).join(", ")
    : "City, ST";
  const tagline =
    company.tagline ||
    "Your trusted local service provider delivering quality workmanship and exceptional customer service.";
  const description =
    company.description ||
    "We are a locally owned and operated business committed to providing the highest quality services to our community. Our team of experienced professionals brings years of expertise to every project, ensuring outstanding results that exceed expectations.";

  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

  const content = `# ${companyName}
> ${tagline}

## About Us
${description}

We are proud to serve the ${location} area and surrounding communities. Our commitment to quality workmanship, transparent pricing, and exceptional customer service has made us a trusted name in the local market. Whether you need residential or commercial services, our team is ready to help.

## Our Commitment
At ${companyName}, we believe in doing things right the first time. Every project receives our full attention and expertise. We are fully licensed and insured, giving our customers peace of mind knowing they are working with qualified professionals.

Our team stays current with the latest industry standards and best practices to ensure we deliver modern, efficient solutions. We take pride in our attention to detail and our ability to complete projects on time and within budget.

## Why Choose Us
- Experienced professionals with years of industry expertise
- Fully licensed and insured for your protection
- Transparent pricing with no hidden fees
- Commitment to quality workmanship on every project
- Responsive customer service and timely project completion
- Locally owned and operated — invested in our community

## Contact Information
- **Phone**: ${phone}
- **Email**: ${emailAddr}
- **Location**: ${location}

## Links
- [Home](${BASE_URL})
- [Contact Us](${BASE_URL}/contact)
`;

  return new Response(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
