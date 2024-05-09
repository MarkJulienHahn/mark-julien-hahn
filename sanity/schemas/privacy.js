import { defineType } from "sanity";

export default defineType({
  name: "privacy",
  title: "Privacy",
  type: "document",

  fields: [
    {
      name: "text",
      title: "Text",
      type: "array",
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
        title: "Privacy",
      };
    },
  },
});
