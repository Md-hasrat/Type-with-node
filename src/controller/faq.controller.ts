import { asyncHandler } from "../../utils/errrorHandler";
import { Request, Response } from "express";
import { createFaqSchema } from "../zodSchema/faqSchema";
import { responseHandler } from "../../utils/responseHandler";
import Category from "../models/categoryModel";


export const createFaq = asyncHandler(async(req:Request, res:Response)=>{
    const validate = createFaqSchema.safeParse( req.body );

    if(!validate.success){
        return responseHandler(res,false,validate.error.errors[0].message,400)
    }   

    const newCategory = await Category.create(validate.data)
    return responseHandler(res,true,"Category created successfully",200,newCategory)
})

