import { Router } from "express";
import { createCard, deleteCard, getCards, updateCard } from "../controllers/card.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/",authMiddleware,createCard);
router.get("/",authMiddleware,getCards);
router.patch("/:id",authMiddleware,updateCard);
router.delete("/:id",authMiddleware,deleteCard);

export default router;