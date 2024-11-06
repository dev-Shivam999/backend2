import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";  

const app = express();

app.use(cors({
    origin: "*", 
    credentials: true
}));

app.use(express.json());
const httpServer = http.createServer(app);

interface Chat {
    data: string,
    user: string
}
const UserData: Chat[] = []
const io = new Server(httpServer, {
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
        UserData.push({data:event.data,user:socket.id})
       
        
        io.emit("message", UserData);
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
    });
});

httpServer.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
