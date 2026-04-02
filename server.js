import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = 5000;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
