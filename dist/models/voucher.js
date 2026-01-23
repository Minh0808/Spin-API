"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const VoucherSchema = new mongoose_1.default.Schema({
    code: { type: String, required: true },
    idUser: { type: String, required: true },
    discount: { type: Number, required: true },
    expirationDate: { type: Date, required: true },
    isActive: { type: Boolean, required: true, default: false },
    quantity: { type: Number, required: true, default: 1 },
    usedQuantity: { type: Number, required: true, default: 0 },
});
const vouchers = mongoose_1.default.model("Voucher", VoucherSchema);
exports.default = vouchers;
