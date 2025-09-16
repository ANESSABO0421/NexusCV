import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connect } from "mongoose";
import { connectDb } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import path from "path";
import { fileURLToPath } from "url";
import resumeRouter from "./routes/resumeRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;
dotenv.config();

app.use(cors());

// database
connectDb();

// middleware
app.use(express.json());

app.use("/api/auth", userRouter);
app.use("/api/resume", resumeRouter);

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"), {
    setHeaders: (res, __path) => {
      res.set("Access-Control-Allow-Origin", "http://localhost:5173");
    },
  })
);

// routes
app.get("/", (req, res) => {
  res.send("hai");
});

app.listen(port, () => {
  console.log(`server created at http://localhost:${port}`);
});
