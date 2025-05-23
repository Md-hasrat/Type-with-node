import { Router } from "express";
import { createArticle } from "../controller/article.controller";

const router = Router()

router.post("/createArticle",createArticle)

export default router