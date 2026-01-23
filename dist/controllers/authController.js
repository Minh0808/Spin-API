"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.getProfile = exports.logout = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signup_1 = __importDefault(require("../models/signup"));
const register = async (req, res) => {
    try {
        const { phone, name, email, role, password, rotationTimes } = req.body;
        if (!phone || !name || !email || !password)
            return res.status(400).json({ error: "Missing fields" });
        const exists = await signup_1.default.findOne({ phone });
        if (exists)
            return res.status(409).json({ error: "Phone already exists" });
        const hash = await bcryptjs_1.default.hash(password, 10);
        const signup = await signup_1.default.create({ phone, name, email, role, password: hash, rotationTimes });
        res.status(200).json({
            message: "Register successful",
            user: { id: signup._id, phone: signup.phone, name: signup.name, email: signup.email, role: signup.role, rotationTimes: signup.rotationTimes },
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { phone, password } = req.body;
        if (!phone || !password)
            return res.status(400).json({ error: "Missing credentials" });
        const user = await signup_1.default.findOne({ phone });
        if (!user)
            return res.status(401).json({ error: "Invalid phone or password" });
        const match = await bcryptjs_1.default.compare(password, user.password);
        if (!match)
            return res.status(401).json({ error: "Invalid phone or password" });
        const token = jsonwebtoken_1.default.sign({ _id: user._id, phone: user.phone }, process.env.JWT_SECRET || "secret", { expiresIn: "1d" });
        res.setHeader("Authorization", `Bearer ${token}`);
        res.json({
            id: user._id,
            user: {
                phone: user.phone,
                name: user.name,
                email: user.email,
                role: user.role,
                rotationTimes: user.rotationTimes,
            }
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};
exports.login = login;
const logout = async (req, res) => {
    res.json({ message: "Logout successful" });
};
exports.logout = logout;
const getProfile = async (req, res) => {
    try {
        const userId = req.user?._id || req.user?.id;
        if (!userId)
            return res.status(401).json({ error: "Unauthorized" });
        const user = await signup_1.default.findById(userId);
        if (!user)
            return res.status(400).json({ error: "User not found" });
        res.json({
            id: user._id,
            phone: user.phone,
            name: user.name,
            email: user.email,
            role: user.role,
            rotationTimes: user.rotationTimes,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};
exports.getProfile = getProfile;
const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const updateData = req.body;
        if (updateData.password) {
            updateData.password = await bcryptjs_1.default.hash(updateData.password, 10);
        }
        Object.keys(updateData).forEach(key => {
            if (updateData[key] === "" ||
                updateData[key] === null ||
                updateData[key] === undefined) {
                delete updateData[key];
            }
        });
        const user = await signup_1.default.findByIdAndUpdate(userId, updateData, { new: true });
        if (!user)
            return res.status(404).json({ error: "User not found" });
        res.json({
            message: "User updated successfully",
            user: {
                id: user._id,
                phone: user.phone,
                name: user.name,
                email: user.email,
                role: user.role,
                rotationTimes: user.rotationTimes,
            }
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};
exports.updateUser = updateUser;
