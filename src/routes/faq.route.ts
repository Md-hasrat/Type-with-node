import {Router} from "express";              
import { createFaq, getAllFaqCategory } from "../controller/faq.controller";


const router = Router()

router.post("/createFaq",createFaq)
router.get("/getAllFaqCategory",getAllFaqCategory)

export default router
