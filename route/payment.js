import express from "express";
import {
  paymentController,
  makePaymentController,
} from "../controller/payment.js";

const router = express.Router();

router.post("/checkindate", paymentController);
router.post("/makepayment", makePaymentController);

export default router;
