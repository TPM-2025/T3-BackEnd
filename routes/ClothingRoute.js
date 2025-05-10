import express from "express";
import {
  getClothes,
  createClothing,
  updateClothing,
  deleteClothing,
  getClothingById,
} from "../controllers/ClothingController.js";

const router = express.Router();

router.get("/clothes", getClothes);
router.get("/clothes/:id", getClothingById);
router.post("/clothes", createClothing);
router.put("/clothes/:id", updateClothing);
router.delete("/clothes/:id", deleteClothing);

export default router;
