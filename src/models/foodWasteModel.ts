import mongoose, { Schema, Document } from "mongoose";

export interface IFoodWaste extends Document {
    foodId: string;
    userId: mongoose.Schema.Types.ObjectId,
    date: Date,
    meat: boolean,
    dairy: boolean,
    other: boolean,
    totalWaste: number,
    meatPercentage: number,
    dairyPercentage: number,
    otherPercentage: number,
}


const foodWasteSchema: Schema = new Schema({
    foodId: {
        type: String,
        required: true,
        unique: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    date: {
        type: Date,
        required: true,
    },
    meat: { type: Boolean, default: false },
    dairy: { type: Boolean, default: false },
    other: { type: Boolean, default: false },

    totalWaste: { type: Number, required: true },
    meatPercentage: { type: Number },
    dairyPercentage: { type: Number },
    otherPercentage: { type: Number },
}, { timestamps: true })

const FoodWaste = mongoose.model<IFoodWaste>("FoodWaste", foodWasteSchema)

export default FoodWaste
