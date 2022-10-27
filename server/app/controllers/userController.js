import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import  jwt  from "jsonwebtoken";
import {httpStatusCode} from "../../utils/seeds/httpStatusCode.js"


const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().populate("name");
    return res.status(200).json(users);
  } catch (error) {
    return next(error);
  }
};

const registerUser = async (req, res, next) => {
  try {
    const { body } = req;

    const previousUser = await User.findOne({ email: body.email });

    if (previousUser) {
      const error = new Error("This email exists in the galaxy!");
      return next(error);
    }

    // Encriptar password
    const pwdHash = await bcrypt.hash(body.password, 10);

    // Crear usuario en DB
    const newUser = new User({
      name: body.name,
      username: body.username,
      email: body.email,
      password: pwdHash,
      books: [],
    });

    const savedUser = await newUser.save();

    return res.status(201).json({
      status: 201,
      message: httpStatusCode[201],
      data: {
        id: savedUser._id,
      },
    });
  } catch (error) {
    return next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { body } = req;

    // Comprobar email
    const user = await User.findOne({ email: body.email });

    // Comprobar password
    const isValidPassword = await bcrypt.compare(
      body.password,
      user?.password ?? ""
    );
    // Control de LOGIN
    if (!user || !isValidPassword) {
      const error = {
        status: 401,
        message: "This combination doesn't exist in the galaxy",
      };
      return next(error);
    }
    // TOKEN JWT
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      req.app.get("secretKey"),
      { expiresIn: "3h" }
    );

    return res.json({
      status: 200,
      message: httpStatusCode[200],
      data: {
        user: user._id,
        email: user.email,
        token: token,
      },
    });
  } catch (error) {
    return next(error);
  }
};
const logoutUser = async (req, res, next) => {

    try {
      req.authority = null;
      return res.json({
        status: 200,
        message: 'Come back soon!',
        token: null
      })
    } catch (error) {
      next(error)
    }
  
};
const getUserById = async (req, res, next) => {

    const { id } = req.params;
    try {
  
      const userbyid = await User.findById(id)
        .select({ password: 0 });
      return res.status(200).json(userbyid);
  
    } catch (error) {
      return next(error)
    }
  };
  const editUser = async (req, res, next) => {

    const userPhoto = req.file_url;// me traigo la url de la foto
    const bodyData = req.body;
  
    if (userPhoto) { bodyData.image = userPhoto }
    const { id: userId } = req.authority;
  
    try {
      const user = await User.findById(userId)
      const userModify = new User(bodyData);
  
      //Para evitar que se modifique el id de mongo:
      userModify._id = userId;
      userModify.contacts = user.contacts;
      // userModify.contacts = [...user.contacts]
      userModify.applied_jobs = user.applied_jobs;
      // userModify.applied_jobs = [...user.applied_jobs]
      //buscamos por el id y le pasamos los campos a modificar
      await User.findByIdAndUpdate(userId, userModify);
  
      //retornamos respuesta de  los datos del objeto creado 
      return res.json({
        status: 200,
        message: httpStatusCode[200],
        data: { user: userModify },
      });
    } catch (error) {
      return next(error);
    }
  };
  const deleteUser = async (req, res, next) => {
    try {
      const { id } = req.params;
      const userDelete = await User.findByIdAndDelete(id);
      return res.json({
        status: 200,
        message: httpStatusCode[200],
        data: { user: userDelete },
      });
    } catch (error) {
      return next(error);
    }
  };


export { getAllUsers, registerUser, loginUser, logoutUser, getUserById, editUser, deleteUser}
