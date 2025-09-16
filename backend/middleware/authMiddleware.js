import jwt from "jsonwebtoken";
import Users from "../models/userModel.js";

export const protect = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (token && token.startsWith("Bearer")) {
      token=token.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await Users.findById(decoded.id).select("-password");
      next();
    } else {
      res
        .status(401)
        .json({
          success: false,
          message: "not authorized and token not found",
        });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
