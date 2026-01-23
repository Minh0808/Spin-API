import { Router } from "express";
import { getProfile, login, logout, register, updateUser } from "../controllers/authController";
import { authMiddleware } from "../middlewares/authMiddleware";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", authMiddleware, logout);
authRouter.get("/profile", authMiddleware, getProfile);
authRouter.put("/profile-update/:id", authMiddleware, updateUser);

export default authRouter;
