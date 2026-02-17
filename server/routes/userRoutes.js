import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import {
  getCars,
  getUserData,
  loginUser,
  registerUser,
} from "../controllers/userController.js";
import { protect } from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/register", wrapAsync(registerUser));
userRouter.post("/login", wrapAsync(loginUser));
userRouter.get("/data", protect, wrapAsync(getUserData));
userRouter.get("/cars", wrapAsync(getCars));

export default userRouter;
