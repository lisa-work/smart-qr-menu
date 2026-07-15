import "dotenv/config";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes";
import restoRoutes from "./routes/resto.routes";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/restaurant", restoRoutes);

// Other routes
app.use(errorHandler);

app.get("/", (req, res) => {
    res.send("Backend is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

export default app;