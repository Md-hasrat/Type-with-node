import { Schema, model, Document } from 'mongoose';

export interface IFaqCategory extends Document {
    title: string;
    status: 'draft' | 'published' | 'archived';
    createdAt: Date;
    updatedAt: Date;
}

export const faqCategorySchema = new Schema<IFaqCategory>({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    status: {
        type: String,
        enum: ['draft', 'published', 'archived'],
        default: 'draft'
    }
}, { timestamps: true });

const FaqCategory = model<IFaqCategory>("FaqCategory", faqCategorySchema);
export default FaqCategory;
