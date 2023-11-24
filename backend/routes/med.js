import express from "express";
import { addMed, fetchAllMeds, fetchMed, updateMed, deleteMed } from "../controllers/med.js";
const router = express.Router();

// Dashboard route
router.route('/').get(fetchAllMeds).post(addMed)
router.route('/:id').get(fetchMed).put(updateMed).delete(deleteMed)

export { router as medRouter };