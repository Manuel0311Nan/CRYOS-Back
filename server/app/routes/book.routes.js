import  express  from "express";
import { gettAllBooks, getBookById, writeBook } from "../controllers/bookController.js";

const bookRoutes = express.Router();

bookRoutes.get('/', gettAllBooks);
bookRoutes.get("/:id", getBookById);

bookRoutes.post('/create3a4great5book', writeBook)

export { bookRoutes }