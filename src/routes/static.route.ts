import { Router } from "express";
import { createStaticContent, getAllStaticContent } from "../controller/static.controller";

const router = Router()

router.post("/createStaticContent",createStaticContent)
router.get("/getAllStaticContent",getAllStaticContent)

export default router