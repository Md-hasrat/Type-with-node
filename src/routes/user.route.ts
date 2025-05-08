import { Router } from "express";
import { 
    deleteUser,
    forgetPaasword, 
    getOpt, getUser, loginWithOtp, 
    resetPassword, 
    updateUser, 
    userLogin, userLogout, 
    userRegister, 
    verifyOtp 
} from "../controller/user.controller";
import { verifyJWT } from "../middleware/jwt";


const router = Router()


// Users route
router.post("/register",userRegister)
router.post("/userLogin",userLogin)
router.post("/userLogout", verifyJWT, userLogout);
router.post("/optgenerate", getOpt);
router.post("/loginWithOtp", loginWithOtp);
router.post("/forgetPaasword", forgetPaasword);
router.post("/verifyOtp", verifyOtp);
router.post("/resetPassword", resetPassword);
router.put("/deleteUser", deleteUser);
router.get("/getUser", getUser);
router.post("/updateUser",verifyJWT,updateUser);


export default router