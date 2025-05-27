import express,{Request,Response} from 'express'
import connectDB from './db/connectDb'
import userRoute from "./routes/user.route"
import foodRoute from "./routes/foodWaste.route"
import adminRoute from "./routes/admin.route"
import roleRoute from "./routes/role.route"
import subAdminRoute from './routes/subAdmin.route'
import categoryRoute from './routes/category.route'
import faqRoute from './routes/faq.route'
import faqCatrogoryRoute from './routes/faqCategory.route'
import staticRoute from "./routes/static.route"
import articleRoute from "./routes/article.route"
import dashboardRoute from "./routes/dashboard.route"


import "dotenv/config"

const app = express()


// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));



app.use("/api/user",userRoute)
app.use("/api/food-waste",foodRoute)
app.use("/api/admin",adminRoute)
app.use("/api/role",roleRoute)
app.use("/api/subadmin",subAdminRoute)
app.use("/api/category",categoryRoute)
app.use("/api/faq",faqRoute)
app.use("/api/faqCategory",faqCatrogoryRoute)
app.use("/api/static",staticRoute)
app.use("/api/article",articleRoute)
app.use("/api/dashboard",dashboardRoute)



connectDB()


app.listen(8080, (): void => {
    console.log('Server is running on port 8080');
})  

