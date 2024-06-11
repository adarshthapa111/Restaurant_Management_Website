import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "./Button";
import { motion } from "framer-motion";

const Navbar = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const cacheBuster = Math.random().toString(36).substring(7);

  return (
    <>
      {/* <div className=""> */}
      <div className="navbar shadow-md lg:mx-auto left-0 right-0 flex mt-1 space-x-6 justify-between px-3 py-2 md:pl-6 items-center w-full lg:max-w-4xl xl:max-w-6xl rounded-full top-0 fixed lg:py-1 z-50 bg-white">
        <div className="left flex items-center">
          <motion.div className="logo cursor-pointer">
            <img
              // src="./img/logo1.png"
              src={`/img/logo1.png?${cacheBuster}`}
              alt="Logo"
              className="h-10 xl:h-14 "
            />
          </motion.div>
          <div
            className="hamburger lg:hidden p-2 cursor-pointer "
            onClick={toggleMenu}
          >
            <div className="line my-1.5 w-5 bg-black h-0.5"></div>
            <div className="line my-1.5 w-3 bg-black h-0.5"></div>
            <div className="line my-1.5 w-5 bg-black h-0.5"></div>
          </div>
        </div>

        <div
          className={`left-menu lg:hidden ${
            isMenuOpen
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-full"
          } transition-opacity transition-transform duration-300 ease-in-out fixed left-0 inset-0 bg-gray-100 z-50 w-64 shadow-gray-400 shadow-lg rounded-r-xl`}
        >
          {/* Add your menu items here */}
          <div>
            <img
              src="/img/cross.png"
              alt=""
              className="h-14 pl-2 pt-4 cursor-pointer"
              onClick={closeMenu}
            />
          </div>
          <ul className="mt-4">
            <li className="p-4 border-b" onClick={closeMenu}>
              <Link
                to="/"
                className={
                  location.pathname === "/"
                    ? "text-orange-500  font-semibold"
                    : ""
                }
              >
                Home
              </Link>
            </li>
            <li className="p-4 border-b" onClick={closeMenu}>
              <Link
                to="/Menu"
                className={
                  location.pathname === "/Menu" ||
                  location.pathname === "/FoodDetail/:id"
                    ? "text-orange-500 pb-[34.5px] font-bold"
                    : " "
                }
              >
                Our Menu
              </Link>
            </li>
            <li className="p-4 border-b" onClick={closeMenu}>
              <Link
                to="/Nutrition"
                className={
                  location.pathname === "/Nutrition"
                    ? "text-orange-500  font-bold"
                    : " "
                }
              >
                Nutrition's Calculator
              </Link>
            </li>
            <li className="p-4 border-b" onClick={closeMenu}>
              <Link
                to="/About"
                className={
                  location.pathname === "/About" || location.pathname === "/AboutFoodDesc"
                    ? "text-orange-500 font-bold"
                    : " "
                }
              >
                About our Food
              </Link>
            </li>
            <li className="p-4 border-b" onClick={closeMenu}>
              <Link
                to="/onlineOrder"
                className={
                  location.pathname === "/onlineOrder"
                    ? "text-orange-500  font-bold"
                    : " "
                }
              >
                Online Order
              </Link>
            </li>
          </ul>
        </div>

        <div className="center text-sm">
          <div className="features hidden lg:block items-center">
            <ul className="lg:flex justify-center lg:space-x-6 font-inter xl:space-x-4 text-md font-medium">
              <li className="cursor-pointer">
                <Link
                  to="/"
                  className={
                    location.pathname === "/"
                      ? "font-semibold bg-orange-400 text-white px-3 py-3 rounded-full"
                      : "py-3 px-3"
                  }
                >
                  Home
                </Link>
              </li>
              <li className="cursor-pointer">
                <Link
                  to="/Menu"
                  className={
                    location.pathname === "/Menu" ||
                    location.pathname === "/FoodDetail/:id"
                      ? "font-semibold bg-orange-400 text-white p-3 rounded-full"
                      : "py-3 px-3"
                  }
                >
                  Our Menu
                </Link>
              </li>
              <li className="cursor-pointer">
                <Link
                  to="/Nutrition"
                  className={
                    location.pathname === "/Nutrition" || location.pathname == "/NutritionCalculator/:id"
                      ? "bg-orange-400 text-white p-3 rounded-full font-semibold"
                      : "py-3 px-3"
                  }
                >
                  Nutrition's Calculator
                </Link>
              </li>
              <li className="cursor-pointer">
                <Link
                  to="/About"
                  className={
                    location.pathname === "/About" || location.pathname === "/AboutFoodDesc"
                      ? "bg-orange-400 text-white p-3 rounded-full font-semibold"
                      : "py-3 px-3"
                  }
                >
                  About our Food
                </Link>
              </li>
              {/* <li className="cursor-pointer">
                <Link
                  to="/onlineOrder"
                  className={
                    location.pathname === "/onlineOrder"
                      ? "bg-orange-400 text-white p-3 rounded-full font-semibold"
                      : "py-3 px-3"
                  }
                >
                  Online Order
                </Link>
              </li> */}
            </ul>
          </div>
        </div>
        <div className="right flex justify-center items-center space-x-6">
          <Link to="/addtocart">
            <motion.button
              className="rounded-full p-1 hidden sm:block"
              whileHover={{ scale: 1.4 }}
              whileTap={{ scale: 0.9 }}
            >
              <img src="/img/AddToCart.png" alt="" className="h-9 w-9" />
            </motion.button>
          </Link>
          <Link to="/FavouriteFood">
            <motion.button
              className="rounded-full p-1 hidden sm:block"
              whileHover={{ scale: 1.4 }}
              whileTap={{ scale: 0.9 }}
            >
              <img src="/img/fav.png" alt="" className="h-9 w-9" />
            </motion.button>
          </Link>
          <Link to="/Profile">
            <motion.button
              className="rounded-full p-1 hidden sm:block"
              whileHover={{ scale: 1.4 }}
              whileTap={{ scale: 0.9 }}
            >
              <img src="/img/user.png" alt="" className="h-9 w-9" />
            </motion.button>
          </Link>
          <Link to="/Notifications">
            <motion.button
              className="rounded-full p-1 hidden sm:block"
              whileHover={{ scale: 1.4 }}
              whileTap={{ scale: 0.9 }}
            >
              <img src="/img/notification.png" alt="" className="h-9 w-9" />
            </motion.button>
          </Link>
          <Link to="/TableBooking">
            <Button buttonText="Book a Table" />
          </Link>
        </div>
      </div>
      <div className="Mobile-navbar sm:hidden">
        <nav className="fixed z-10 bottom-0 left-0 w-full bg-white shadow-md border-t border-gray-300">
          <div className="flex justify-around py-3">
            <Link to="/" className="flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span className="text-xs text-gray-600">Home</span>
            </Link>
            <Link to="/FavouriteFood" className="flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-yellow-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 14a7 7 0 01-7 7h14a7 7 0 01-7-7z"
                />
              </svg>
              <span className="text-xs text-gray-600">Favorites</span>
            </Link>
            <Link to="/addtocart" className="flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <span className="text-xs text-gray-600">Cart</span>
            </Link>
            <Link to="/profile" className="flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-purple-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span className="text-xs text-gray-600">Profile</span>
            </Link>
          </div>
        </nav>
      </div>
      {/* </div> */}
    </>
  );
};

export default Navbar;
