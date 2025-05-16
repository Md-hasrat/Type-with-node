import { asyncHandler } from "../../utils/errrorHandler";
import { Request, Response } from "express";
import { createFaqCategorySchema } from "../zodSchema/faqCategorySchema";
import FaqCategory from "../models/faqCategoryModel";
import { responseHandler } from "../../utils/responseHandler";


export const createFaqCategory = asyncHandler( async (req: Request, res: Response) => {
    const validate = createFaqCategorySchema.safeParse(req.body)

    if(!validate.success){
        return responseHandler(res,false,validate.error.errors[0].message,400)
    }

    const newCategory = await FaqCategory.create(validate.data)
    return responseHandler(res,true,"Category created successfully",200,newCategory)    
})