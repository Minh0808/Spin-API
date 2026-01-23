"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const Voucher = {
    getVouchers: {
        tags: ["Vouchers"],
        description: "Lấy danh sách voucher",
        auth: true,
        responses: {
            default: { description: "Successful operation" },
        },
    },
    getVouchersByUser: {
        tags: ["Vouchers"],
        description: "Lấy voucher theo ID người dùng",
        auth: true,
        validate: {
            params: joi_1.default.object({
                idUser: joi_1.default.string().required()
            })
        },
        responses: {
            default: { description: "Successful operation" },
        },
    },
    createVoucher: {
        tags: ["Vouchers"],
        description: "Tạo mới voucher",
        auth: true,
        validate: {
            payload: joi_1.default.object({
                code: joi_1.default.string().required(),
                idUser: joi_1.default.string().required(),
                discount: joi_1.default.number().required(),
                expirationDate: joi_1.default.string().isoDate().required(),
                isActive: joi_1.default.boolean().optional(),
                quantity: joi_1.default.number().optional(),
                usedQuantity: joi_1.default.number().optional()
            })
        },
        responses: {
            default: { description: "Successful operation" },
        },
    },
    updateVoucher: {
        tags: ["Vouchers"],
        description: "Cập nhật voucher",
        auth: true,
        validate: {
            params: joi_1.default.object({
                id: joi_1.default.string().required()
            }),
            payload: joi_1.default.object({
                code: joi_1.default.string().optional(),
                idUser: joi_1.default.string().optional(),
                discount: joi_1.default.number().optional(),
                expirationDate: joi_1.default.string().isoDate().optional(),
                quantity: joi_1.default.number().optional(),
                usedQuantity: joi_1.default.number().optional()
            })
        },
        responses: {
            default: { description: "Successful operation" },
        },
    }
};
exports.default = Voucher;
