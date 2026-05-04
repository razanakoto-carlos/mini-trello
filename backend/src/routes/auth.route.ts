import { Router } from "express";
import { authenticate, login, logout, register } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.js";
import { loginSchema, registerSchema } from "../validations/authSchema.js";

const router = Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.get("/me", authMiddleware, authenticate);
router.post("/logout", authMiddleware, logout);

export default router;
