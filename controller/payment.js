import { payment, getFormData, getRoomdetails } from "../service/payment";

const paymentController = async (req, res) => {
  try {
    const { checkoutdate, checkindate, amount } = req.body;

    const start = new Date(checkindate);
    const end = new Date(checkoutdate);

    const nights =
      Math.ceil(end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);

    if (nights <= 0) return null;
    if (checkindate >= checkoutdate) {
      throw new Error("Wrong check out and check in date");
    }

    const total = nights * amount;

    await total.payment;
  } catch (err) {
    res.status(500).json({ succes: true, message: err.message });
  }
};
