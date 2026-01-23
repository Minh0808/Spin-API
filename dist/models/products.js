"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ProductSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    sellPrice: { type: Number, required: false, default: 0 },
    description: { type: String, required: true },
    inStock: { type: Boolean, required: true, default: true },
});
const products = mongoose_1.default.model("Product", ProductSchema);
exports.default = products;
