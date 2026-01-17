import express from "express";
import authRoutes from "./routes/auth.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import projectRoutes from "./routes/project.routes.js";

const app = express();

/**
 * 🔒 HARD CORS FIX (Render + Node 22 SAFE)
 */
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS",
  );
  next();
});

/**
 * ✅ EXPLICIT OPTIONS HANDLER (REGEX — NOT "*")
 */
app.options(/.*/, (req, res) => {
  return res.sendStatus(200);
});

app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/projects", projectRoutes);
app.use("/chat", chatRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("Backend is running");
});

export default app;
