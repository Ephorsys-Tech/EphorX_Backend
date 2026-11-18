
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import router from "./routes/index.js";

const app = express();

// CORS Configuration
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:4173",
    "https://ephor-x-frontend.vercel.app",
];

app.use(
    cors({
        origin: allowedOrigins,
        credentials: true,
    })
);

// Body Parser
app.use(express.json({ limit: "20mb" }));

app.use(
    express.urlencoded({
        extended: true,
        limit: "20mb",
    })
);

// Cookie Parser
app.use(cookieParser());

// Logger
app.use(morgan("dev"));

// API Routes
app.use("/api/auth", router);

export default app;
