import { Router } from "express";
import { createStaticContent } from "../controller/static.controller";

const router = Router()

router.post("/createStaticContent",createStaticContent)

export default router