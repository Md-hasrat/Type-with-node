import {Router} from "express";              
import { createFaq, deleteFaqCategoryById, getAllFaqCategory, updateFaqCategoryById } from "../controller/faq.controller";


const router = Router()

router.post("/createFaq",createFaq)
router.get("/getAllFaqCategory",getAllFaqCategory)
router.post("/updateFaqCategory",updateFaqCategoryById)
router.post("/deleteFaqCategoryById",deleteFaqCategoryById)

export default router
