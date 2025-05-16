import { Schema, model } from "mongoose";


interface ICategory {
    title: string;
    status: string;
}


const categorySchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        enum: ['draft', 'published',"archieved"],
       default: 'draft'
    }
}, { timestamps: true })


const Category = model<ICategory>("Category", categorySchema)
export default Category
