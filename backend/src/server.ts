import "dotenv/config";

import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import restoRoutes from "./routes/resto.routes";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();

app.use(cors());
app.use(express.json());
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