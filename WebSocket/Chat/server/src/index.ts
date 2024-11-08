import express, { json, Request, Response } from "express";
import WebSocket, { WebSocketServer } from "ws";
import http from "http";
import cors from "cors";

import { PrismaClient } from "@prisma/client";
import { AddUser } from "./seed";

export const PClient = new PrismaClient()

AddUser()

const app = express();
const httpServer = http.createServer(app);
app.use(cors(
    {
        credentials: true,
        origin: "http://localhost:5173"
    }
));
app.use(express.json())



interface ClientData {
    ws: ExtendedWebSocket;
    messageQueue: string[];
    ChatId: string;
}

interface ExtendedWebSocket extends WebSocket {
    userId?: string;
    chatId: string;
}

app.get("/user", async (req: Request, res: Response) => {
    const user = await PClient.user.findMany({})
    res.json({ user: user });
})

app.post("/Login", async (req: Request, res: Response) => {
    const id = req.body
    res.cookie("token", id.login, {
        httpOnly: true,
        sameSite: true,
        maxAge: 1000 * 60 * 60 * 24
    });
    res.json("lovl")


})
const wss = new WebSocketServer({ server: httpServer });


const clients = new Map<string, ClientData>();
const ChatHistory = new Map<{send:string,get:string}, string[]>();


wss.on("connection", (ws: ExtendedWebSocket, req) => {

    const user = req.headers.cookie?.split("=")[1]

    console.log("user connect");


    if (user) {

        const userId = user;
        const ex = clients.get(userId)
        
        if (!ex) {
            const ChatId=userId;
            clients.set(userId, { ws, ChatId, messageQueue: [] });

            ws.userId = userId;
            ws.chatId = ChatId;


        }
        else {

            ex.ws = ws;
            ws.userId = userId;
            ws.chatId = userId




            if (ex.messageQueue.length) {
                ex.messageQueue.forEach((message) => ws.send(JSON.stringify({ event: "not", data: message })));


                ex.messageQueue = [];

            }
        }
        ws.send(JSON.stringify({ event: "userId", userId }));
        ws.on("message", (message) => {
            try {
                
                const parsedMessage = JSON.parse(message.toString());
                if (parsedMessage.event !== "connection") {
                    console.log(parsedMessage);

                    if (parsedMessage.event == "history") {
                        
                        ChatHistory.get({ get: ws.chatId ,send:parsedMessage.userId})
                            ?.forEach((message) => ws.send(JSON.stringify({ event: "message", data: message })));

                    }

                    const { targetId, content } = parsedMessage;

                    if (targetId && clients.has(String(targetId))) {

                        const targetClientData = clients.get(String(targetId));
                        const ChatId = clients.get(String(targetId))?.ChatId
                        if (ChatId) {

                            ChatHistory.set({ get: String(ws.userId), send: targetId }, [...(ChatHistory.get({ get: String(ws.userId), send:targetId }) || []), content]);
                        }
                        if (targetClientData?.ws.readyState === WebSocket.OPEN) {

                            targetClientData.ws.send(JSON.stringify({ event: "message", from: userId, data: content }));
                        } else {

                            targetClientData?.messageQueue.push(JSON.stringify({ from: userId, content }));
                        }

                        ws.send(JSON.stringify({ event: "message", from: userId, to: targetId, content }));
                    } else {
                        console.log("No valid target found or targetId not specified.");
                    }
                }
            } catch (err) {
                console.error("Error handling message:", err);
                ws.send(JSON.stringify({ error: "Invalid message format" }));
            }
        });


        ws.on("close", () => {
            console.log("User disconnected");
        });

        ws.on("error", (err) => {
            console.error("WebSocket error:", err);
        });
    }
});

httpServer.listen(8000, () => {
    console.log("App listening on port 8000");
});
