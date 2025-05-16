import  {Router} from "express"
import { createCategory } from "../controller/category.controller"


const router = Router()

router.post("/createCategory",createCategory)

export default router
