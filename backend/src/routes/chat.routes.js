import { PrismaClient } from "@prisma/client";
import express from "express";
import { auth } from "../middleware/auth.js";
import { openai } from "../utils/openai.js";

const router = express.Router();
const prisma = new PrismaClient();

/**
 * GET CHAT HISTORY
 */
router.get("/:projectId", auth, async (req, res) => {
  const messages = await prisma.chatMessage.findMany({
    where: { projectId: req.params.projectId },
    orderBy: { createdAt: "asc" },
  });

  res.json(messages);
});

/**
 * STREAM CHAT
 */
router.post("/:projectId", auth, async (req, res) => {
  const { projectId } = req.params;
  const { message } = req.body;

  const project = await prisma.project.findFirst({
    where: {
      id: projectId,
      userId: req.userId,
    },
  });

  if (!project) {
    return res.status(403).json({ message: "Access denied" });
  }

  await prisma.chatMessage.create({
    data: {
      role: "user",
      content: message,
      projectId,
    },
  });

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.flushHeaders();

  let assistantText = "";

  const completion = await openai.chat.completions.create({
    model: "mistralai/mistral-7b-instruct",
    messages: [
      { role: "system", content: project.systemPrompt },
      { role: "user", content: message },
    ],
    stream: true,
  });

  for await (const chunk of completion) {
    const delta = chunk.choices?.[0]?.delta?.content;
    if (delta) {
      assistantText += delta;
      res.write(delta);
    }
  }

  await prisma.chatMessage.create({
    data: {
      role: "assistant",
      content: assistantText,
      projectId,
    },
  });

  res.end();
});

export default router;
