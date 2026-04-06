import express from "express";
import {
  paymentController,
  makePaymentController,
  paymentCallbackController,
} from "../controller/payment.js";

const router = express.Router();

router.post("/checkindate", paymentController);
router.post("/makepayment", makePaymentController);
router.get("/payment/callback", paymentCallbackController);
export default router;
