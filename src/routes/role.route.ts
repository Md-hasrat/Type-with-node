import { Router } from "express";
import { createRole } from "../controller/role.controller";

const router = Router();


router.post("/createRole",createRole)

export default router;