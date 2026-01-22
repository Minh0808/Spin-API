import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import Signup from "../models/signup";


export const register = async (req: Request, res: Response) => {
  try {
    const { phone, name, email, role, password } = req.body;
    if (!phone || !name || !email || !password)
      return res.status(400).json({ error: "Missing fields" });

    const exists = await Signup.findOne({ email });
    if (exists) return res.status(409).json({ error: "Email already exists" });

    const hash = await bcrypt.hash(password, 10);
    const signup = await Signup.create({ phone, name, email, role, password: hash });

    res.status(200).json({
      message: "Register successful",
      user: { id: signup._id, phone: signup.phone, name: signup.name, email: signup.email, role: signup.role },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { phone, password } = req.body;
    if (!phone || !password)
      return res.status(400).json({ error: "Missing credentials" });

    const user = await Signup.findOne({ phone });
    if (!user) return res.status(401).json({ error: "Invalid phone or password" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Invalid phone or password" });

    const token = jwt.sign(
      { _id: user._id, phone: user.phone },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1d" }
    );

    res.setHeader("Authorization", `Bearer ${token}`);

    res.json({
      id: user._id,
      user: {
        phone: user.phone,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const logout = async (req: Request, res: Response) => {
  res.removeHeader("Authorization");
  res.json({ message: "Logout successful" });
}

export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id || req.user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const user = await Signup.findById(userId);
    if (!user) return res.status(400).json({ error: "User not found" });

    res.json({
      id: user._id,
      phone: user.phone,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};