import cors from "cors";
import express from "express";
import swaggerUi from "swagger-ui-express";
import { buildSwaggerSpec } from "./config/swagger";
import authRouter from "./routes/auth";

const app = express();

const corsOptions = {
  origin: process.env.NEXT_PUBLIC_URL || "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ['Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ 
    message: "Spin API is running",
    documentation: "/documentation"
  });
});

app.get("/api-docs.json", (req, res) => {
  const spec = buildSwaggerSpec();
  res.setHeader("Content-Type", "application/json");
  res.json(spec);
});

app.use(
  "/documenstation",
  swaggerUi.serve,
  swaggerUi.setup(null, {
    swaggerOptions: {
      url: "https://spin-api-6pcg.onrender.com/api-docs.json",
    },
  })
);

app.use("/auth", authRouter);

export default app;