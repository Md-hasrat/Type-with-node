import { asyncHandler } from "../../utils/errrorHandler";
import { Request, Response } from "express";
import { createStaticSchema, staticSchemaId } from "../zodSchema/staticSchema";
import { responseHandler } from "../../utils/responseHandler";
import StaticContent from "../models/staticModel";


export const createStaticContent  = asyncHandler(async(req:Request, res:Response)=>{
    const validate = createStaticSchema.safeParse(req.body)

    if(!validate.success){
        return responseHandler(res,false,validate.error.errors[0].message,400)
    }

    const existingStatic = await StaticContent.findOne({name:validate.data.name})

    if(existingStatic){
        return responseHandler(res,false,"Static content already exists with this name",400)
    }

    const staticContent = await StaticContent.create(validate.data)
    return responseHandler(res,true,"Static content created successfully",200,staticContent)
})


export const getAllStaticContent = asyncHandler(async(req:Request, res:Response)=>{
    const staticContent = await StaticContent.find()
    return responseHandler(res,true,"Static content fetched successfully",200,staticContent)
})


export const updateStaticContent = asyncHandler(async(req:Request, res:Response)=>{
    const validate = staticSchemaId.safeParse(req.body)

    if(!validate.success){
        return responseHandler(res,false,validate.error.errors[0].message,400)
    }

    const content = await StaticContent.findByIdAndUpdate(
        validate.data.id,
        {$set:validate.data},   
        {new:true})

    if(!content){
        return responseHandler(res,false,"Static content not found",404)
    }

    return responseHandler(res,true,"Static content updated successfully",200,content)  

})