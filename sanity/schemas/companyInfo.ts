import { defineType, defineField } from "sanity";

export default defineType({
  name: "companyInfo",
  title: "Company Info",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Business Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "tagline", title: "Tagline", type: "string" }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({ name: "ownerName", title: "Owner Name", type: "string" }),
    defineField({
      name: "ownerBio",
      title: "Owner Bio",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({
      name: "address",
      title: "Address",
      type: "object",
      fields: [
        defineField({ name: "city", title: "City", type: "string" }),
        defineField({ name: "state", title: "State", type: "string" }),
        defineField({ name: "country", title: "Country", type: "string" }),
        defineField({ name: "latitude", title: "Latitude", type: "number" }),
        defineField({ name: "longitude", title: "Longitude", type: "number" }),
      ],
    }),
    defineField({
      name: "serviceArea",
      title: "Service Area",
      type: "object",
      fields: [
        defineField({
          name: "description",
          title: "Description",
          type: "string",
        }),
        defineField({
          name: "radiusMiles",
          title: "Radius (miles)",
          type: "number",
        }),
      ],
    }),
    defineField({
      name: "licensingInfo",
      title: "Licensing Info",
      type: "object",
      fields: [
        defineField({
          name: "licenseNumber",
          title: "License Number",
          type: "string",
        }),
        defineField({ name: "status", title: "Status", type: "string" }),
      ],
    }),
    defineField({
      name: "businessHours",
      title: "Business Hours",
      type: "string",
    }),
    defineField({
      name: "yearsExperience",
      title: "Years Experience",
      type: "string",
    }),
    defineField({ name: "priceRange", title: "Price Range", type: "string" }),
    defineField({
      name: "aggregateRating",
      title: "Aggregate Rating",
      type: "number",
    }),
    defineField({
      name: "reviewCount",
      title: "Review Count",
      type: "number",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
});
