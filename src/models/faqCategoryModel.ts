import {Schema,model} from 'mongoose'


export const faqCategorySchema = new Schema({
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

const FaqCategory = model("FaqCategory", faqCategorySchema)
export default FaqCategory

