import {Router} from 'express'
import { adminLoginWithOtp, editProfile, forgetPassword, getAdmin, getOtp, loginAdmin, logoutAdmin, registerAdmin, resetPasswordAdmin } from '../controller/admin.controller'

const router = Router()

router.post("/registerAdmin",registerAdmin)
router.post("/loginAdmin",loginAdmin)
router.post("/logoutAdmin",logoutAdmin)
router.post("/getOtp",getOtp)
router.post("/adminLoginWithOtp",adminLoginWithOtp)
router.post("/forget-Password",forgetPassword)
router.post("/reset-Password",resetPasswordAdmin)
router.post("/edit-Profile",editProfile)
router.post("/getAdmin",getAdmin)

export default router
