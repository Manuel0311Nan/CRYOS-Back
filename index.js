import  express  from "express";
import 'dotenv/config';
import cors from "cors";
import { userRoutes } from "./server/app/routes/user.routes.js";
import { bookRoutes } from "./server/app/routes/book.routes.js";
import { connection } from "./server/config/database.js"
import { consultRoutes } from "./server/app/routes/consult.routes.js";

connection();

const PORT = process.env.PORT;
const router = express.Router();
const server = express();

server.set("secretKey", "nodeRestApi");

//headers setups
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

//--------------------------------------------------------------------------------------------------------------------//
//?Con el asterisco se permite entrar en cualquier ruta de la web,
//? Se podría delimitar la url a la que se quiere acceder
server.use(cors("*"));

//ROUTES
router.get('/', (req, res) => {
    res.send('Server running OK')
});

server.use('/', router);
server.use("/users", userRoutes);
server.use("/books", bookRoutes);
server.use("/consults", consultRoutes);

const serverListen = server.listen(PORT, () => {
    console.log(`Node server listening on port http:${PORT}`)
})

//-----------------Posibilidad de utilizar socket--------------------------------//

// const io = new Server(serverListen, {
//     cors: {
//         origin: "*",
//         credentials: true,
//     },
// });

// global.onlineUsers = new Map();
// io.on("connection", (socket) => {
//     // console.log(socket.id);
//     global.chatSocket = socket;
//     socket.on("add-user", (userId) => {
//         onlineUsers.set(userId, socket.id);
//     });
    
//     socket.on("send-msg", (msg, from ) => {
//         // console.log(from, msg.message);
//         const sendUserSocket = onlineUsers.get(msg.to);
//         if (sendUserSocket) {
//             socket.to(sendUserSocket).emit("msg-recieve", msg.message, from);
//         }
//     });
// });