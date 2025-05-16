import express,{Request,Response} from 'express'
import connectDB from './db/connectDb'
import userRoute from "./routes/user.route"
import foodRoute from "./routes/foodWaste.route"
import adminRoute from "./routes/admin.route"
import roleRoute from "./routes/role.route"
import subAdminRoute from './routes/subAdmin.route'
import categoryRoute from './routes/category.route'

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
app.use("/api/admin",adminRoute)
app.use("/api/role",roleRoute)
app.use("/api/subadmin",subAdminRoute)
app.use("/api/category",categoryRoute)


connectDB()


app.listen(3000, (): void => {
    console.log('Server is running on port 3000');
})  

