import jwt from "jsonwebtoken";
import User from "../models/User.js";
import wrapAsync from "../../../WanderStay/utils/wrapAsync.js";

export const protect = wrapAsync(async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.json({ succes: false, message: "not authorized" });
  }
  const userId = jwt.verify(token, process.env.JWT_SECRET);

  if (!userId) {
    return res.json({ succes: false, message: "not authorized" });
  }

  req.user = await User.findById(userId).select("-password");
  next();
});
