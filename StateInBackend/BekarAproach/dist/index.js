"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("./logger");
const store_1 = require("./store");
const os_1 = __importDefault(require("os"));
const cluster_1 = __importDefault(require("cluster"));
const express_1 = __importDefault(require("express"));
const totalCpus = os_1.default.cpus().length;
if (cluster_1.default.isPrimary) {
    console.log(`totalCpus: ${totalCpus}`);
    for (let i = 0; i < totalCpus; i++) {
        cluster_1.default.fork();
    }
    cluster_1.default.on("exit", (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} exited, starting a new one...`);
        cluster_1.default.fork();
    });
}
else {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    (0, logger_1.LoggerFn)();
    setInterval(() => {
        const id = String(Math.random() * 100);
        store_1.GameManager.getInstance().AddGame({ id: id, BlackPlayer: "alice", WhilePlayer: "bob", moves: [] });
        store_1.GameManager.getInstance().AddMoves(id, String(Math.floor(Math.random() * 100)));
    }, 5000);
}
// setInterval(()=>{
//     game.push({
//         id: String(Math.random()*1000),
//         WhilePlayer: 'Alice',
//         BlackPlayer: "Bob",
//         moves:[]
//     })
// },5000)
// LoggerFn()
