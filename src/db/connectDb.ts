 
import mongoose,{connect} from "mongoose";


async function connectDB(): Promise<void>{
    return connect("mongodb://localhost:27017")
        .then(()=>{
            console.log("MongoDB connected successfully!!!");
        }).catch((error:any)=>{
            console.log(error);
        })
}


export default connectDB