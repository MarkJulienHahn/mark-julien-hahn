import { defineType } from "sanity";

export default defineType({
  name: "about",
  title: "About",
  type: "document",

  fields: [
    {
      name: "headline",
      title: "Headline",
      type: "array",
      validation: (Rule) => Rule.required(),
      of: [
        {
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
          lists: [],
          marks: {
            decorators: [{ title: "Emphasis", value: "em" }],
          },
        },
      ],
    },
  ],

  preview: {
    prepare() {
      return {
        title: "About",
      };
    },
  },
});
