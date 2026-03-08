import { defineType, defineField } from "sanity";
import { HomeIcon } from "@sanity/icons";

export default defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  icon: HomeIcon,
  fields: [
    defineField({
      name: "heroImage",
      title: "Hero Background Image",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroImageAlt",
      title: "Hero Image Alt Text",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "welcomeTitle",
      title: "Welcome Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "welcomeSubtitle",
      title: "Welcome Subtitle",
      type: "string",
    }),
    defineField({
      name: "establishedYear",
      title: "Established Year",
      type: "string",
    }),
    defineField({
      name: "welcomeDescription",
      title: "Welcome Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "menuCardTitle",
      title: "Menu Card Title",
      type: "string",
    }),
    defineField({
      name: "menuCardSubtitle",
      title: "Menu Card Subtitle",
      type: "string",
    }),
    defineField({
      name: "cateringCardTitle",
      title: "Catering Card Title",
      type: "string",
    }),
    defineField({
      name: "cateringCardSubtitle",
      title: "Catering Card Subtitle",
      type: "string",
    }),
    defineField({
      name: "coffeeSectionImage",
      title: "Coffee Section Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "coffeeSectionTitle",
      title: "Coffee Section Title",
      type: "string",
    }),
    defineField({
      name: "coffeeSectionSubtitle",
      title: "Coffee Section Subtitle",
      type: "string",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Homepage",
      };
    },
  },
});
