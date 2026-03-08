import { defineType, defineField, defineArrayMember } from "sanity";
import { PackageIcon } from "@sanity/icons";

export default defineType({
  name: "cateringPackage",
  title: "Catering Package",
  type: "document",
  icon: PackageIcon,
  fields: [
    defineField({
      name: "title",
      title: "Package Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "servings",
      title: "Servings (e.g., 'Serves 10-12')",
      type: "string",
    }),
    defineField({
      name: "price",
      title: "Price (e.g., 'Starting at $39.99')",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "includes",
      title: "What's Included",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      validation: (rule) => rule.required().integer().positive(),
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
      title: "title",
      subtitle: "price",
    },
  },
});
