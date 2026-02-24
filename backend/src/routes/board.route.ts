import { Router } from "express";
import { createBoard, deleteBoard, getBoards, updateBoard } from "../controllers/board.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/",authMiddleware,createBoard);
router.get("/",authMiddleware,getBoards);
router.patch("/:id",authMiddleware,updateBoard);
router.delete("/:id",authMiddleware,deleteBoard);

export default router;