import express from "express";
import { updateCompanyInfo } from "../controllers/company.js";

const router = express.Router();

router.put("/", updateCompanyInfo);

export default router;
