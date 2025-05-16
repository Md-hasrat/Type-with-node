import {Router} from "express";              
import { createFaq } from "../controller/faq.controller";


const router = Router()

router.post("/createFaq",createFaq)

export default router
