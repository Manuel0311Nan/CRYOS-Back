import { Book } from "../models/Book.js";
import { httpStatusCode } from "../../utils/seeds/httpStatusCode.js";

const gettAllBooks = async (req, res, next) => {
    try {
        const books = await Book.find().populate('writerUser', 'username')
        return res.status(200).json(books);
    } catch (error) {
        return next(error);
    }
};

const getBookById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const bookById = await Book.findById(id)
        return res.status(200).json(bookById);
    } catch (error) {
        return next(error)
    }
};

const writeBook = async (req, res, next) => {
    
    const { body } = req;
    try {
        const newBook = new Book({
            title: body.title,
            description: body.description,
            image: body.image,
            rune: body.rune,
            page_1: body.page_1,
            page_2: body.page_2,
            page_3: body.page_3,
            page_4: body.page_4,
            page_5: body.page_5,
            page_6: body.page_6,
            page_7: body.page_7,
            page_8: body.page_8,
            page_9: body.page_9,
            page_10: body.page_10,
            page_11: body.page_11,
            page_12: body.page_12,
            page_13: body.page_13,
            page_14: body.page_14,
            page_15: body.page_15,
            page_16: body.page_16,
            page_17: body.page_17,
            page_18: body.page_18,
            page_19: body.page_19,
            page_20: body.page_20,
            page_21: body.page_21,
            page_22: body.page_22,
            page_23: body.page_23,
            page_24: body.page_24,
            page_25: body.page_25,
            page_26: body.page_26,
            page_27: body.page_27,
            page_28: body.page_28,
            page_29: body.page_29,
            page_30: body.page_30,
            writes: body.writer
        })
        const savedBook = await newBook.save();

        return res.status(201).json({
          status: 201,
          message: httpStatusCode[201],
          data: {
            id: savedBook._id,
          },
        });
    } catch (error) {
        return next(error);
    }
}

export{gettAllBooks, getBookById, writeBook}