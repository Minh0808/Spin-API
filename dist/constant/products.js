"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const Products = {
    getProducts: {
        tags: ["Products"],
        description: "Get all products",
        auth: true,
        responses: {
            default: { description: "Successful operation" },
        }
    },
    createProduct: {
        tags: ["Products"],
        description: "Create a new product",
        auth: true,
        validate: {
            payload: joi_1.default.object({
                name: joi_1.default.string().required(),
                image: joi_1.default.string().uri().required(),
                price: joi_1.default.number().required(),
                sellPrice: joi_1.default.number().optional(),
                description: joi_1.default.string().required(),
                inStock: joi_1.default.boolean().required()
            })
        },
        responses: {
            default: { description: "Successful operation" },
        }
    }
};
exports.default = Products;
