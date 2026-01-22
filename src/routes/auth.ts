import { Router } from "express";
import Joi from "joi";
import { getProfile, login, logout, register } from "../controllers/authController";
import { authMiddleware } from "../middlewares/authMiddleware";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", authMiddleware, logout);
authRouter.get("/profile", authMiddleware, getProfile);

export const authDocs = {
  register: {
    tags: ["Auth"],
    description: "tạo mới user",
    auth: false,
    validate: {
      payload: Joi.object({
        phone: Joi.string().min(10).max(15).required().example(""),
        name: Joi.string().min(2).required().example(""),
        email: Joi.string().email().required().example(""),
        role: Joi.string().valid("user", "admin").required().example(""),
        password: Joi.string().min(1).required().example(""),
      }),
    },
    responses: {
      default: { description: "Successful operation" },
    },
  },

  login: {
    tags: ["Auth"],
    description: "Đăng nhập người dùng",
    auth: false,
    validate: {
      payload: Joi.object({
        phone: Joi.string().min(10).max(15).required().example(""),
        password: Joi.string().required().example(""),
      }),
    },
    responses: {
      default: { description: "Successful operation" },
    },
  },

  logout: {
    tags: ["Auth"],
    description: "Đăng xuất người dùng",
    auth: true,
    responses: {
      default: { description: "Successful operation" },
    },
  },

  getProfile: {
    tags: ["Auth"],
    description: "Lay thong tin nguoi dung",
    auth: true,
    responses: {
      default: { description: "Successful operation" },
    },
  },
};

export default authRouter;
