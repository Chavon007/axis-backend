import { supabase } from "../utliz/supabseconncet.js";

export const createHotelService = async (hotels) => {
  const { data, error } = await supabase
    .from("Hotels")
    .insert([
      {
        name: hotels.hotelName,
        address,
        rating,
        customerServiceContact: hotels.phoneNumber,
        image,
        about: hotels.description,
      },
    ])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
