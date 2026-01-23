
import { Router } from "express";
import authRoutes from "./auth";
import productsRouter from "./products";
import voucherRoutes from "./voucher";


const router = Router();


router.use("/auth", authRoutes);
router.use("/", voucherRoutes);
router.use("/", productsRouter);


export default router;