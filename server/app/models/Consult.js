import { Schema, model } from "mongoose";

const consultSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    need: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mensaje: {
        type: String,
        required: true
    }
})

consultSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        //esta formula consigue que estos datos que aparecen con delete se borren de la información que se devuelve
        //y no se muestren
        delete returnedObject._id
        delete returnedObject._v

        delete returnedObject.passwordHash
    }
})
const Consult = model('Consult', consultSchema)

export {Consult}