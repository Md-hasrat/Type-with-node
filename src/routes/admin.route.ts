import {Router} from 'express'
import { adminLoginWithOtp, forgetPassword, getOtp, loginAdmin, logoutAdmin, registerAdmin } from '../controller/admin.controller'
// import { verifyJWTAdmin } from '../middleware/jwt'

const router = Router()

router.post("/registerAdmin",registerAdmin)
router.post("/loginAdmin",loginAdmin)
router.post("/logoutAdmin",logoutAdmin)
router.post("/getOtp",getOtp)
router.post("/adminLoginWithOtp",adminLoginWithOtp)
router.post("/forget-Password",forgetPassword)

export default router
