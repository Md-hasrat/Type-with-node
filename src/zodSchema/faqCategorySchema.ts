import { z } from "zod";

export const createFaqCategorySchema = z.object({
  title: z.string().min(1, "Title is required"),
  status: z.enum(["draft", "published", "archived"]).optional().default("draft"),
});
