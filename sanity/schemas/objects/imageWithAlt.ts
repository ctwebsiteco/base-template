import { defineType, defineField } from "sanity";

export default defineType({
  name: "imageWithAlt",
  title: "Image with Alt Text",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "alt",
      title: "Alt Text",
      type: "string",
      validation: (rule) => rule.required().error("Alt text is required for accessibility"),
    }),
  ],
});
