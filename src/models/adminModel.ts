import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcryptjs";


// Interface for the admin model
interface IAdmin extends Document {
    registrationId: string,
    roleId: string,
    fullName: string,
    email: string,
    phone: string,
    userType: string,
    password: string,
    isDeleted: boolean,
    isBlocked: boolean,
    isCurrentlyLoggedIn: boolean,
    accesToken: string,
    otp: string,
    resetPasswordExpires: Number,
    comparePassword(password: string): Promise<boolean>;
}


// Interface for the admin model with static methods
export interface AdminModel extends Model<IAdmin> {
    hashPassword(password: string): Promise<string>,
}

// Schema for the admin model
const adminSchema = new Schema({
    registrationId: {
        type: String,
        required: true,
        unique: true
    },
    roleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "role",
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        enum: ["admin", "subAdmin"],
        default: "admin",
    },
    password: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    isCurrentlyLoggedIn: {
        type: Boolean,
        default: false
    },
    accesToken: {
        type: String,
        default: ""
    },
    otp:{
        type: String,
        default: ""
    },
    resetPasswordExpires:{
        type: Number,
    }
}, {
    timestamps: true
})


adminSchema.statics.hashPassword = async function (password: string): Promise<string> {
    return bcrypt.hash(password, 10)
}

adminSchema.methods.comparePassword = async function (
    password: string
): Promise<boolean> {
    return bcrypt.compare(password, this.password);
}

const adminModel = mongoose.model<IAdmin, AdminModel>("admin", adminSchema)
export default adminModel
