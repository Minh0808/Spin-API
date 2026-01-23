import { Router } from "express";
import { createVoucher, getVouchers, getVouchersByUser, updateVoucher } from "../controllers/voucher";
import { authMiddleware } from "../middlewares/authMiddleware";

const voucherRoutes = Router();

voucherRoutes.get("/vouchers-info", authMiddleware, getVouchers)
voucherRoutes.get("/vouchers/user/:idUser", authMiddleware, getVouchersByUser);
voucherRoutes.post("/vouchers", authMiddleware, createVoucher);
voucherRoutes.put("/vouchers/:id", authMiddleware, updateVoucher);

export default voucherRoutes;