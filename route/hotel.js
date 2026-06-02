import express from "express";
import requireAuth from "../middleware/authmiddleware.js";
import CreateHotelController from "../controller/hotelController.js";

const router = express.Router();

router.post("/create-hotel", requireAuth, CreateHotelController);

export default router;
