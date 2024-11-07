"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PClient = void 0;
const express_1 = __importDefault(require("express"));
const ws_1 = __importStar(require("ws"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const seed_1 = require("./seed");
exports.PClient = new client_1.PrismaClient();
(0, seed_1.AddUser)();
const app = (0, express_1.default)();
const httpServer = http_1.default.createServer(app);
app.use((0, cors_1.default)({
    credentials: true,
    origin: "http://localhost:5173"
}));
app.use(express_1.default.json());
app.get("/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield exports.PClient.user.findMany({});
    res.json({ user: user });
}));
app.post("/Login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body;
    res.cookie("token", id.login, {
        httpOnly: true,
        sameSite: true,
        maxAge: 1000 * 60 * 60 * 24
    });
    res.json("lol");
}));
const wss = new ws_1.WebSocketServer({ server: httpServer });
const clients = new Map();
wss.on("connection", (ws, req) => {
    var _a;
    const user = (_a = req.headers.cookie) === null || _a === void 0 ? void 0 : _a.split("=")[1];
    console.log("user connect");
    if (user) {
        const userId = user;
        const ex = clients.get(userId);
        if (!ex) {
            clients.set(userId, { ws, messageQueue: [] });
            ws.userId = userId;
        }
        else {
            ex.ws = ws;
            ws.userId = userId;
            if (ex.messageQueue.length) {
                ex.messageQueue.forEach((message) => ws.send(message));
                ex.messageQueue = [];
            }
        }
        ws.send(JSON.stringify({ type: "userId", userId }));
        ws.on("message", (message) => {
            try {
                const parsedMessage = JSON.parse(message.toString());
                if (parsedMessage.event !== "connection") {
                    const { targetId, content } = parsedMessage;
                    if (targetId && clients.has(String(targetId))) {
                        const targetClientData = clients.get(String(targetId));
                        if ((targetClientData === null || targetClientData === void 0 ? void 0 : targetClientData.ws.readyState) === ws_1.default.OPEN) {
                            targetClientData.ws.send(JSON.stringify({ from: userId, content }));
                        }
                        else {
                            console.log("gaya");
                            targetClientData === null || targetClientData === void 0 ? void 0 : targetClientData.messageQueue.push(JSON.stringify({ from: userId, content }));
                        }
                        ws.send(JSON.stringify({ from: userId, to: targetId, content }));
                    }
                    else {
                        console.log("No valid target found or targetId not specified.");
                    }
                }
            }
            catch (err) {
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
