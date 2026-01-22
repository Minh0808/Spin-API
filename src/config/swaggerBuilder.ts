import { authSwagger } from "../routes/auth";
import { convertJoi } from "./joiToSwagger";
const authRoutes = require("../routes/auth");

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

  return {
    tags: config.tags,
    summary: config.description,
    security: config.auth ? [{ bearerAuth: [] }] : [],
    requestBody: config.validate?.payload
  ? {
      required: true,
      content: {
        "application/json": {
          schema: convertJoi(config.validate.payload),
        },
        "application/x-www-form-urlencoded": {
          schema: convertJoi(config.validate.payload),
        }
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
  "/api/auth/register": { post: buildMethod(authSwagger.register) },
  "/api/auth/login": { post: buildMethod(authSwagger.login) },
  "/api/auth/logout": { post: buildMethod(authSwagger.logout) },
  "/api/auth/profile": { get: buildMethod(authSwagger.getProfile) },
};
