import { Router } from "express";
import { createCard, deleteCard, getCard, updateCard } from "../controllers/card.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.use(authMiddleware)

router.post("/",createCard);
router.get("/:listId",getCard);
router.patch("/:id",updateCard);
router.delete("/:id",deleteCard);

export default router;