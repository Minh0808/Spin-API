import cors from "cors";
import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";
import router from "./routes";

const app = express();

const allowedOrigins = [
  process.env.NEXT_PUBLIC_URL,
  "http://localhost:3000",
  "http://localhost:5000",
];
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
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
  res.setHeader("Content-Type", "application/json");
  res.json(swaggerSpec);
});

app.use(
  "/documentation",
  swaggerUi.serve,
  swaggerUi.setup(null, {
    swaggerOptions: {
      url: "/api-docs.json",
    },
  })
);

app.use("/", router)

export default app;