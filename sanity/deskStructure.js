import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";

export const myStructure = (S, context) =>
  S.list()
    .title("Content")
    .items([
      orderableDocumentListDeskItem({
        type: "work",
        title: "Work",
        S,
        context,
      }),
      S.listItem()
        .title("About")
        .id("about")
        .child(S.document().schemaType("about").documentId("about")),
      S.divider(),

      S.listItem()
        .title("Imprint")
        .id("imprint")
        .child(S.document().schemaType("imprint").documentId("imprint")),

      S.listItem()
        .title("Privacy")
        .id("privacy")
        .child(S.document().schemaType("privacy").documentId("privacy")),

      S.divider(),

      orderableDocumentListDeskItem({
        type: "disciplines",
        title: "Disciplines",
        S,
        context,
      }),
      orderableDocumentListDeskItem({
        type: "cooperations",
        title: "Cooperations",
        S,
        context,
      }),
      orderableDocumentListDeskItem({
        type: "clients",
        title: "Clients",
        S,
        context,
      }),

      S.divider(),
    ]);
