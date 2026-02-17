import mongoose from "mongoose";
import wrapAsync from "../utils/wrapAsync.js";

const connnectDB = wrapAsync(async () => {
  mongoose.connection.on("connected", () => console.log("Database Connected"));
  await mongoose.connect(`${process.env.MONGODB_URI}/car-rental`);
});

export default connnectDB;
