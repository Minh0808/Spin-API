import { OpenAPIV3 } from "openapi-types";
import Auth from "../constant/auth";
import Products from "../constant/products";
import Voucher from "../constant/voucher";
import { convertJoi } from "./joiToSwagger";

const buildMethod = (config: any) => {
  const schema = config.validate?.payload
    ? convertJoi(config.validate.payload)
    : undefined;

  const content: any = {};
  if (schema) {
    content["application/json"] = { schema };
    content["application/x-www-form-urlencoded"] = { schema };
    content["multipart/form-data"] = { schema };
  }

  let parameters: OpenAPIV3.ParameterObject[] = [];
  if (config.validate?.params) {
    const paramsSchema = config.validate.params.describe();
    parameters = Object.keys(paramsSchema.keys).map((key) => ({
      name: key,
      in: "path",
      required: true,
      schema: { type: "string" },
    }));
  }
  if (config.validate?.query) {
    const querySchema = config.validate.query.describe();
    parameters = parameters.concat(
      Object.keys(querySchema.keys).map((key) => ({
        name: key,
        in: "query",
        required: true,
        schema: { type: "string" },
      }))
    );
  }

  return {
    tags: config.tags,
    summary: config.description,
    security: config.auth ? [{ bearerAuth: [] }] : [],
    parameters: parameters.length > 0 ? parameters : undefined,
    requestBody: config.validate?.payload
      ? {
          required: true,
          content: {
            "application/json": {
              schema: convertJoi(config.validate.payload),
            },
            "application/x-www-form-urlencoded": {
              schema: convertJoi(config.validate.payload),
            },
          },
        }
      : undefined,
    responses: Object.fromEntries(
      Object.entries(config.responses).map(([code, val]: any) => [
        code,
        { description: val.description },
      ])
    ),
  };
};

export const swaggerPaths = {
  "/auth/register": { post: buildMethod(Auth.register) },
  "/auth/login": { post: buildMethod(Auth.login) },
  "/auth/logout": { post: buildMethod(Auth.logout) },
  "/auth/profile": { get: buildMethod(Auth.getProfile) },
  "/auth/profile-update/{id}": { put: buildMethod(Auth.updateUser) },
  "/vouchers-info": { get: buildMethod(Voucher.getVouchers) },
  "/vouchers/user/{idUser}": { get: buildMethod(Voucher.getVouchersByUser) },
  "/vouchers": { post: buildMethod(Voucher.createVoucher) },
  "/vouchers/{id}": { put: buildMethod(Voucher.updateVoucher) },
  "/products-list": { get: buildMethod(Products.getProducts) },
  "/products": { post: buildMethod(Products.createProduct) },
};
