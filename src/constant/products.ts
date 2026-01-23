import Joi from "joi";

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
      payload: Joi.object({
        name: Joi.string().required(),
        image: Joi.string().uri().required(),
        price: Joi.number().required(),
        sellPrice: Joi.number().optional(),
        description: Joi.string().required(),
        inStock: Joi.boolean().required()
      })
    },
    responses: {
      default: { description: "Successful operation" },
    }
  }
}
export default Products;