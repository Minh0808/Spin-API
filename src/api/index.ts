import serverless from "serverless-http";
import app from "../app";
import { connectDB } from "../config/db";

let isConnected = false;

async function initDB() {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
    console.log("✅ MongoDB connected");
  }
}

export default async function handler(req: any, res: any) {
  await initDB();
  const server = serverless(app);
  return server(req, res);
}
