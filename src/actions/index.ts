import { defineAction } from "astro:actions";
import { z } from "astro:schema";

export const server = {
  setName: defineAction({
    accept: "form",
    input: z.object({
      name: z.string().max(24),
    }),
    handler: async (input, context) => {
      context.session?.set("name", {name: input.name});
      return { name: input.name };
    },
  }),

  uploadImage: defineAction({
    accept: "form",
    handler: async () => {
      return {};
    },
  }),

  deleteImage: defineAction({
    accept: "form",
    input: z.object({
      id: z.string(),
    }),
    handler: async () => {
      return "";
    },
  }),
};
