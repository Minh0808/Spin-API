import swaggerJsdoc from "swagger-jsdoc";
import { swaggerPaths } from "./swaggerBuilder";

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
    },
    servers: [
      {
        url: process.env.NODE_ENV === "production"
          ? "https://spin-api-6pcg.onrender.com"
          : "http://localhost:5000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    paths: swaggerPaths,
  },
  apis: [],
});
