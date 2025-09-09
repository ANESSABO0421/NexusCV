import express from "express";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
const port = 3000;

app.use(cors());

// middleware
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send("hai");
});

app.listen(port, () => {
  console.log(`server created at http://localhost:${port}`);
});
