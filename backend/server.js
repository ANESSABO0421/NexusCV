import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connect } from "mongoose";
import { connectDb } from "./config/db.js";
import userRouter from "./routes/userRoute.js";

const app = express();
const port = 3000;
dotenv.config()

app.use(cors());

// database
connectDb();

// middleware
app.use(express.json());

app.use("/api/auth", userRouter);

// routes
app.get("/", (req, res) => {
  res.send("hai");
});

app.listen(port, () => {
  console.log(`server created at http://localhost:${port}`);
});
