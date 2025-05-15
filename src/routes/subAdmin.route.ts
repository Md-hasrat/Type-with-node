import {Router} from "express"
import { deleteSubAdmin, getSubadminById, updateSubAdmin } from "../controller/subAdmin.controller"

const router = Router()

router.post("/updateSubAdmin/:id",updateSubAdmin)
router.get("/getSubadminById/:id",getSubadminById)
router.post("/deleteSubAdmin/:id",deleteSubAdmin)

export default router