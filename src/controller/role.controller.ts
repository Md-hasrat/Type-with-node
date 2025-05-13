import { asyncHandler } from "../../utils/errrorHandler";
import { Request, Response } from "express";
import { createRoleSchema } from "../zodSchema/roleSchema";
import { responseHandler } from "../../utils/responseHandler";
import RoleModel from "../models/roleModel";



export const createRole = asyncHandler(async(req:Request, res:Response)=>{
    const validate = createRoleSchema.body.safeParse( req.body );
    if(!validate.success){
        return responseHandler(res,false,validate.error.errors[0].message,400)
    }

    const {roleName,accessRights} = validate.data

    const existingRole = await RoleModel.findOne({roleName,isDeleted: false})

    if(existingRole){
        return responseHandler(res,false,"Role already exists",400)
    }

    
    const role = await RoleModel.create({
        roleName,
        accessRights
    })

    return responseHandler(res,true,"Role created successfully",200,role)
})
