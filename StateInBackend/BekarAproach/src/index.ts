import { LoggerFn } from "./logger";
import {GameManager } from "./store";
import os from "os"
import cluster from "cluster"
import express from "express"


const totalCpus = os.cpus().length;

if (cluster.isPrimary) {
    console.log(`totalCpus: ${totalCpus}`);

    for (let i = 0; i < totalCpus; i++) {
        cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} exited, starting a new one...`);
        cluster.fork();
    });
}
else{

    const app= express();
    app.use(express.json())
    LoggerFn()

    setInterval(() => {
        const id = String(Math.random() * 100)
        GameManager.getInstance().AddGame({ id: id, BlackPlayer: "alice", WhilePlayer: "bob", moves: [] })
        GameManager.getInstance().AddMoves(id, String(Math.floor(Math.random() * 100)));

    }, 5000)
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