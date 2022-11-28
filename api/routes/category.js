import express from "express";
import {
  getCategories,
  deleteCategory,
  addCategory,
} from "../controllers/category.js";

const router = express.Router();

router.get("/", getCategories);
router.post("/", addCategory);
router.delete("/", deleteCategory);

export default router;
