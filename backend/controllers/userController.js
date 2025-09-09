import User from "../models/userModel.js";
import bcrypt from "bcrypt";
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // check user already exist
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      res.status(400).json({ success: false, message: "already exist" });
    }
    if (password.length < 8) {
      res
        .status(400)
        .json({ success: false, message: "password must be 8 characters" });
    }
    // password hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
  } catch (error) {}
};
