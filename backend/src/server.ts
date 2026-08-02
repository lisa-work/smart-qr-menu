import "dotenv/config";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

import { authRoutes, restoRoutes, categoryRoutes, foodRoutes, menuRoutes, dashboardRoutes, qrRoutes } from "./routes";
import { errorHandler } from "./middlewares/error.middleware";
import { UPLOADS_DIR } from "./config/paths";

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
app.use("/api/foods", foodRoutes);
app.use("/api/menu", menuRoutes)
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/restaurant", qrRoutes);
app.use(
    "/uploads",
    express.static(UPLOADS_DIR)
);

// Backward compatibility for files saved before absolute upload path fix.
const legacyUploadsDir = path.resolve(process.cwd(), "uploads");
if (legacyUploadsDir !== UPLOADS_DIR) {
    app.use("/uploads", express.static(legacyUploadsDir));
}

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