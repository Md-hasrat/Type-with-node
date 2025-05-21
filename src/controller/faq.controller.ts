import { asyncHandler } from "../../utils/errrorHandler";
import { Request, Response } from "express";
import { createFaqSchema, faqQuerySchema } from "../zodSchema/faqSchema";
import { responseHandler } from "../../utils/responseHandler";
// import Category from "../models/categoryModel";
import { getAllFaqQuery } from "../services/faqService";
import Faq from "../models/faqModel";


export const createFaq = asyncHandler(async(req:Request, res:Response)=>{
    const validate = createFaqSchema.safeParse( req.body );

    if(!validate.success){
        return responseHandler(res,false,validate.error.errors[0].message,400)
    }   

    const newCategory = await Faq.create(validate.data)
    return responseHandler(res,true,"Category created successfully",200,newCategory)
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
