import { Router } from "express";
import { createCard, deleteCard, getCard, updateCard } from "../controllers/card.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/",authMiddleware,createCard);
router.get("/:listId",authMiddleware,getCard);
router.patch("/:id",authMiddleware,updateCard);
router.delete("/:id",authMiddleware,deleteCard);

export default router;