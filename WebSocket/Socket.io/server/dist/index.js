"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "*",
    credentials: true
}));
app.use(express_1.default.json());
const httpServer = http_1.default.createServer(app);
const UserData = [];
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "*",
        credentials: true
    }
});
app.get("/", (req, res) => {
    res.json({ new: "user" });
});
io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);
    socket.on("message", (event) => {
        console.log("User event:", event);
        UserData.push({ data: event.data, user: socket.id });
        io.emit("message", UserData);
    });
    socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
    });
});
httpServer.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
