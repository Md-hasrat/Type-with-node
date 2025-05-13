import mongoose,{Schema,Document} from "mongoose";


// Interface for the admin model
interface IAdmin extends Document{
    registrationId:string,
    roleId: string,
    fullName:string,
    email:string,
    phone:string,
    userType:string,
    password:string,
    isDeleted:boolean,
    isBlocked:boolean,
    isCurrentlyLoggedIn:boolean
}

// Schema for the admin model
const adminSchema = new Schema({
    registrationId:{
        type:String,
        required:true,
        unique:true
    },
    roleId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "role",
        required:true
    },
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type: String,
        required: true,
    },
    userType:{
        type: String,
        enum: ["admin", "subAdmin"],
        default: "admin",
    },
    password:{
        type:String,
        required:true
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    isBlocked:{
        type:Boolean,
        default:false
    },
    isCurrentlyLoggedIn:{
        type:Boolean,
        default:false
    },
    accesToken:{
        type:String,
        default:""
    }
},{
    timestamps:true 
})


const adminModel = mongoose.model<IAdmin>("admin",adminSchema)
export default adminModel
