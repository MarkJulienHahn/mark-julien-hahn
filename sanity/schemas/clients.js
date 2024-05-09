import { defineType } from "sanity";
import { orderRankField } from "@sanity/orderable-document-list";

export default defineType({
  name: "clients",
  title: "Clients",
  type: "document",

  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    orderRankField({ type: "clients" }),
  ],
});
