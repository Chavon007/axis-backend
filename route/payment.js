import express from "express";
import { paymentController } from "../controller/payment.js";

const router = express.Router();

router.post("/checkindate", paymentController);

export default router;
