import cors from "cors";
import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";
import router from "./routes";

const app = express();

/* Swagger UI bypass CORS */
app.use("/documentation", cors());

const allowedOrigins = [
  process.env.NEXT_PUBLIC_URL,
  "http://localhost:3000",
  "http://localhost:5000",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    message: "Spin API is running",
    documentation: "/documentation",
  });
});

app.use(
  "/documentation",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.use("/", router);

export default app;
