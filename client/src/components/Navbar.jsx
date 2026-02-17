import React, { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { assets, menuLinks } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { wrapAsync } from "../utils/wrapAsync";
import toast from "react-hot-toast";
import { motion } from "motion/react";

const Navbar = () => {
  const {
    setProdSearch,
    setShowLogin,
    user,
    logout,
    isOwner,
    axios,
    setIsOwner,
  } = useAppContext();
  const [search, setSearch] = useState("");
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const changeRole = wrapAsync(async () => {
    const { data } = await axios.post("/api/owner/change-role");
    if (data.success) {
      setIsOwner(true);
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  });

  const submitHandler = (e) => {
    e.preventDefault();
    if (search !== "") {
      setProdSearch(search);
      navigate("/cars");
    }
  };
  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 text-gray-600 border-b border-boderColor relative transition-all ${location.pathname === "/" ? "bg-light" : "bg-white"}`}
    >
      <Link to="/">
        <motion.img
          whileHover={{ scale: 1.05 }}
          src={assets.logo}
          alt="logos"
          className="h-8"
        />
      </Link>
      <div
        className={`max-sm:fixed max-sm:h-screen max-sm:w-full max-sm:top-16 max-sm:border-t border-boderColor right-0 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 max-sm:p-4 transition-all duration-300 z-50 ${location.pathname === "/" ? "bg-light" : "bg-white"} ${open ? "max-sm:translate-x-0" : "max-sm:translate-x-full"}`}
      >
        {menuLinks.map((link, index) => (
          <Link
            className={`${location.pathname === link.path ? "text-blue-950 font-semibold" : "text-gray-600"} `}
            key={index}
            to={link.path}
          >
            {link.name}
          </Link>
        ))}

        <form
          onSubmit={submitHandler}
          className="hidden lg:flex items-center text-sm gap-2 border border-borderColor px-3 rounded-full max-w-56"
        >
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            placeholder="Search "
          />
          <button>
            <img src={assets.search_icon} alt="search" />
          </button>
        </form>

        <div className="flex max-sm:flex-col items-start sm:items-center gap-6">
          <button
            onClick={() => (isOwner ? navigate("/owner") : changeRole())}
            className="cursor-pointer"
          >
            {isOwner ? "Dashboard" : "List Cars"}
          </button>
          <button
            onClick={() => {
              user ? logout() : setShowLogin(true);
            }}
            className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition-all text-white  rounded-lg"
          >
            {user ? "Logout" : "Login"}
          </button>
        </div>
      </div>

      <button
        className="sm:hidden cursor-pointer"
        aria-label="Menu"
        onClick={() => setOpen(!open)}
      >
        <img src={open ? assets.close_icon : assets.menu_icon} alt="menu" />
      </button>
    </motion.div>
  );
};

export default Navbar;
