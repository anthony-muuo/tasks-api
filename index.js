import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
app.use(express.json());

const client = new PrismaClient();

app.get("/tasks", async (req, res) => {
  try {
    const allTasks = await client.tasks.findMany({
      where: { isDeleted: false },
    });
    res.status(200).json(allTasks);
  } catch (error) {
    res.status(500).json({ message: "failed to fetch all the tasks" });
  }
});

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
