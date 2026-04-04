import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabase_url = process.env.SUPABASE_URL;
const project_url = process.env.PROJECT_URL;

const supabase = createClient(supabase_url, project_url);

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

export const getRoomdetails = async () => {
  const { data, error } = supabase
    .from("hotelrooms")
    .select("")
    .eq("id", room_id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const getFormData = async () => {
  const { data, error } = supabase
    .from("formDetails")
    .select("*")
    .eq("fullName")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};


