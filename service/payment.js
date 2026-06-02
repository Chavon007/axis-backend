import { supabase } from "../utliz/supabseconncet.js";

export const payment = async (bookingDetails) => {
  const { data, error } = await supabase
    .from("payment")
    .insert([bookingDetails])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const getRoomdetails = async (roomid) => {
  const { data, error } = await supabase
    .from("hotelrooms")
    .select("*")
    .eq("id", roomid)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
