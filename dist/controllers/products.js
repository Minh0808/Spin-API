"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProduct = exports.getProducts = void 0;
const products_1 = __importDefault(require("../models/products"));
const getProducts = async (req, res) => {
    try {
        const products = await products_1.default.find();
        res.json({ success: true, data: products });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
exports.getProducts = getProducts;
const createProduct = async (req, res) => {
    try {
        const { name, image, price, sellPrice, description, inStock } = req.body;
        const product = new products_1.default({
            name,
            image,
            price,
            sellPrice,
            description,
            inStock,
        });
        await product.save();
        res.status(200).json({ success: true, data: product });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
exports.createProduct = createProduct;
