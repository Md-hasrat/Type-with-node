import { asyncHandler } from "../../utils/errrorHandler";
import { Request, Response } from "express"
import { deleteUserSchema, forgetPasswordSchema, logoutSchema, otpSchema, resetPasswordSchema, userLogedInSchema, userLogedInWithOtpSchema, userRegisterSchema, verifyOtpSchema,getUserSchema, updateUserSchema } from "../zodSchema/userSchema";
import { responseHandler } from "../../utils/responseHandler";
import User from "../models/userModel";
import jwt from "jsonwebtoken";
import { generateOtp } from "../config/otpGenerator/otpGnerate";
import { sendOtpEmail } from "../config/nodeMailer";
import { deleteAllUsersFood } from "../services/userService";


// Optional: Custom request type if TypeScript complains about req.userId
interface AuthenticatedRequest extends Request {
    userId?: string;
}


export const userRegister = asyncHandler(async (req: Request, res: Response) => {
    const validate = userRegisterSchema.safeParse(req.body)

    if (!validate.success) {
        return responseHandler(res, false, validate.error.errors[0].message, 400)
    }

    const { username, email, password } = validate.data

    const existingUser = await User.findOne({ email })

    if (existingUser) {
        return responseHandler(res, false, "User alreay exist", 401)
    }

    const hashedPassword = await User.hashPassword(password)

    const user = new User({
        username,
        email,
        password: hashedPassword,
    })

    await user.save()

    return responseHandler(res, true, "Register successfully!!!", 201, { user })

})


export const userLogin = asyncHandler(async (req: Request, res: Response) => {
    const validate = userLogedInSchema.safeParse(req.body)

    if (!validate.success) {
        return responseHandler(res, false, validate.error.errors[0].message, 400)
    }

    const { email, password } = validate.data

    const user = await User.findOne({ email: validate.data.email })

    if (!user) {
        return responseHandler(res, false, "User not found with this email", 401)
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
        return responseHandler(res, false, "Invalid password", 401)
    }

    const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET!.toString(),
        { expiresIn: "1d" }
    );

    user.accessToken = token

    user.isCurrentlyLoggedIn = true
    await user.save()

    return responseHandler(res, true, "Login successfully!!!", 200, { user })

})


export const userLogout = asyncHandler(async (req: Request, res: Response) => {
    // console.log( "hello")
    const validate = logoutSchema.safeParse(req.body)

    // console.log( "valoidate result",validate)
    if (!validate.success) {
        return responseHandler(res, false, validate.error.errors[0].message, 400)
    }

    const user = await User.findById(validate.data.userId)

    if (!user) {
        return responseHandler(res, false, "User not found", 401)
    }

    if (!user.isCurrentlyLoggedIn) {
        return responseHandler(res, false, "User already logged out", 401)
    }

    user.isCurrentlyLoggedIn = false
    user.accessToken = undefined
    await user.save()

    return responseHandler(res, true, "Logout successfully!!!", 200)

})


export const getOpt = asyncHandler(async (req: Request, res: Response) => {
    const validate = otpSchema.safeParse(req.body)

    if (!validate.success) {
        return responseHandler(res, false, validate.error.errors[0].message, 400)
    }

    const { email } = validate.data

    const user = await User.findOne({ email })
    if (!user) {
        return responseHandler(res, false, "User not found", 401)
    }

    const otp = generateOtp(6)

    user.otp = otp
    user.otpExpire = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes
    await user.save()

    // Send OTP to the user's email
    try {
        await sendOtpEmail({
            to: email,
            subject: "OTP for verification",
            otp,
        });

        // Return success response without exposing the OTP in the payload
        return responseHandler(res, true, "OTP sent successfully!!!", 200, otp);
    } catch (error) {
        console.error("Failed to send OTP email:", error);
        return responseHandler(res, false, "Failed to send OTP email", 500);
    }

})


export const loginWithOtp = asyncHandler(async (req: Request, res: Response) => {
    const validate = userLogedInWithOtpSchema.safeParse(req.body)

    if (!validate.success) {
        return responseHandler(res, false, validate.error.errors[0].message, 400)
    }

    const { email, otp } = validate.data

    const user = await User.findOne({ email })

    if (!user) {
        return responseHandler(res, false, "User not found with this email", 401)
    }

    if (user.otp !== otp) {
        return responseHandler(res, false, "Invalid OTP", 401)
    }

    if (user.otpExpire && user.otpExpire < new Date()) {
        return responseHandler(res, false, "OTP expired", 401)
    }

    const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET!.toString(),
        { expiresIn: "1d" }
    );

    user.accessToken = token
    user.isCurrentlyLoggedIn = true
    user.otp = undefined
    await user.save()

    return responseHandler(res, true, "Login successfully!!!", 200, { user })

})


export const forgetPaasword = asyncHandler(async (req: Request, res: Response) => {
    const validate = forgetPasswordSchema.safeParse(req.body)

    if (!validate.success) {
        return responseHandler(res, false, validate.error.errors[0].message, 400)
    }

    const { email } = validate.data

    const user = await User.findOne({ email })

    if (!user) {
        return responseHandler(res, false, "User not found with this email", 401)
    }

    // Generate reset token
    const otp = generateOtp(6)

    user.otp = otp
    user.isVerified = false
    user.isCurrentlyLoggedIn = false
    user.accessToken = undefined
    user.otpExpire = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes
    await user.save()

    await sendOtpEmail({
        to: email,
        subject: "OTP for password reset",
        otp,
    })

    return responseHandler(res, true, "Password reset successfully!!!", 200, { user })
})


export const verifyOtp = asyncHandler(async (req: Request, res: Response) => {
    const validate = verifyOtpSchema.safeParse(req.body)

    if (!validate.success) {
        return responseHandler(res, false, validate.error.errors[0].message, 400)
    }

    const { otp } = validate.data

    if (!otp) {
        return responseHandler(res, false, "Otp is required", 401)
    }

    const user = await User.findOne({ otp })

    if (!user) {
        return responseHandler(res, false, "User not found with this otp", 401)
    }

    if(!user.otpExpire || user.otpExpire < new Date()) {
        return responseHandler(res, false, "OTP has expired", 401);
    }

    user.isVerified = true
    user.otp = undefined
    user.otpExpire = undefined
    user.isCurrentlyLoggedIn = false
    user.accessToken = undefined
    await user.save()

    return responseHandler(res, true, "Otp verified successfully!!!", 200, { user })
})


export const resetPassword = asyncHandler(async (req: Request, res: Response) => {
    const validate = resetPasswordSchema.safeParse(req.body)
    
    if(!validate.success){
        return responseHandler(res, false, validate.error.errors[0].message, 400)   
    }

    const {id,password} = validate.data

    const user = await User.findById(id)

    if(!user){
        return responseHandler(res, false, "User not found", 401)   
    }

    if(!user.isVerified){
        return responseHandler(res, false, "User not verified", 401)   
    }

    const hashedPassword = await User.hashPassword(password)
    user.password = hashedPassword
    user.isVerified = false
    user.otp = undefined
    user.otpExpire = undefined
    user.isCurrentlyLoggedIn = false
    user.accessToken = undefined
    await user.save()

    
    return responseHandler(res, true, "Password reset successfully!!!", 200, { user })  
})


export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
    const validate = deleteUserSchema.safeParse(req.body)

    if(!validate.success){
        return responseHandler(res, false, validate.error.errors[0].message, 400)   
    }

    const deletedUserAndFood = await deleteAllUsersFood(validate.data.id)

    return responseHandler(res, true, "User and their food waste records deleted successfully!!!", 200,{deletedUserAndFood})   
})


export const getUser = asyncHandler(async (req: Request, res: Response) => {
    const validate = getUserSchema.safeParse(req.query)

    if(!validate.success){
        return responseHandler(res, false, validate.error.errors[0].message, 400)   
    }

    const user = await User.findOne({email:validate.data.email}).select("-password -otp -isVerified -isCurrentlyLoggedIn -accessToken")
    
    if(!user){
        return responseHandler(res, false, "User not found", 401)   
    }

    return responseHandler(res, true, "User found successfully!!!", 200,{user})
})  


export const updateUser = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const validate = updateUserSchema.safeParse(req.body)
    const userId = req.userId

    if(!validate.success){
        return responseHandler(res, false, validate.error.errors[0].message, 400)   
    }

    if(!userId){
        return responseHandler(res, false, "User not found", 401)   
    }

    const {username,userType} = validate.data

    const user = await User.findByIdAndUpdate(
        userId,
        {username,userType},
        {new: true}
    )

    if(!user){
        return responseHandler(res, false, "User not found", 401)   
    }
    return responseHandler(res, true, "User updated successfully!!!", 200,{user})
})

