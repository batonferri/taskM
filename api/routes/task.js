import express from "express";
import {
  getTasks,
  addTask,
  startTask,
  getTask,
  closeTask,
} from "../controllers/task.js";

const router = express.Router();

router.get("/", getTasks);
router.get("/:id", getTask);
router.post("/", addTask);
router.put("/start/:id", startTask);
router.put("/close/:id", closeTask);
// router.delete("/:id", deleteTask);
// router.put("/:id", updateTask);

export default router;
