// Top-level routes go here
import express from "express";
import { dashboardController } from "../controllers/index.js";
import verifyUser from "../middleware/verifyUser.js";
const router = express.Router();

// Dashboard route
router.get("/dashboard", verifyUser, dashboardController);

export { router as indexRouter };
