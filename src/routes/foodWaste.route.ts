import {Router} from 'express';
import { createFoodWaste } from '../controller/foodWaste.controller';

const router = Router()

router.post("/createFoodWaste",createFoodWaste) 

export default router
