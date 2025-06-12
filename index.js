import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
app.use(express.json());

const client = new PrismaClient();

app.get("/", (_req, res) => {
  res.send("Welcome to the Tasks Api endpoint");
});

app.get("/tasks", async (_req, res) => {
  try {
    const allTasks = await client.tasks.findMany({
      where: { isDeleted: false },
    });
    res.status(200).json(allTasks);
  } catch (error) {
    res.status(500).json("failed to fetch all the tasks");
  }
});

app.post("/tasks", async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTask = await client.tasks.create({
      data: {
        title,
        description,
      },
    });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json("failed to post to the db");
  }
});

app.get("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const findSpecificTask = await client.tasks.findUnique({
      where: { id: +id },
    });
    res.status(200).json(findSpecificTask);
  } catch (error) {
    res.status(500).json("failed to get this specific task");
  }
});

app.patch("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const updateTasks = await client.tasks.update({
      where: { id: +id },
      data: {
        title: title && title,
        description: description && description,
      },
    });
    res.status(200).json(updateTasks);
  } catch (error) {
    res.status(500).json("failed to update this specific task");
  }
});

app.patch("/tasks/:id/delete", async (req, res) => {
  try {
    const { id } = req.params;
    const removed = await client.tasks.update({
      where: { id: +id },
      data: { isDeleted: true },
    });
    res.status(200).json(removed);
  } catch (error) {
    res.status(500).json("failed to update this specific task");
  }
});

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
