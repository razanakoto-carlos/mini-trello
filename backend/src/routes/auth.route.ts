import { Router } from "express";
import { login, logout, register } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.js";
import { loginSchema, registerSchema } from "../validations/authSchema.js";

const router = Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/logout", authMiddleware, logout);

export default router;
