import { z } from "zod";


export const createFaqSchema = z.object({
  question: z
    .string({
      required_error: "Question is required!!!",
      invalid_type_error: "Question must be a string",
    })
    .min(3, "Question must be at least 3 characters long")
    .max(100, "Question must be at most 100 characters long"),

  answer: z
    .string({
      required_error: "Answer is required!!!",
      invalid_type_error: "Answer must be a string",
    })
    .min(3, "Answer must be at least 3 characters long")
    .max(100, "Answer must be at most 100 characters long"),

  faqCategoryId: z
    .string({
      required_error: "FaqCategoryId is required!!!",
      invalid_type_error: "FaqCategoryId must be a string",
    })
    .length(24, "Invalid FaqCategoryId length"),

  status: z
    .string()
    .optional()
    .default("draft"),
});

export const faqQuerySchema = z.object({
  search: z.string().trim().optional(),

  filter: z
    .string()
    .trim()
    .optional()
    .refine(
      (val) =>
        !val ||
        /^[a-f\d]{24}$/i.test(val) || // valid ObjectId
        ["draft", "published", "archived"].includes(val),
      {
        message:
          "Filter must be a valid ObjectId or one of: draft, published, archived",
      }
    ),

  sort: z
    .enum(["asc", "desc"])
    .optional()
    .or(z.literal("").transform(() => undefined)),

  page: z
    .preprocess((val) => parseInt(String(val), 10), z.number().int().min(1, {
      message: "Page must be at least 1",
    }))
    .default(1),

  limit: z
    .preprocess((val) => parseInt(String(val), 10), z.number().int().min(10, {
      message: "Limit must be at least 10",
    }))
    .default(10),
});

