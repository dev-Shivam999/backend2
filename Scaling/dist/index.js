"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cluster_1 = __importDefault(require("cluster"));
const os_1 = __importDefault(require("os"));
const PORT = 3000;
const totalCpus = os_1.default.cpus().length;
if (cluster_1.default.isPrimary) {
    console.log(`totalCpus: ${totalCpus}`);
    for (let i = 0; i < totalCpus; i++) {
        cluster_1.default.fork();
    }
    cluster_1.default.on("exit", (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} is running`);
        cluster_1.default.fork();
    });
}
else {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.get('/', (req, res) => {
        res.json({ lol: process.pid });
    });
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}
