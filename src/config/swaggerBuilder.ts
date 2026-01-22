import { authDocs } from "../routes/auth"; // Sửa lại import
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
  "/auth/register": { post: buildMethod(authDocs.register) },
  "/auth/login": { post: buildMethod(authDocs.login) },
  "/auth/logout": { post: buildMethod(authDocs.logout) },
  "/auth/profile": { get: buildMethod(authDocs.getProfile) },
};
