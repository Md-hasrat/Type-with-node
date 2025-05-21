import mongoose, { Schema, Document } from "mongoose";
import { CategoryInput } from "../zodSchema/categorySchema";

const CategorySchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },
  },
  {
    timestamps: true,
  }
);


const faqCategoryModel = mongoose.model<CategoryInput>(
  "FaqCategory",
  CategorySchema,
  "faqcategories" // force plural form
);

export default faqCategoryModel;
