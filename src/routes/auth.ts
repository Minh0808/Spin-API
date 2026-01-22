import Joi from "joi";

export const authSwagger = {
  register: {
    tags: ["Auth"],
    description: "tạo mới user",
    auth: false,
    validate: {
      payload: Joi.object({
        phone: Joi.string().min(10).max(15).required(),
        name: Joi.string().min(2).required(),
        email: Joi.string().email().required(),
        role: Joi.string().valid("user", "admin").required(),
        password: Joi.string().min(1).required(),
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
        phone: Joi.string().min(10).max(15).required(),
        password: Joi.string().required(),
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
    description: "Lấy thông tin người dùng",
    auth: true,
    responses: {
      default: { description: "Successful operation" },
    },
  },
};
