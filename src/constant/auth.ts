import Joi from "joi";

const Auth = {
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

  updateUser: {
    tags: ["Auth"],
    description: "Cập nhật thông tin người dùng",
    auth: true,
    validate: {
      params: Joi.object({
        id: Joi.string().required()
      }),
      payload: Joi.object({
        phone: Joi.string().min(10).max(15).optional().example(""),
        name: Joi.string().min(2).optional().example(""),
        email: Joi.string().email().optional().example(""),
        password: Joi.string().min(1).optional().example(""),
        role: Joi.string().valid("user", "admin").optional().example(""),
        rotationTimes: Joi.number().optional(),
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
    description: "Lấy thông tin người dùng",
    auth: true,
    responses: {
      default: { description: "Successful operation" },
    },
  },
};

export default Auth;