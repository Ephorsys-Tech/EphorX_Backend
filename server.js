
import "dotenv/config";

import dns from "dns";
import http from "http";

import app from "./src/app.js";
import { Server } from "socket.io";
import connectToDb from "./src/db/db.js";

// DNS Configuration
dns.setServers(["8.8.8.8", "8.8.4.4"]);

// PORT
const PORT = process.env.PORT || 5500;

// HTTP Server
const server = http.createServer(app);

// SOCKET.IO
export const io = new Server(server, {
    cors: {
        origin: [
            "http://localhost:5173",
            "http://localhost:4173",

            // Production Frontend
            "https://ephorx.com",
            "https://www.ephorx.com",
        ],
        credentials: true,
        methods: ["GET", "POST"],
    },
});

// SOCKET CONNECTION
io.on("connection", (socket) => {
    console.log("Socket Connected:", socket.id);

    socket.on("disconnect", () => {
        console.log("Socket Disconnected:", socket.id);
    });
});

// START SERVER
const startServer = async () => {
    try {
        await connectToDb();

        server.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error("Server startup failed:", error.message);
        process.exit(1);
    }
};

startServer();
