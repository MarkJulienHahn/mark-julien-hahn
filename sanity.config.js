import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import schemaTypes from "./sanity/schemas/index";
import { myStructure } from "./sanity/deskStructure";

// Define the actions that should be available for singleton documents
const singletonActions = new Set(["publish", "discardChanges", "restore"]);

// Define the singleton document types
const singletonTypes = new Set(["settings"]);

export default defineConfig({
  name: "default",
  title: "Mark Julien Hahn",
  projectId: "6ake5ew6",
  dataset: "production",
  apiVersion: "2024-04-16",
  basePath: "/admin",
  plugins: [
    structureTool({
      structure: myStructure,
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
});
