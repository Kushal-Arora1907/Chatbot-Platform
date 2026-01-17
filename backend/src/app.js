import cors from "cors";
import express from "express";
import authRoutes from "./routes/auth.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import projectRoutes from "./routes/project.routes.js";

const app = express();

// ✅ SIMPLE & SAFE CORS (WORKS ON NODE 22 + RENDER)
app.use(cors());

app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/projects", projectRoutes);
app.use("/chat", chatRoutes);

// Health check (VERY IMPORTANT for Render)
app.get("/", (req, res) => {
  res.send("Backend is running");
});

export default app;
