import { payment, getRoomdetails } from "../service/payment";

export const paymentController = async (req, res) => {
  try {
    const { checkoutdate, checkindate, roomid, fullname } = req.body;

    if (!checkindate || !checkoutdate || !roomid || !fullname) {
      res
        .status(404)
        .json({ succes: false, message: "Please fill all requred fields" });
    }
    const start = new Date(checkindate);
    const end = new Date(checkoutdate);

    if (end <= start) {
      res
        .status(401)
        .json({ succes: false, message: "Invalid checkin/checkout date" });
    }
    const room = await getRoomdetails(roomid);

    if (!room) {
      res.status(404).json({ succes: false, message: "Room not found" });
    }

    const nights = Math.ceil(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
    );

    const total = nights * room.price;
    const data = await payment({
      checkindate,
      checkoutdate,
      amount: total,
      hotelname: room.hotelname,
      roomname: room.name,
      room_type: room.room_type,
      room_id: room.id,
      status: "pending",
    });

    res.status(200).json({ succes: true, data: data, nights, total });
  } catch (err) {
    res.status(500).json({ succes: false, message: err.message });
  }
};
