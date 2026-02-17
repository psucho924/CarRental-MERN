import Booking from "../models/Booking.js";
import Car from "../models/Car.js";

// function to check Availability of Car for a given Date by checking if it exist in any Booking
const checkAvailability = async (car, pickupDate, returnDate) => {
  const pickup = new Date(pickupDate);
  const returnD = new Date(returnDate);
  const bookings = await Booking.find({
    car,
    pickupDate: { $lte: returnD }, // checking OverLapping of Dates
    returnDate: { $gte: pickup }, // checking OverLapping of Dates
  });
  return bookings.length === 0; // return true if no OverLapping exist
};

// API to check Availability of Cars for the given Date and location
export const checkAvailabilityOfCar = async (req, res) => {
  const { location, pickupDate, returnDate } = req.body;

  // fetch all available cars for given location
  const cars = await Car.find({ location, isAvailable: true });

  // check car availability for the given date range using promise
  const availableCarsPromises = cars.map(async (car) => {
    const isAvailable = await checkAvailability(
      car._id,
      pickupDate,
      returnDate,
    );
    return { ...car._doc, isAvailable: isAvailable }; // updating availability according to ranges
  });
  let availableCars = await Promise.all(availableCarsPromises);

  availableCars = availableCars.filter((car) => car.isAvailable === true); // getting available Cars
  res.json({ success: true, availableCars });
};

// API to Create Booking
export const createBooking = async (req, res) => {
  const { _id } = req.user;
  const { car, pickupDate, returnDate } = req.body;

  const isAvailable = await checkAvailability(car, pickupDate, returnDate);
  if (!isAvailable) {
    return res.json({ success: false, message: "Car is not available" });
  }

  const carData = await Car.findById(car);

  // calculate price based on pickup and return Date
  const picked = new Date(pickupDate);
  const returned = new Date(returnDate);
  const noOfDays = Math.ceil((returned - picked) / (1000 * 60 * 60 * 24));
  const price = carData.pricePerDay * noOfDays;

  await Booking.create({
    car,
    owner: carData.owner,
    user: _id,
    pickupDate,
    returnDate,
    price,
  });
  res.json({ success: true, message: "Booling Created" });
};

// API to List User Bookings
export const getUserBookings = async (req, res) => {
  const { _id } = req.user;
  const bookings = await Booking.find({ user: _id })
    .populate("car")
    .sort({ createdAt: -1 });
  res.json({ success: true, bookings });
};

// API to get the Owner Bookings
export const getOwnerBookings = async (req, res) => {
  if (req.user.role !== "owner") {
    return res.json({ success: false, message: "Unauthorized" });
  }
  const bookings = await Booking.find({ owner: req.user._id })
    .populate("car")
    .populate({
      path: "user",
      select: "-password",
    })
    .sort({ createdAt: -1 });

  res.json({ success: true, bookings });
};

// API to change the booking status
export const changeBookingStatus = async (req, res) => {
  const { _id } = req.user;
  const { bookingId, status } = req.body;
  const booking = await Booking.findById(bookingId);

  if (booking.owner.toString() !== _id.toString()) {
    return res.json({ success: false, message: "Unauthorized" });
  }
  booking.status = status;
  await booking.save();
  res.json({ success: true, message: "Status Updated" });
};
