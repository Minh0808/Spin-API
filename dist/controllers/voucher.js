"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateVoucher = exports.createVoucher = exports.getVouchersByUser = exports.getVouchers = void 0;
const voucher_1 = __importDefault(require("../models/voucher"));
const getVouchers = async (req, res) => {
    try {
        const vouchers = await voucher_1.default.find();
        res.json({ success: true, data: vouchers });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching vouchers' });
    }
};
exports.getVouchers = getVouchers;
const getVouchersByUser = async (req, res) => {
    try {
        const idUser = req.params.idUser;
        const vouchers = await voucher_1.default.find({
            idUser: idUser
        });
        res.json({ success: true, data: vouchers });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching vouchers by idUser',
        });
    }
};
exports.getVouchersByUser = getVouchersByUser;
const createVoucher = async (req, res) => {
    try {
        const { code, idUser, discount, expirationDate, isActive } = req.body;
        let voucher = await voucher_1.default.findOne({ code, idUser });
        if (voucher) {
            voucher.quantity = (voucher.quantity || 1) + 1;
            await voucher.save();
            return res.status(200).json({ success: true, data: voucher, message: 'Voucher quantity increased' });
        }
        else {
            voucher = new voucher_1.default({
                code,
                idUser,
                discount,
                expirationDate,
                isActive: isActive ?? true,
                quantity: 1
            });
            await voucher.save();
            return res.status(200).json({ success: true, data: voucher });
        }
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Error creating voucher' });
    }
};
exports.createVoucher = createVoucher;
const updateVoucher = async (req, res) => {
    try {
        const id = req.params.id;
        const { code, idUser, discount, expirationDate, isActive, quantity, usedQuantity } = req.body;
        const voucher = await voucher_1.default.findByIdAndUpdate(id, {
            code,
            idUser,
            discount,
            expirationDate,
            isActive: isActive ?? true,
            quantity,
            usedQuantity
        }, { new: true });
        if (!voucher) {
            return res.status(404).json({ success: false, message: 'Voucher not found' });
        }
        res.json({ success: true, data: voucher });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Error updating voucher' });
    }
};
exports.updateVoucher = updateVoucher;
