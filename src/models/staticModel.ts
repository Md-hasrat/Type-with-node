import mongoose, { Schema, model, Document } from "mongoose";


export interface IStaticContent extends Document {
    name: string,
    description: string,
    updatedAt: Date
    createdAt: Date
}


const staticContentSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
    },
}, { timestamps: true })


const StaticContent = mongoose.model<IStaticContent>("StaticContent", staticContentSchema)
export default StaticContent
