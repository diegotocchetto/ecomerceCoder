//@ts-check
import { Schema, model } from "mongoose";

const productSchema = new Schema({
    code: { type: String, unique: true, required: true },
    status: { type: Boolean, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    thumbnail: { type: [String] },
    category: { type: String, required: true },
    stock: { type: Number, required: true },
  })

export const ProductModel = model("products", productSchema);