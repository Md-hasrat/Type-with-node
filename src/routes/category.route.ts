import  {Router} from "express"
import { createCategory, deleteCategoryById, getAllCategory, updateCategory } from "../controller/category.controller"


const router = Router()

router.post("/createCategory",createCategory)
router.get("/getAllCategory",getAllCategory)
router.post("/updateCategory",updateCategory)
router.post("/deleteCategoryById",deleteCategoryById)



export default router
