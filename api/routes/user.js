import express from "express";
import { getUsers, updateUser, getUser } from "../controllers/user.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.put("/", updateUser);

export default router;
