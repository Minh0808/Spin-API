import swaggerJsdoc from "swagger-jsdoc";
import { swaggerPaths } from "./swaggerBuilder";

const options = {
  definition: {
    openapi: "3.0.0",
    info: { title: "API Documentation", version: "1.0.0" },
    components: {
      securitySchemes: {
        bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" },
      },
    },
    paths: swaggerPaths,
  },
  apis: [],
};

export const swaggerSpec = swaggerJsdoc(options);
export const buildSwaggerSpec = () => swaggerSpec;