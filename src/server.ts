import dotenv from "dotenv";
import serverless from "serverless-http";
import app from "./app";
import { connectDB } from "./config/db";
dotenv.config();


let isConnected = false;

const handler = async (req: any, res: any) => {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
    console.log("✅ DB connected");
  }
  return app(req, res);
};

export default serverless(handler);