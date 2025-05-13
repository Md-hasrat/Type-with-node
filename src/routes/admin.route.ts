import {Router} from 'express'
import { loginAdmin, logoutAdmin, registerAdmin } from '../controller/admin.controller'
// import { verifyJWTAdmin } from '../middleware/jwt'

const router = Router()

router.post("/registerAdmin",registerAdmin)
router.post("/loginAdmin",loginAdmin)
router.post("/logoutAdmin",logoutAdmin)

export default router
