import { defineType } from "sanity";
import { orderRankField } from "@sanity/orderable-document-list";

export default defineType({
  name: "work",
  title: "Work",
  type: "document",

  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().min(3).max(80),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
      },
    },

    {
      name: "description",
      title: "Description",
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
    {
      name: "clientInformation",
      title: "Client Information",
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

    {
      name: "month",
      title: "Month",
      type: "string",
      options: {
        list: (() => {
          const months = [
            { title: "Jan", value: "Jan" },
            { title: "Feb", value: "Feb" },
            { title: "Mar", value: "Mar" },
            { title: "Apr", value: "Apr" },
            { title: "May", value: "May" },
            { title: "Jun", value: "Jun" },
            { title: "Jul", value: "Jul" },
            { title: "Aug", value: "Aug" },
            { title: "Sep", value: "Sep" },
            { title: "Oct", value: "Oct" },
            { title: "Nov", value: "Nov" },
            { title: "Dec", value: "Dec" },
          ];
          return months;
        })(),
      },
    },
    {
      name: "year",
      title: "Year",
      type: "number",
      options: {
        list: (() => {
          const currentYear = new Date().getFullYear() + 1;
          const years = [];
          for (let year = currentYear; year >= 2000; year--) {
            years.push({ title: `${year}`, value: year });
          }
          return years;
        })(),
      },
    },

    { name: "ongoing", title: "Ongoing", type: "boolean" },

    {
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          name: "media",
          title: "Media",
          type: "object",
          fields: [
            {
              name: "type",
              title: "Type",
              type: "string",
              options: {
                list: [
                  { title: "Image", value: "image" },
                  { title: "Video", value: "video" },
                ],
                layout: "radio",
                direction: "horizontal",
              },
              initialValue: "image",
            },
            {
              name: "image",
              title: "Image",
              type: "image",
              hidden: ({ parent }) => parent?.type !== "image",
              fields: [
                {
                  title: "Alternative Text",
                  name: "alt",
                  type: "string",
                },

                {
                  title: "Caption",
                  name: "caption",
                  type: "string",
                },
              ],
            },
            {
              name: "video",
              title: "Video",
              type: "file",
              hidden: ({ parent }) => parent?.type !== "video",
              options: {
                accept: "video/*",
              },
              fields: [
                {
                  title: "Caption",
                  name: "caption",
                  type: "string",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      title: "Disciplines",
      name: "disciplines",
      type: "array",
      of: [
        {
          title: "Discipline",
          name: "discipline",
          type: "reference",
          to: [{ type: "disciplines" }],
        },
      ],
    },

    orderRankField({ type: "work" }),
  ],

  preview: {
    select: {
      title: "title",
      media: "images.0.image", // adjusted path if nested differently
    },
    prepare(selection) {
      const { title, media } = selection;
      return {
        title,
        media: media || "some-default-image",
      };
    },
  },
});
