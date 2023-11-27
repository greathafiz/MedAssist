import express from "express";
import { fetchUser } from "../controllers/user.js";
import verifyUser from "../middleware/verifyUser.js";
const router = express.Router();

router.get('/', verifyUser, fetchUser)

export { router as patientsRouter };
