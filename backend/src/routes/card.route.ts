import { Router } from "express";
import {
  createCard,
  deleteCard,
  getCards,
  updateCard,
} from "../controllers/card.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.js";
import {
  createCardSchema,
  updateCardSchema,
} from "../validations/cardSchema.js";

const router = Router();

router.use(authMiddleware);

router.get("/:listId", getCards);
router.post("/", validate(createCardSchema), createCard);
router.patch("/:id", validate(updateCardSchema), updateCard);
router.delete("/:id", deleteCard);

export default router;
