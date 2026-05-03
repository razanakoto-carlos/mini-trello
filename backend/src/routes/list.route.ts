import { Router } from "express";
import { createList, deleteList, getLists, updateList } from "../controllers/list.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.use(authMiddleware)

router.post("/lists",createList);
router.get("/boards/:boardId/lists",getLists);
router.patch("lists/:id",updateList);
router.delete("lists/:id",deleteList);

export default router;