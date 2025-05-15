import {Router} from "express"
import { getSubadminById, updateSubAdmin } from "../controller/subAdmin.controller"

const router = Router()

router.post("/updateSubAdmin/:id",updateSubAdmin)
router.get("/getSubadminById/:id",getSubadminById)

export default router