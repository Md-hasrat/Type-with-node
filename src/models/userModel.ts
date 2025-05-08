import { Schema, model, Document, Model } from "mongoose";
import bcrypt from 'bcryptjs'


interface UserI extends Document {
    username: string,
    password: string,
    email: string,
    isCurrentlyLoggedIn: boolean,
    accessToken: string,
    otp: string,
    otpExpire: Date,
    isVerified: boolean,
    createdAt: Date,
    userLogedIn(): Promise<void>,
    comparePassword(password: string): Promise<boolean>

}

interface UserModel extends Model<UserI>{
    hashPassword(password: string): Promise<string>,
}

// Define the user schema
const userSchema: Schema = new Schema<UserI>({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },  
    isCurrentlyLoggedIn: {
        type: Boolean,
        default: false
    },
    accessToken:{
        type:String,
    },
    otp: {
        type: String,
        default: null
    },
    otpExpire: {
    type: Date,
        default: null
    },
    isVerified: { 
        type: Boolean,
        default: false       
    },
}, { timestamps: true })


userSchema.methods.userLogedIn = async function (): Promise<void> {
    this.isCurrentlyLoggedIn = true
    await this.save()
}


userSchema.statics.hashPassword = async function (password: string): Promise<string> {
    return bcrypt.hash(password, 10)
}

userSchema.methods.comparePassword = async function (
    password: string
): Promise<boolean> {
    return bcrypt.compare(password, this.password);
}



const User = model<UserI,UserModel>("User", userSchema)

export default User