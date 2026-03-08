import { defineType, defineField } from "sanity";
import { PinIcon } from "@sanity/icons";

export default defineType({
  name: "location",
  title: "Location",
  type: "document",
  icon: PinIcon,
  fields: [
    defineField({
      name: "name",
      title: "Location Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "address",
      title: "Street Address",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "city",
      title: "City, State, ZIP",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "phone",
      title: "Phone Number",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "weekdayHours",
      title: "Weekday Hours (e.g., 'Mon-Fri: 6:00 AM - 2:00 PM')",
      type: "string",
    }),
    defineField({
      name: "saturdayHours",
      title: "Saturday Hours",
      type: "string",
    }),
    defineField({
      name: "sundayHours",
      title: "Sunday Hours",
      type: "string",
    }),
    defineField({
      name: "mapUrl",
      title: "Google Maps URL",
      type: "url",
    }),
    defineField({
      name: "mapEmbedUrl",
      title: "Google Maps Embed URL",
      type: "url",
      description: "URL for embedded map iframe",
    }),
    defineField({
      name: "isFlagship",
      title: "Is Flagship Location?",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      validation: (rule) => rule.required().integer().positive(),
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "address",
      flagship: "isFlagship",
    },
    prepare({ title, subtitle, flagship }) {
      return {
        title: flagship ? `${title} (Flagship)` : title,
        subtitle,
      };
    },
  },
});
