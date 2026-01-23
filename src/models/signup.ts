import mongoose, { Schema } from "mongoose";

export interface Signup extends Document {
  phone: string;
  name: string;
  email: string;
  role: "admin" | "user" | "manager";
  password: string;
  rotationTimes: number;
  createdAt: Date;
}

const SignupSchema = new Schema<Signup>(
  {
    phone: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, required: true },
    password: { type: String, required: true },
    rotationTimes: { type: Number, required: false, default: 1 }
  },
  { timestamps: true }
);
export default mongoose.model<Signup>("Signup", SignupSchema);