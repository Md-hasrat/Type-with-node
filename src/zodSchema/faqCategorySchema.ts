import { z } from "zod";

export const createFaqCategorySchema = z.object({
    title: z
        .string({
            required_error: "Title is required!!!",
            invalid_type_error: "Title must be a string",
        })
        .min(2, "Title must be at least 3 characters long")
        .max(100, "Title must be at most 100 characters long"),
    answer: z
        .string({
            required_error: "Answer is required!!!",
            invalid_type_error: "Answer must be a string",
        })
        .min(2, "Answer must be at least 3 characters long")
        .max(100, "Answer must be at most 100 characters long"),    
    faqCategoryId: z
        .string({
            required_error: "FaqCategoryId is required!!!",
            invalid_type_error: "FaqCategoryId must be a string",
        })
        .max(24, "Invalid credentials")
        ,
    status: z
        .string({
            required_error: "Status is required!!!",
            invalid_type_error: "Status must be a string",
        })
        .default("draft")
        .optional()
})
