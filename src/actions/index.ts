import { defineAction } from "astro:actions";
import { z } from "astro:schema";

export const server = {
  nameForm: defineAction({
    accept: "form",
    input: z.object({
      name: z.string().max(10),
    }),
    handler: async ({ name }) => {
      return { name };
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
