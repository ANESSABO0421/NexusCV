import Users from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// CONST GENERATE A TOKEN JWT
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// register user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // check user already exist
    const userExist = await Users.findOne({ email: email });
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

    // create user
    const user = await Users.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// login user
export const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email: email });
    if (!user) {
      return res
        .status(500)
        .json({ success: false, message: "invalid email or password" });
    }

    //compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(500)
        .json({ success: false, message: "invalid credentials" });
    }
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const allUsers = await Users.findById(req.user.id).select("-password");
    if (!allUsers) {
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    }
    return res.json(allUsers);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
