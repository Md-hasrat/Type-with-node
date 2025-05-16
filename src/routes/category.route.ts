import  {Router} from "express"
import { createCategory, getAllCategory, updateCategory } from "../controller/category.controller"


const router = Router()

router.post("/createCategory",createCategory)
router.get("/getAllCategory",getAllCategory)
router.post("/updateCategory",updateCategory)

export default router
