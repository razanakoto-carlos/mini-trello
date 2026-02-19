import { Router } from "express";
import { createBoard, deleteBoard, getBoards } from "../controllers/board.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/",authMiddleware,createBoard);
router.get("/",authMiddleware,getBoards);
router.delete("/:id",authMiddleware,deleteBoard);

export default router;