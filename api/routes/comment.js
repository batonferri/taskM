import express from "express";
import { getComments, addComment } from "../controllers/comment.js";

const router = express.Router();

router.get("/:id", getComments);
router.post("/", addComment);

export default router;
