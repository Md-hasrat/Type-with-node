import {Router} from "express"
import { createFaqCategory } from "../controller/faqCategory.controller"


const router = Router()

router.post("/createFaqCategory",createFaqCategory)

export default router