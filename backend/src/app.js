import express from "express";
import authRoutes from "./routes/auth.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import projectRoutes from "./routes/project.routes.js";

const app = express();

/**
 * ✅ MANUAL CORS (BULLETPROOF)
 */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

  // ✅ Handle preflight immediately
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
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
