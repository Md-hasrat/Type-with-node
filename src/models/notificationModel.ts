import mongoose,{Schema,model} from "mongoose";


interface INotification {
    title: string;
    message: string;
    userId?: mongoose.Schema.Types.ObjectId;
    deletedBy?: mongoose.Schema.Types.ObjectId;
    status: string;
    sendAt: Date;
}


const notificationSchema = new Schema({
    title:{
        type:String,
        required:true,
        trim: true  
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    deletedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    status: {
        type: String,
        enum: ['send', 'failed'],
        default: 'send'
    },
    sendAt:{
        type: Date,
        default: Date.now
    }

},{timestamps: true})

const Notification = model("Notification",notificationSchema)
export default Notification
