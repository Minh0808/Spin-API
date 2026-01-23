import { Router } from "express";
import { createProduct, getProducts } from "../controllers/products";
import { authMiddleware } from "../middlewares/authMiddleware";

const productsRouter = Router();

productsRouter.get("/products-list", authMiddleware, getProducts);
productsRouter.post("/products", authMiddleware, createProduct);

export default productsRouter;