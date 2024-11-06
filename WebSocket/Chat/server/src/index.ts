import express from "express";
import WebSocket, { WebSocketServer } from "ws";
import http from "http";
import cors from "cors";

import { PrismaClient } from "@prisma/client";
import { AddUser } from "./seed";

export const PClient = new PrismaClient()

AddUser()

const app = express();
const httpServer = http.createServer(app);
app.use(cors());



interface ClientData {
    ws: ExtendedWebSocket;
    messageQueue: string[];
}

interface ExtendedWebSocket extends WebSocket {
    userId?: string;
}

app.get("/user", async (req, res) => {
    const user = await PClient.user.findMany({})
    res.json({ user: user });
})

const wss = new WebSocketServer({ server: httpServer });


const clients = new Map<string, ClientData>();


wss.on("connection", (ws: ExtendedWebSocket, req) => {

    const user = req.headers.cookie?.split("=")[1]


    if (user) {

        const userId = user;
        const ex = clients.get(userId)
        if (!ex) {
            clients.set(userId, { ws, messageQueue: [] });

            ws.userId = userId;
            
            
        }
        



        const clientData = clients.get(userId);
        if (clientData?.messageQueue.length) {
            clientData.messageQueue.forEach((message) => ws.send(message));
            clientData.messageQueue = [];
        }
        ws.send(JSON.stringify({ type: "userId", userId }));
        ws.on("message", (message) => {
            try {
                const parsedMessage = JSON.parse(message.toString());
                if (parsedMessage.event !== "connection") {


                    const { targetId, content } = parsedMessage;

                    if (targetId && clients.has(String(targetId))) {
                        const targetClientData = clients.get(String(targetId));
                        if (targetClientData?.ws.readyState === WebSocket.OPEN) {

                            targetClientData.ws.send(JSON.stringify({ from: userId, content }));
                        } else {

                            targetClientData?.messageQueue.push(JSON.stringify({ from: userId, content }));
                        }

                        ws.send(JSON.stringify({ from: userId, to: targetId, content }));
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
            clients.delete(String(userId));
        });

        ws.on("error", (err) => {
            console.error("WebSocket error:", err);
        });
    }
});

httpServer.listen(8000, () => {
    console.log("App listening on port 8000");
});
