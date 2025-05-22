import { asyncHandler } from "../../utils/errrorHandler";
import { Request, Response } from "express";
import { createStaticSchema, staticSchemaId, staticUpdateSchema } from "../zodSchema/staticSchema";
import { responseHandler } from "../../utils/responseHandler";
import StaticContent from "../models/staticModel";


export const createStaticContent = asyncHandler(async (req: Request, res: Response) => {
    const validate = createStaticSchema.safeParse(req.body)

    if (!validate.success) {
        return responseHandler(res, false, validate.error.errors[0].message, 400)
    }

    const existingStatic = await StaticContent.findOne({ name: validate.data.name })

    if (existingStatic) {
        return responseHandler(res, false, "Static content already exists with this name", 400)
    }

    const staticContent = await StaticContent.create(validate.data)
    return responseHandler(res, true, "Static content created successfully", 200, staticContent)
})


export const getAllStaticContent = asyncHandler(async (req: Request, res: Response) => {

    // 1. Pagination Parameters
    const page = parseInt(req.query.page as string) || 1;   // Current page, default to 1
    const limit = parseInt(req.query.limit as string) || 10; // Items per page, default to 10
    const skip = (page - 1) * limit;

    // 2. Search Parameter
    const searchQuery = req.query.search as string;
    const query: any = {}; // Initialize an empty query object for Mongoose

    if (searchQuery) {
        // If a search query is provided, apply it to 'name' or 'description'
        // Using $or to search across multiple fields (name OR description)
        // Using $regex with 'i' for case-insensitive search
        query.$or = [
            { name: { $regex: searchQuery, $options: "i" } },
            { description: { $regex: searchQuery, $options: "i" } },
        ];
    }

    // Execute the query to find documents with pagination and search
    const staticContent = await StaticContent.find(query)
        .skip(skip)
        .limit(limit)
        .exec(); // .exec() returns a promise

    // Get the total number of documents matching the search query (for pagination metadata)
    const totalDocuments = await StaticContent.countDocuments(query);
    const totalPages = Math.ceil(totalDocuments / limit);

    // Return the paginated and searched data along with pagination metadata
    return responseHandler(
        res,
        true,
        "Static content fetched successfully",
        200,
        {
            data: staticContent,
            pagination: {
                totalDocuments,
                totalPages,
                currentPage: page,
                limit,
            },
        }
    );
})


export const updateStaticContent = asyncHandler(async (req: Request, res: Response) => {
    const validate = staticUpdateSchema.safeParse(req.body)

    if (!validate.success) {
        return responseHandler(res, false, validate.error.errors[0].message, 400)
    }

    const content = await StaticContent.findByIdAndUpdate(
        validate.data.id,
        { $set: validate.data },
        { new: true })

    if (!content) {
        return responseHandler(res, false, "Static content not found", 404)
    }

    return responseHandler(res, true, "Static content updated successfully", 200, content)

})


export const deleteStaticContent = asyncHandler(async (req: Request, res: Response) => {
    const validate = staticSchemaId.safeParse(req.body)

    if (!validate.success) {
        return responseHandler(res, false, validate.error.errors[0].message, 400)
    }

    const updatedContent = await StaticContent.findByIdAndDelete(validate.data.id)

    if (!updatedContent) {
        return responseHandler(res, false, "Static content not found", 404)
    }

    return responseHandler(res, true, "Static content deleted successfully", 200, updatedContent)
})