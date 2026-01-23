"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const Auth = {
    register: {
        tags: ["Auth"],
        description: "tạo mới user",
        auth: true,
        validate: {
            payload: joi_1.default.object({
                phone: joi_1.default.string().min(10).max(15).required().example(""),
                name: joi_1.default.string().min(2).required().example(""),
                email: joi_1.default.string().email().required().example(""),
                role: joi_1.default.string().valid("user", "admin").required().example(""),
                password: joi_1.default.string().min(1).required().example(""),
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
            params: joi_1.default.object({
                id: joi_1.default.string().required()
            }),
            payload: joi_1.default.object({
                phone: joi_1.default.string().min(10).max(15).optional().example(""),
                name: joi_1.default.string().min(2).optional().example(""),
                email: joi_1.default.string().email().optional().example(""),
                password: joi_1.default.string().min(1).optional().example(""),
                role: joi_1.default.string().valid("user", "admin").optional().example(""),
                rotationTimes: joi_1.default.number().optional(),
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
            payload: joi_1.default.object({
                phone: joi_1.default.string().min(10).max(15).required().example(""),
                password: joi_1.default.string().required().example(""),
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
exports.default = Auth;
