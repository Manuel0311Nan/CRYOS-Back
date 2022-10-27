import  express  from 'express';
import { isAuth } from '../../authentication/jwt.js';

import { getAllUsers, registerUser, loginUser, logoutUser, getUserById, editUser, deleteUser } from '../controllers/userController.js'
import { upload, uploadToCloudinary } from '../../middlewares/file.middleware.js';

//const isAuth = require('../../authentication/jwt');

const userRoutes = express.Router();

userRoutes.get("/:id", getUserById);
userRoutes.get('/', getAllUsers);

userRoutes.post('/', registerUser);
userRoutes.post('/login', loginUser);
userRoutes.post('/logout', logoutUser);

//userRoutes.put('/edit', [isAuth], editUser)
userRoutes.put('/edit', [isAuth, upload.single('image'), uploadToCloudinary], editUser)
userRoutes.delete('/:id', deleteUser);

export { userRoutes };