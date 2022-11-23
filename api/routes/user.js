import express from "express";
import { getUsers, updateUser } from "../controllers/user.js";

const router = express.Router();

router.get("/", getUsers);
router.put("/", updateUser);

export default router;
