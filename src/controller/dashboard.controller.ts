import {Request,Response} from 'express'
import User from '../models/userModel'
import { asyncHandler } from '../../utils/errrorHandler'
import { responseHandler } from '../../utils/responseHandler'
import adminModel from '../models/adminModel'

export const getDashboardStats = asyncHandler(async(req:Request,res:Response)=>{
    const [totalUsers,activeUsers] = await Promise.all([
        User.countDocuments({
            isDeleted:false
        }),

        User.countDocuments({
            isDeleted:false,
            isCurrentlyLoggedIn:true
        })
    ])

    const inActiveUsers = totalUsers - activeUsers

    const [totalSubAdmin,activeSubAdmin] = await Promise.all([
        adminModel.countDocuments({
            isDeleted:false,
            userType:"subAdmin"
        }),

        adminModel.countDocuments({
            isDeleted:false,
            userType:"subAdmin",
            isCurrentlyLoggedIn:true
        })
    ])

    const inActiveSubAdmin = totalSubAdmin - activeSubAdmin

    return responseHandler(res,true,
        "Dashboard stats",
        200,
        {
            totalUsers,
            activeUsers,
            inActiveUsers,
            totalSubAdmin,
            activeSubAdmin,
            inActiveSubAdmin
        }
    )        

})

