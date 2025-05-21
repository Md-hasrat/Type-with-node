import { asyncHandler } from "../../utils/errrorHandler";
import { responseHandler } from "../../utils/responseHandler";
import faqCategoryModel from "../models/faqCategoryModel";
import { createFaqCategorySchema } from "../zodSchema/faqCategorySchema";
import { Request, Response } from "express";

export const createFaqCategory = asyncHandler(async (req: Request, res: Response) => {

  // Validate request body
  const validation = createFaqCategorySchema.safeParse(req.body);

  if (!validation.success) {
    // Return first error message and 400 status
    return responseHandler(res, false, validation.error.errors[0].message, 400);
  }

  // Create FAQ category document
  const newFaqCategory = await faqCategoryModel.create(validation.data);

  // Send success response
  return responseHandler(res, true, "FAQ Category created successfully", 200, newFaqCategory);
});