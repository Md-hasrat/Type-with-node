import { Router } from "express";
import { createStaticContent, getAllStaticContent, updateStaticContent } from "../controller/static.controller";

const router = Router()

router.post("/createStaticContent",createStaticContent)
router.get("/getAllStaticContent",getAllStaticContent)
router.post("/updateStaticContent",updateStaticContent)

export default router