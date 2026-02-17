import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { wrapAsync } from "../utils/wrapAsync.js";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const [prodSearch, setProdSearch] = useState("");
  const currency = eval(`"${import.meta.env.VITE_CURRENCY}"`);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [cars, setCars] = useState([]);

  // Funcition to check if user is logged in
  const fetchUser = wrapAsync(async () => {
    const { data } = await axios.get("/api/user/data");

    if (data.success) {
      setUser(data.user);
      setIsOwner(data.user.role === "owner");
    } else {
      navigate("/");
    }
  });

  // Function to logout User
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setIsOwner(false);
    axios.defaults.headers.common["Authorization"] = "";
    toast.success("You have been logged out");
  };

  // Function to fetch all cars from the server
  const fetchCars = wrapAsync(async () => {
    const { data } = await axios.get("/api/user/cars");
    data.success ? setCars(data.cars) : toast.error(data.message);
  });

  // useEffect to retrieve the toke from localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
    fetchCars();
  }, []);

  // useEffect to fetch user data when token is available
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `${token}`;
      fetchUser();
    }
  }, [token]);

  const value = {
    prodSearch,
    setProdSearch,
    axios,
    navigate,
    currency,
    user,
    setUser,
    token,
    setToken,
    isOwner,
    setIsOwner,
    fetchUser,
    showLogin,
    setShowLogin,
    logout,
    fetchCars,
    cars,
    setCars,
    pickupDate,
    setPickupDate,
    returnDate,
    setReturnDate,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
