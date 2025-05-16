import mongoose, { Schema, model, Document } from "mongoose";

export interface IFaq extends Document {
  question: string;
  answer: string;
  faqCategoryId: mongoose.Types.ObjectId;
  status: 'draft' | 'published' | 'archived';
  createdAt: Date;
  updatedAt: Date;
}

export const faqSchema = new Schema<IFaq>({
  question: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  answer: {
    type: String,
    required: true,
    trim: true
  },
  faqCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FaqCategory",
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  }
}, { timestamps: true });

const Faq = model<IFaq>("Faq", faqSchema);
export default Faq;
