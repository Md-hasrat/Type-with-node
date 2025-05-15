import {Router} from "express"
import { updateSubAdmin } from "../controller/subAdmin.controller"

const router = Router()

router.post("/updateSubAdmin/:id",updateSubAdmin)

export default router