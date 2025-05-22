import {Router} from "express";              
import { createFaq, getAllFaqCategory, updateFaqCategoryById } from "../controller/faq.controller";


const router = Router()

router.post("/createFaq",createFaq)
router.get("/getAllFaqCategory",getAllFaqCategory)
router.post("/updateFaqCategory",updateFaqCategoryById)

export default router
