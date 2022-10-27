import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    username: {
        type: String,
        required: true
	},
    name: {
        type: String,
        required: true
	},
    password: {
        type: String,
        required: true
	},
    email: {
        type: String,
        required: true
	},
    books: [{
        type: Schema.Types.ObjectId,
        ref:'Book'
    }]
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        //esta formula consigue que estos datos que aparecen con delete se borren de la información que se devuelve
        //y no se muestren
        delete returnedObject._id
        delete returnedObject._v

        delete returnedObject.passwordHash
    }
})

const User = model('User', userSchema)


export { User }
