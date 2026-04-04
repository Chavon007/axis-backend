import express from "express";
import dotenv from "dotenv";
import checkInDate from "./controller/payment.js";

dotenv.config();

const app = express();

const PORT = 5000;

app.use(express.json());

app.use("/api", checkInDate);

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
