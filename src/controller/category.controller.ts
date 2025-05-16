import { asyncHandler } from "../../utils/errrorHandler";
import { Request, Response } from "express";
import { categoryIdSchema, createCategorySchema, updateCategorySchema } from "../zodSchema/categorySchema";
import { responseHandler } from "../../utils/responseHandler";
import Category from "../models/categoryModel";


export const createCategory = asyncHandler(async(req:Request, res:Response)=>{
    const validate = createCategorySchema.safeParse( req.body );

    if(!validate.success){
        return responseHandler(res,false,validate.error.errors[0].message,400)
    }

    const newCategory = await Category.create(validate.data)
    return responseHandler(res,true,"Category created successfully",200,newCategory)    
})

export const getAllCategory = asyncHandler(async(req:Request, res:Response)=>{
    const category = await Category.find()
    return responseHandler(res,true,"Category fetched successfully",200,category)
})


export const updateCategory  =  asyncHandler(async(req:Request, res:Response)=>{
    const validate = updateCategorySchema.safeParse(req.body)

    if(!validate.success){
        return responseHandler(res,false,validate.error.errors[0].message,400)
    }   

    const updatedCategory = await Category.findByIdAndUpdate(
        validate.data.id,
        validate.data,
        {new:true}
    )

    if(!updatedCategory){
        return responseHandler(res,false,"Category not found",404)
    }
    
    return responseHandler(res,true,"Category updated successfully",200,updatedCategory)
})


export const deleteCategoryById = asyncHandler(async(req:Request, res:Response)=>{
    const validate = categoryIdSchema.safeParse(req.body)

    if(!validate.success){
        return responseHandler(res,false,validate.error.errors[0].message,400)
    }

    const deletedCategory = await Category.findByIdAndDelete(validate.data.id)  

    if(!deletedCategory){
        return responseHandler(res,false,"Category not found",404)
    }

    return responseHandler(res,true,"Category deleted successfully",200,deletedCategory)
})

