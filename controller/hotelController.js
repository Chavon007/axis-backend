import { createHotelService } from "../service/hotelservice.js";

const CreateHotelController = async (req, res) => {
  try {
    const {
      image,
      hotelName,
      rating,
      address,
      description,
      phoneNumber,
      email,
      visibility,
      acceptingBooking,
      bookingApproval,
      created_by,
      instantBooking,
    } = req.body;

    const hotelData = {
      image,
      hotelName,
      rating,
      address,
      description,
      phoneNumber,
      email,
      visibility,
      acceptingBooking,
      bookingApproval,
      created_by,
      instantBooking,
    };
    if (Object.values(hotelData).some((v) => !v))
      return res
        .status(400)
        .json({ success: false, message: "Please fill all required fields" });

    const saveHotel = await createHotelService(hotelData);
    res
      .status(201)
      .json({
        success: true,
        message: "Hotel created successfully",
        data: saveHotel,
      });
  } catch (err) {
    res.status(500).json({ success: false, err: err.message });
  }
};

export default CreateHotelController;
