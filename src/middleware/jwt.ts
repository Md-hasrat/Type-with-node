import { responseHandler } from "../../utils/responseHandler";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";


interface JwtPayload {
  userId: string;
  adminId: string;
}

interface AuthenticatedRequest extends Request {
    userId?: string;
    adminId?: string;
}


export const verifyJWT = (req:AuthenticatedRequest, res:Response, next:NextFunction) => {

    const token = req.headers.authorization; // Extract token
    // console.log('Extracted Token:', token); // Log token for debugging
    if (!token) {
        return responseHandler(res, false, "Token not found", 401);
    }

    jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
        if (err || typeof decoded !== 'object' || !('userId' in decoded)) {
            return responseHandler(res, false, "Invalid token", 403);
        }
    
        req.userId = (decoded as JwtPayload).userId;
        next();
    });
}


export const verifyJWTAdmin = (req:AuthenticatedRequest, res:Response, next:NextFunction) => {

    const token = req.headers.authorization; // Extract token
    // console.log('Extracted Token:', token); // Log token for debugging
    if (!token) {
        return responseHandler(res, false, "Token not found", 401);
    }

    jwt.verify(token, process.env.JWT_SECRET_ADMIN!, (err, decoded) => {
        if (err || typeof decoded !== 'object' || !('adminId' in decoded)) {
            return responseHandler(res, false, "Invalid token", 403);
        }
    
        req.adminId = (decoded as JwtPayload).adminId;
        next();
    });
}