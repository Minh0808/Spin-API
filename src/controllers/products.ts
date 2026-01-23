import { Request, Response } from "express";
import Product from "../models/products";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, image, price, sellPrice, description, inStock } = req.body;
    const product = new Product({
      name,
      image,
      price,
      sellPrice,
      description,
      inStock,
    });
    await product.save();
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};