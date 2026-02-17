import express from "express";
import { protect } from "../middleware/auth.js";
import wrapAsync from "../../../WanderStay/utils/wrapAsync.js";
import {
  addCar,
  changeRoleToOwner,
  deleteCar,
  getDashboarData,
  getOwnerCars,
  toggleCarAvailability,
  updateUserImage,
} from "../controllers/ownerController.js";
import upload from "../middleware/multer.js";

const ownerRouter = express.Router();

ownerRouter.post("/change-role", protect, wrapAsync(changeRoleToOwner));
ownerRouter.post(
  "/add-car",
  upload.single("image"),
  protect,
  wrapAsync(addCar),
);
ownerRouter.get("/cars", protect, wrapAsync(getOwnerCars));
ownerRouter.post("/toggle-car", protect, wrapAsync(toggleCarAvailability));
ownerRouter.post("/delete-car", protect, wrapAsync(deleteCar));

ownerRouter.get("/dashboard", protect, wrapAsync(getDashboarData));
ownerRouter.post(
  "/update-image",
  upload.single("image"),
  protect,
  wrapAsync(updateUserImage),
);

export default ownerRouter;
