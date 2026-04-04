import express from "express";
import { paymentController } from "../controller/payment";

const route = express.Router();

route.post("/checkindate", paymentController);

export default route;
