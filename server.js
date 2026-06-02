import express from "express";
import dotenv from "dotenv";
import checkInDate from "./route/payment.js";
import hotelRoute from "./route/hotel.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*",
  }),
);

const PORT = 5000;

app.use(express.json());

app.use("/api", checkInDate);
app.use("/api", hotelRoute);

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
