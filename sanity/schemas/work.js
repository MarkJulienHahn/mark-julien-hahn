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
      name: "month",
      title: "Month",
      type: "number", // Keeping the type as number for month values
      options: {
        list: (() => {
          const months = [
            { title: "01", value: 1 },
            { title: "02", value: 2 },
            { title: "03", value: 3 },
            { title: "04", value: 4 },
            { title: "05", value: 5 },
            { title: "06", value: 6 },
            { title: "07", value: 7 },
            { title: "08", value: 8 },
            { title: "09", value: 9 },
            { title: "10", value: 10 },
            { title: "11", value: 11 },
            { title: "12", value: 12 },
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
    // {
    //   name: "description",
    //   title: "Description",
    //   type: "array",
    //   validation: (Rule) => Rule.required(),
    //   of: [
    //     {
    //       type: "block",
    //       styles: [{ title: "Normal", value: "normal" }],
    //       lists: [],
    //       marks: {
    //         decorators: [{ title: "Emphasis", value: "em" }],
    //       },
    //     },
    //   ],
    // },
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
                  title: "Fit Type",
                  name: "fitType",
                  type: "string",
                  options: {
                    list: [
                      { title: "Cover", value: "cover" },
                      { title: "Contain", value: "contain" },
                    ],
                    layout: "radio",
                    direction: "horizontal",
                  },
                  initialValue: "white",
                },
                {
                  title: "Background Color",
                  name: "background",
                  type: "string",
                  options: {
                    list: [
                      { title: "Black", value: "black" },
                      { title: "White", value: "white" },
                    ],
                    layout: "radio",
                    direction: "horizontal",
                  },
                  initialValue: "white",
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
                  title: "Fit Type",
                  name: "fitType",
                  type: "string",
                  options: {
                    list: [
                      { title: "Cover", value: "cover" },
                      { title: "Contain", value: "contain" },
                    ],
                    layout: "radio",
                    direction: "horizontal",
                  },
                  initialValue: "cover",
                },
                {
                  title: "Background Color",
                  name: "background",
                  type: "string",
                  options: {
                    list: [
                      { title: "Black", value: "black" },
                      { title: "White", value: "white" },
                    ],
                    layout: "radio",
                    direction: "horizontal",
                  },
                  initialValue: "cover",
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
    {
      title: "Cooperations",
      name: "cooperations",
      type: "array",
      of: [
        {
          title: "Cooperation",
          name: "cooperation",
          type: "reference",
          to: [{ type: "cooperations" }],
        },
      ],
    },
    {
      title: "Clients",
      name: "clients",
      type: "array",
      of: [
        {
          title: "Client",
          name: "client",
          type: "reference",
          to: [{ type: "clients" }],
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
