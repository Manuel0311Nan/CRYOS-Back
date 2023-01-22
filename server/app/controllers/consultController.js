import { Consult } from "../models/Consult.js";
import { httpStatusCode } from "../../utils/seeds/httpStatusCode.js";

const getAllConsult = async (req, res, next) => {
    try {
        const consults = await Consult.find().populate("need");
        return res.status(200).json(consults)
    } catch (error) {
        return next(error)
    }
};

const writeConsult = async (req, res, next) => {
    try {
        const { body } = req
        const newConsult = new Consult({
            nombre: body.nombre,
            need: body.need,
            email: body.email,
            mensaje: body.mensaje
        });
        const saveConsult = await newConsult.save();
        return res.status(201).json({
            status: 201,
            message: httpStatusCode[201],
            data: {
                id: saveConsult._id,
            },
        });
    } catch (error) {
        return next(error);
    }
}
export { writeConsult, getAllConsult}