import express,{Request,Response} from 'express'
import connectDB from './db/connectDb'
import userRoute from "./routes/user.route"
import foodRoute from "./routes/foodWaste.route"
import "dotenv/config"

const app = express()


// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

app.get('/test',(req:Request,res:Response):void=>{
    res.json({data: "Hello world!!!"})
})

app.use("/api/user",userRoute)
app.use("/api/food-waste",foodRoute)


connectDB()


app.listen(3000, (): void => {
    console.log('Server is running on port 3000');
})  



