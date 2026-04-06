import { payment, getRoomdetails } from "../service/payment.js";
import axios from "axios";

export const paymentController = async (req, res) => {
  try {
    const { checkoutdate, checkindate, roomid, fullname } = req.body;

    if (!checkindate || !checkoutdate || !roomid || !fullname) {
      return res
        .status(404)
        .json({ succes: false, message: "Please fill all requred fields" });
    }
    const start = new Date(checkindate);
    const end = new Date(checkoutdate);

    if (end <= start) {
      return res
        .status(401)
        .json({ succes: false, message: "Invalid checkin/checkout date" });
    }
    const room = await getRoomdetails(roomid);

    if (!room) {
      return res
        .status(404)
        .json({ success: false, message: "Room not found" });
    }

    const nights = Math.ceil(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
    );

    const total = nights * room.price;

    res.status(200).json({ success: true, nights, total });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const makePaymentController = async (req, res) => {
  try {
    const { email, amount, checkoutdate, checkindate, roomid, fullname } =
      req.body;

    if (
      !email ||
      !amount ||
      !checkindate ||
      !checkoutdate ||
      !roomid ||
      !fullname
    ) {
      return res
        .status(404)
        .json({ success: false, message: "Please fill the fields" });
    }

    const room = await getRoomdetails(roomid);

    if (!room) {
      return res
        .status(404)
        .json({ success: false, message: "Room not found" });
    }
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      { email, amount: amount * 100 },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    const { authorization_url, reference } = response.data.data;

    const savePayment = await payment({
      email,
      reference,
      checkindate,
      checkoutdate,
      amount: amount,
      hotelname: room.hotel_id,
      roomname: room.name,
      room_type: room.room_type,
      room_id: room.id,
      status: "confirmed",
    });
    res
      .status(200)
      .json({ success: true, savePayment, URL: authorization_url, reference });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
