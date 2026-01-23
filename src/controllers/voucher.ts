import { Request, Response } from 'express';
import VoucherModel from '../models/voucher';

export const getVouchers = async (req: Request, res: Response) => {
  try {
    const vouchers = await VoucherModel.find();
    res.json({ success: true, data: vouchers });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching vouchers' });
  }
};

export const getVouchersByUser = async (req: Request, res: Response) => {
  try {
    const idUser = req.params.idUser;

    const vouchers = await VoucherModel.find({
      idUser: idUser
    });

    res.json({ success: true, data: vouchers });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching vouchers by idUser',
    });
  }
};


export const createVoucher = async (req: Request, res: Response) => {
  try {
    const { code, idUser, discount, expirationDate, isActive } = req.body;
    let voucher = await VoucherModel.findOne({ code, idUser });
    if (voucher) {
      voucher.quantity = (voucher.quantity || 1) + 1;
      await voucher.save();
      return res.status(200).json({ success: true, data: voucher, message: 'Voucher quantity increased' });
    } else {
      voucher = new VoucherModel({
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
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating voucher' });
  }
};

export const updateVoucher = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { code, idUser, discount, expirationDate, isActive, quantity, usedQuantity } = req.body;

    const voucher = await VoucherModel.findByIdAndUpdate(
      id,
      {
        code,
        idUser,
        discount,
        expirationDate,
        isActive: isActive ?? true,
        quantity,
        usedQuantity
      },
      { new: true }
    );

    if (!voucher) {
      return res.status(404).json({ success: false, message: 'Voucher not found' });
    }

    res.json({ success: true, data: voucher });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating voucher' });
  }
};
