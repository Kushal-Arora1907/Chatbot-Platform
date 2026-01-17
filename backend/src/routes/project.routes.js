import { PrismaClient } from "@prisma/client";
import express from "express";
import { auth } from "../middleware/auth.js";

const router = express.Router();
const prisma = new PrismaClient();

/**
 * CREATE PROJECT
 */
router.post("/", auth, async (req, res) => {
  const project = await prisma.project.create({
    data: {
      name: req.body.name,
      userId: req.userId,
    },
  });
  res.json(project);
});

/**
 * GET USER PROJECTS
 */
router.get("/", auth, async (req, res) => {
  const projects = await prisma.project.findMany({
    where: { userId: req.userId },
  });
  res.json(projects);
});

/**
 * GET SYSTEM PROMPT
 */
router.get("/:id/prompt", auth, async (req, res) => {
  const project = await prisma.project.findFirst({
    where: {
      id: req.params.id,
      userId: req.userId,
    },
    select: { systemPrompt: true },
  });

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  res.json(project);
});

/**
 * UPDATE SYSTEM PROMPT
 */
router.put("/:id/prompt", auth, async (req, res) => {
  const project = await prisma.project.update({
    where: {
      id: req.params.id,
      userId: req.userId,
    },
    data: {
      systemPrompt: req.body.systemPrompt,
    },
  });

  res.json(project);
});

export default router;
