import { Router } from "express";
import { createCard, deleteCard, getCards } from "../controllers/card.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/",authMiddleware,createCard);
router.get("/",authMiddleware,getCards);
router.delete("/:id",authMiddleware,deleteCard);

export default router;