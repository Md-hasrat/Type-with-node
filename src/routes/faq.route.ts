import {Router} from "express";              
import { createFaq, deleteFaqCategoryById, getAllFaqCategory, getFaqCategoryById, updateFaqCategoryById } from "../controller/faq.controller";


const router = Router()

router.post("/createFaq",createFaq)
router.get("/getAllFaqCategory",getAllFaqCategory)
router.post("/updateFaqCategory",updateFaqCategoryById)
router.post("/deleteFaqCategoryById",deleteFaqCategoryById)
router.post("/getFaqCategoryById",getFaqCategoryById)

export default router
