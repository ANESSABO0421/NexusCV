import express from "express";
import {
  getUser,
  LoginUser,
  registerUser,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", LoginUser);
userRouter.get("/profile", protect, getUser);

export default userRouter;
