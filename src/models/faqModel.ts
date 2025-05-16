import mongoose, {Schema,model} from "mongoose"


export const faqSchema = new Schema({
    question: {
        type: String,
        required: true,
        unique: true
    },
    answer: {
        type: String,   
        required: true
    },
    faqCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FaqCategory",
        required: true
    },
    status: {
        type: String,
        enum: ['draft', 'published',"archieved"],
       default: 'draft'
    }   
}, { timestamps: true })

const Faq = model("Faq", faqSchema)
export default Faq
