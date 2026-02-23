import { Router } from "express";
import { createList, deleteList, getLists } from "../controllers/list.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/lists",authMiddleware,createList);
router.get("/boards/:boardId/lists",authMiddleware,getLists);
router.delete("lists/:id",authMiddleware,deleteList);

export default router;