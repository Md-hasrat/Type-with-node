import { z } from "zod";

export const createCategorySchema = z.object({
    title: z
        .string({
            required_error: "Title is required!!!",
            invalid_type_error: "Title must be a string",
        })
        .min(2, "Title must be at least 3 characters long")
        .max(100, "Title must be at most 100 characters long"),
    status: z
        .string({
            required_error: "Status is required!!!",
            invalid_type_error: "Status must be a string",
        })
        .default("draft")
})  


export const updateCategorySchema = z.object({
    id: z
        .string({
            required_error: "Id is required!!!",
            invalid_type_error: "Id must be a string",
    })
    .max(24, "Invalid credentials"),
    title: z
        .string({
            required_error: "Title is required!!!",
            invalid_type_error: "Title must be a string",
        })
        .min(2, "Title must be at least 3 characters long")
        .max(100, "Title must be at most 100 characters long")
        .optional(),
    status: z
        .string({
            required_error: "Status is required!!!",
            invalid_type_error: "Status must be a string",
        })
        .default("draft")
        .optional()
})

export const categoryIdSchema = z.object({
    id: z
        .string({
            required_error: "Id is required!!!",
            invalid_type_error: "Id must be a string",
    })
    .min(24, "Invalid credentials")
})