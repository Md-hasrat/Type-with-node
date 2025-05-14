import { asyncHandler } from "../../utils/errrorHandler"
import { Request, Response } from "express"
import { adminLoginSchema, adminLoginWithOtpSchema, adminLogoutSchema, adminRegisterSchema, sendOtpSchema } from "../zodSchema/adminSchema"
import { responseHandler } from "../../utils/responseHandler"
import adminModel from "../models/adminModel"
import { generateNextCustomId } from "../config/generateUniqueId"
import jwt from "jsonwebtoken"
import { generateOtp } from "../config/otpGenerator/otpGnerate"
import { sendOtpEmail } from "../config/nodeMailer"


export const registerAdmin = asyncHandler(async (req: Request, res: Response) => {
    const validate = adminRegisterSchema.safeParse(req.body)

    if (!validate.success) {
        return responseHandler(res, false, validate.error.errors[0].message, 400)
    }
    const { roleId, userType, fullName, email, phone, password } = validate.data

    const existingAdmin = await adminModel.findOne({ email })

    if (existingAdmin) {
        return responseHandler(res, false, "Email already registered", 400)
    }

    const registrationId = await generateNextCustomId(
        adminModel,
        "ADM",
        "registrationId"
    )

    const hashedPassword = await adminModel.hashPassword(password)

    const admin = new adminModel({
        registrationId,
        roleId,
        userType,
        fullName,
        email,
        phone,
        password: hashedPassword,
    })

    await admin.save()

    return responseHandler(res, true, "Admin registered successfully", 201, { admin })
})


export const loginAdmin = asyncHandler(async (req: Request, res: Response) => {
    const validate = adminLoginSchema.safeParse(req.body)

    if (!validate.success) {
        return responseHandler(res, false, validate.error.errors[0].message, 400)
    }

    const { email, password } = validate.data

    const admin = await adminModel.findOne({ email })

    if (!admin) {
        return responseHandler(res, false, "Invalid email or password", 401)
    }

    const isPasswordValid = await admin.comparePassword(password);

    if (!isPasswordValid) {
        return responseHandler(res, false, "Invalid email or password", 401)
    }

    const token = jwt.sign(
        { adminId: admin._id },
        process.env.JWT_SECRET_ADMIN!.toString(),
        { expiresIn: "6h" })

    admin.accesToken = token
    admin.isCurrentlyLoggedIn = true
    await admin.save()

    return responseHandler(res, true, "Admin logged in successfully", 200, {
        admin: {
            _id: admin._id,
            registrationId: admin.registrationId,
            roleId: admin.roleId,
            userType: admin.userType,
            fullName: admin.fullName,
            email: admin.email,
            phone: admin.phone,
            accesToken: token
        }
    })
})


export const logoutAdmin =asyncHandler(async (req: Request, res: Response) => {

    // console.log("Request body:", req.body); 

    const validate = adminLogoutSchema.safeParse(req.body)
    if (!validate.success) {
        return responseHandler(res, false, validate.error.errors[0].message, 400)
    }

    const admin = await adminModel.findById(validate.data.adminId)
    if (!admin) {
        return responseHandler(res, false, "Admin not found", 404)
    }

    admin.accesToken = undefined
    admin.isCurrentlyLoggedIn = false
    await admin.save()

    return responseHandler(res, true, "Admin logged out successfully", 200,{admin}) 
})


export const getOtp = asyncHandler(async (req: Request, res: Response) => {
    const validate = sendOtpSchema.safeParse(req.body)

    if(!validate.success){
        return responseHandler(res, false, validate.error.errors[0].message, 400)
    }

    const {email} = validate.data
    const admin = await adminModel.findOne({email})

    if(!admin){
        return responseHandler(res, false, "Admin not found", 404)  
    }

    const otp = generateOtp(6)
    // console.log("Generated OTP:", otp);
    
    admin.otp = otp
    await admin.save()

    sendOtpEmail({
        to: email,
        subject: "OTP for verification",
        otp,
    });

    return responseHandler(res, true, "OTP sent successfully", 200, { otp })
})


export const adminLoginWithOtp = asyncHandler(async (req: Request, res: Response) => {
    const validate = adminLoginWithOtpSchema.safeParse(req.body)

    if(!validate.success){
        return responseHandler(res, false, validate.error.errors[0].message, 400)   
    }

    const {email,otp} = validate.data
    const admin =await adminModel.findOne({email})

    if(!admin){
        return responseHandler(res, false, "Admin not found", 404)  
    }

    if(admin.otp !== otp){
        return responseHandler(res, false, "Invalid OTP", 401)  
    }

    admin.otp = undefined

    const token = jwt.sign(
        { adminId: admin._id },
        process.env.JWT_SECRET_ADMIN!.toString(),
        { expiresIn: "6h" }
    )

    admin.accesToken = token
    admin.isCurrentlyLoggedIn = true
    await admin.save()

    return responseHandler(res, true, "Admin logged in successfully", 200, {
        admin: {
            _id: admin._id,
            registrationId: admin.registrationId,
            roleId: admin.roleId,
            userType: admin.userType,
            fullName: admin.fullName,
            email: admin.email,
            phone: admin.phone,
            accesToken: token
        }
    })
})


