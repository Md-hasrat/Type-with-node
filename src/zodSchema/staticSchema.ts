import {z} from 'zod'


export const createStaticSchema = z.object({
    name: z
        .string({
            required_error: "Title is required!!!",
            invalid_type_error: "Title must be a string",
        })
        .min(2, "Title must be at least 2 characters long")
        .max(100, "Title must be at most 100 characters long"),

    description: z
        .string({
            required_error: "Description is required!!!",
            invalid_type_error: "Description must be a string",
        })
        .min(2, "Description must be at least 2 characters long")
        .max(10000, "Description must be at most 10000 characters long"),
})

