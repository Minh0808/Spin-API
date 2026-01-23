"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerPaths = void 0;
const auth_1 = __importDefault(require("../constant/auth"));
const products_1 = __importDefault(require("../constant/products"));
const voucher_1 = __importDefault(require("../constant/voucher"));
const joiToSwagger_1 = require("./joiToSwagger");
const buildMethod = (config) => {
    const schema = config.validate?.payload
        ? (0, joiToSwagger_1.convertJoi)(config.validate.payload)
        : undefined;
    const content = {};
    if (schema) {
        content["application/json"] = { schema };
        content["application/x-www-form-urlencoded"] = { schema };
        content["multipart/form-data"] = { schema };
    }
    let parameters = [];
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
        parameters = parameters.concat(Object.keys(querySchema.keys).map((key) => ({
            name: key,
            in: "query",
            required: true,
            schema: { type: "string" },
        })));
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
                        schema: (0, joiToSwagger_1.convertJoi)(config.validate.payload),
                    },
                    "application/x-www-form-urlencoded": {
                        schema: (0, joiToSwagger_1.convertJoi)(config.validate.payload),
                    },
                },
            }
            : undefined,
        responses: Object.fromEntries(Object.entries(config.responses).map(([code, val]) => [
            code,
            { description: val.description },
        ])),
    };
};
exports.swaggerPaths = {
    "/auth/register": { post: buildMethod(auth_1.default.register) },
    "/auth/login": { post: buildMethod(auth_1.default.login) },
    "/auth/logout": { post: buildMethod(auth_1.default.logout) },
    "/auth/profile": { get: buildMethod(auth_1.default.getProfile) },
    "/auth/profile-update/{id}": { put: buildMethod(auth_1.default.updateUser) },
    "/vouchers-info": { get: buildMethod(voucher_1.default.getVouchers) },
    "/vouchers/user/{idUser}": { get: buildMethod(voucher_1.default.getVouchersByUser) },
    "/vouchers": { post: buildMethod(voucher_1.default.createVoucher) },
    "/vouchers/{id}": { put: buildMethod(voucher_1.default.updateVoucher) },
    "/products-list": { get: buildMethod(products_1.default.getProducts) },
    "/products": { post: buildMethod(products_1.default.createProduct) },
};
