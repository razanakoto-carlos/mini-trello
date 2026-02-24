import { Router } from "express";
import { createList, deleteList, getLists, updateList } from "../controllers/list.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/lists",authMiddleware,createList);
router.get("/boards/:boardId/lists",authMiddleware,getLists);
router.patch("lists/:id",authMiddleware,updateList);
router.delete("lists/:id",authMiddleware,deleteList);

export default router;