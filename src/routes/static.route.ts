import { Router } from "express";
import { createStaticContent, deleteStaticContent, getAllStaticContent, updateStaticContent } from "../controller/static.controller";

const router = Router()

router.post("/createStaticContent",createStaticContent)
router.get("/getAllStaticContent",getAllStaticContent)
router.post("/updateStaticContent",updateStaticContent)
router.post("/deleteStaticContent",deleteStaticContent)

export default router