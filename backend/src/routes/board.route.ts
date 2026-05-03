import { Router } from "express";
import { createBoard, deleteBoard, getBoards, updateBoard } from "../controllers/board.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.use(authMiddleware)

router.post("/",createBoard);
router.get("/",getBoards);
router.patch("/:id",updateBoard);
router.delete("/:id",deleteBoard);

export default router;