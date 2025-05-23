import mongoose from "mongoose";
import { z } from "zod";

export const createArticleSchema = z.object({
    title: z.string({
        required_error: "Title is required",
        invalid_type_error: "Title must be a string",
    }).min(1, "Title is required"),

    content: z.string({
        required_error: "Content is required",
        invalid_type_error: "Content must be a string",
    })
        .min(1, "Content is required")
        .max(10000, "Content must be at most 10000 characters long"),

    publishedBy: z.string({
        required_error: "Published by is required",
        invalid_type_error: "Published by must be a string",
    }).min(1, "Published by is required"),

    categoryId: z.string({
        required_error: "Category Id is required",
        invalid_type_error: "Category Id must be a string",
    }).min(1, "Category Id is required"),

    writenBy: z.string({
        required_error: "Writen by is required",
        invalid_type_error: "Writen by must be a string",
    })
        .min(1, "Writen by is required")
        .refine(val => mongoose.Types.ObjectId.isValid(val), {
            message: "Writen by must be a valid ObjectId"
        }),

    status: z.enum(["draft", "published", "archived"]).optional().default("draft"),
});
