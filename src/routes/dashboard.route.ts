import {Router} from "express";
import { getDashboardStats } from "../controller/dashboard.controller";


const router = Router()

router.get("/dashboardStats",getDashboardStats)

export default router