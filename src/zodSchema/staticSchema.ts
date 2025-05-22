import mongoose from 'mongoose'
import {z} from 'zod'


export const createStaticSchema = z.object({
    name: z
        .string({
            required_error: "Name is required!!!",
            invalid_type_error: "Name must be a string",
        })
        .min(2, "Name must be at least 2 characters long")
        .max(100, "Name must be at most 100 characters long"),

    description: z
        .string({
            required_error: "Description is required!!!",
            invalid_type_error: "Description must be a string",
        })
        .min(2, "Description must be at least 2 characters long")
        .max(10000, "Description must be at most 10000 characters long"),
})


export const staticSchemaId = z.object({
    id: z
        .string({
            required_error: "Id is required!!!",
            invalid_type_error: "Id must be a string",
        })
        .refine((val) => mongoose.Types.ObjectId.isValid(val), {
            message: "Id must be a valid ObjectId",
        })
        .transform((val) => new mongoose.Types.ObjectId(val)),
})
