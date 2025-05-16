import  {Router} from "express"
import { createCategory, getAllCategory } from "../controller/category.controller"


const router = Router()

router.post("/createCategory",createCategory)
router.get("/getAllCategory",getAllCategory)

export default router
