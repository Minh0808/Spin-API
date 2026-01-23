"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_1 = require("../controllers/products");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const productsRouter = (0, express_1.Router)();
productsRouter.get("/products-list", authMiddleware_1.authMiddleware, products_1.getProducts);
productsRouter.post("/products", authMiddleware_1.authMiddleware, products_1.createProduct);
exports.default = productsRouter;
