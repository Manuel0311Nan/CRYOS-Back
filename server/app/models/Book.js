import { Schema, model } from 'mongoose';

const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    rune: {
        type: String,
    },
    page_1: {
        type: String,
        required: true
    },
    page_2: {
        type: String,
        required: true
    },
    page_3: {
        type: String,
        required: true
    },
    page_4: {
        type: String,
        required: true
    },
    page_5: {
        type: String,
        required: true
    },
    page_6: {
        type: String,
        required: true
    },
    page_7: {
        type: String,
        required: true
    },
    page_8: {
        type: String,
        required: true
    },
    page_9: {
        type: String,
        required: true
    },
    page_10: {
        type: String,
        required: true
    },
    page_11: {
        type: String,
        required: true
    },
    page_12: {
        type: String,
        required: true
    },
    page_13: {
        type: String,
        required: true
    },
    page_14: {
        type: String,
        required: true
    },
    page_15: {
        type: String,
        required: true
    },
    page_16: {
        type: String,
        required: true
    },
    page_17: {
        type: String,
        required: true
    },
    page_18: {
        type: String,
        required: true
    },
    page_19: {
        type: String,
        required: true
    },
    page_20: {
        type: String,
        required: true
    },
    page_21: {
        type: String,
    },
    page_22: {
        type: String,
    },
    page_23: {
        type: String,
    },
    page_24: {
        type: String,
    },
    page_25: {
        type: String,
    },
    page_26: {
        type: String,
    },
    page_27: {
        type: String,
    },
    page_28: {
        type: String,
    },
    page_29: {
        type: String,
    },
    page_30: {
        type: String,
    },
    writer: {
        type: String,
    },
    writerUser: [{
        type: Schema.Types.ObjectId,
        ref:'User'
    }]
})

const Book = model('Book', bookSchema)

export { Book }