import { asyncHandler } from "../../utils/errrorHandler";
import { Request, Response } from "express";
import { createFaqSchema, faqCategorySchemaById, faqQuerySchema, updateFaqSchema } from "../zodSchema/faqSchema";
import { responseHandler } from "../../utils/responseHandler";
// import Category from "../models/categoryModel";
import { getAllFaqQuery } from "../services/faqService";
import Faq from "../models/faqModel";


export const createFaq = asyncHandler(async (req: Request, res: Response) => {
  const validate = createFaqSchema.safeParse(req.body);

  if (!validate.success) {
    return responseHandler(res, false, validate.error.errors[0].message, 400)
  }

  const newCategory = await Faq.create(validate.data)
  return responseHandler(res, true, "Category created successfully", 200, newCategory)
})


export const getAllFaqCategory = asyncHandler(async (req: Request, res: Response) => {
  const validate = faqQuerySchema.safeParse(req.query);

  if (!validate.success) {
    return responseHandler(res, false, validate.error.errors[0].message, 400);
  }

  const pipeline = await getAllFaqQuery(validate.data);
  const result = await Faq.aggregate(pipeline);

  return responseHandler(res, true, "FAQ fetched successfully", 200, result);
});


export const updateFaqCategoryById = asyncHandler(async (req: Request, res: Response) => {
  const validate = updateFaqSchema.safeParse(req.body);

  if (!validate.success) {
    return responseHandler(res, false, validate.error.errors[0].message, 400)
  }

  const updatedCategory = await Faq.findByIdAndUpdate(
    validate.data.id,
    { $set: validate.data }, // Explicitly using $set
    { new: true }
  );

  if (!updatedCategory) {
    return responseHandler(res, false, "Category not found", 404);
  }

  return responseHandler(res, true, "Category updated successfully", 200, updatedCategory);

})


export const deleteFaqCategoryById = asyncHandler(async (req: Request, res: Response) => {
  const validate = faqCategorySchemaById.safeParse(req.body);

  if (!validate.success) {
    return responseHandler(res, false, validate.error.errors[0].message, 400)
  }

  const deletedCategory = await Faq.findByIdAndDelete(validate.data.id);

  if (!deletedCategory) {
    return responseHandler(res, false, "Category not found", 404);
  }

  return responseHandler(res, true, "Category deleted successfully", 200, deletedCategory);

})  


export const getFaqCategoryById = asyncHandler(async (req: Request, res: Response) => {
  const validate = faqCategorySchemaById.safeParse(req.body);

  if (!validate.success) {
    return responseHandler(res, false, validate.error.errors[0].message, 400)
  }

  const category = await Faq.findById(validate.data.id);

  if (!category) {
    return responseHandler(res, false, "Category not found", 404);
  }

  return responseHandler(res, true, "Category fetched successfully", 200, category);
})

