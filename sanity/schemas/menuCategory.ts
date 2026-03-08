import { defineType, defineField, defineArrayMember } from "sanity";
import { MenuIcon } from "@sanity/icons";

export default defineType({
  name: "menuCategory",
  title: "Menu Category",
  type: "document",
  icon: MenuIcon,
  fields: [
    defineField({
      name: "title",
      title: "Category Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Category Description",
      type: "string",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      validation: (rule) => rule.required().integer().positive(),
    }),
    defineField({
      name: "items",
      title: "Menu Items",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "menuItem",
          title: "Menu Item",
          fields: [
            defineField({
              name: "name",
              title: "Item Name",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "string",
            }),
            defineField({
              name: "price",
              title: "Price",
              type: "string",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "name",
              subtitle: "price",
            },
          },
        }),
      ],
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
      items: "items",
    },
    prepare({ title, items }) {
      return {
        title,
        subtitle: `${items?.length || 0} items`,
      };
    },
  },
});
