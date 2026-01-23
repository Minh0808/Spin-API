import mongoose from "mongoose";

export interface Product {
  name: string;
  image: string;
  price: number;
  sellPrice: number;
  description: string;
  inStock: boolean;
}

const ProductSchema = new mongoose.Schema<Product>({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  sellPrice: { type: Number, required: false, default: 0 },
  description: { type: String, required: true },
  inStock: { type: Boolean, required: true, default: true },
});

const products = mongoose.model<Product>("Product", ProductSchema);

export default products;