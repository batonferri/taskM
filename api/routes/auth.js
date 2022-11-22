import express from "express";
import { register, company, login, logout } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/company", company);
router.post("/login", login);
router.post("/logout", logout);

export default router;
