import WebSocket, { WebSocketServer } from "ws";
import express from "express";
import http from "http";

// Create an Express application
const app = express();

// Define a simple route for HTTP requests
app.get('/', (req, res) => {
    res.send("Hello from Express server");
});

// Create an HTTP server from the Express app
const server = http.createServer(app);

// Set up the WebSocket server
const wss = new WebSocketServer({ server });

wss.on("connection", function connection(ws) {
 
    ws.on("error", console.error);

    ws.on('message', function message(data, isBinary) {
        // Broadcast the message to all clients
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data, { binary: isBinary });
            }
        });
    });

    // Send a message to the client when connected
    ws.send('Hello from WebSocket');
});

// Start the HTTP and WebSocket server
server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
