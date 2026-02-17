import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import {
  changeBookingStatus,
  checkAvailabilityOfCar,
  createBooking,
  getOwnerBookings,
  getUserBookings,
} from "../controllers/bookingController.js";
import { protect } from "../middleware/auth.js";

const bookingRouter = express.Router();

bookingRouter.post("/check-availability", wrapAsync(checkAvailabilityOfCar));
bookingRouter.post("/create", protect, wrapAsync(createBooking));
bookingRouter.get("/user", protect, wrapAsync(getUserBookings));
bookingRouter.get("/owner", protect, wrapAsync(getOwnerBookings));
bookingRouter.post("/change-status", protect, wrapAsync(changeBookingStatus));

export default bookingRouter;
