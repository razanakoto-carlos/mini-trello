import { Router } from "express";
import {
  createBoard,
  deleteBoard,
  getBoards,
  updateBoard,
  getBoard,
} from "../controllers/board.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.js";
import {
  createBoardSchema,
  updateBoardSchema,
} from "../validations/boardSchema.js";

const router = Router();

router.use(authMiddleware);

router.get("/", getBoards);
router.get("/:boardId", getBoard);
router.post("/", validate(createBoardSchema), createBoard);
router.patch("/:id", validate(updateBoardSchema), updateBoard);
router.delete("/:id", deleteBoard);

export default router;
