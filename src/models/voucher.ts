import mongoose from "mongoose";

export interface Voucher {
  code: string;
  idUser: string;
  discount: number;
  expirationDate: Date;
  isActive: boolean;
  quantity: number;
  usedQuantity: number;
}

const VoucherSchema = new mongoose.Schema<Voucher>({
  code: { type: String, required: true },
  idUser: { type: String, required: true },
  discount: { type: Number, required: true },
  expirationDate: { type: Date, required: true },
  isActive: { type: Boolean, required: true, default: false },
  quantity: { type: Number, required: true, default: 1 },
  usedQuantity: { type: Number, required: true, default: 0 },
});

const vouchers = mongoose.model<Voucher>("Voucher", VoucherSchema);

export default vouchers;