import "dotenv/config";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { authRoutes, restoRoutes, categoryRoutes } from "./routes";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/restaurant", restoRoutes);
app.use("/api/categories", categoryRoutes);

// Other routes
app.use(errorHandler);

// Health check route
app.get("/", (req, res) => {
    res.send("Backend is running");
});

// Start the server
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

export default app;