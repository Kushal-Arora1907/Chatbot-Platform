import cors from "cors";
import express from "express";
import authRoutes from "./routes/auth.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import projectRoutes from "./routes/project.routes.js";

const app = express();

// ✅ CORS CONFIG (VERCEL + RENDER SAFE)
app.use(
  cors({
    origin: [
      "http://localhost:5173", // local dev
      "https://chatbot-platform-mu.vercel.app/", // 👈 CHANGE to your Vercel URL
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// ✅ Handle preflight explicitly
app.options("*", cors());

app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/projects", projectRoutes);
app.use("/chat", chatRoutes);

export default app;
