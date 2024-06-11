import { useEffect } from "react";
import { Link } from "react-router-dom";
// import { HashLink as Link } from "react-router-hash-link";
import { Link as ScrollLink } from "react-scroll";
import { motion } from "framer-motion";
import Button from "./Button";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const TableBooking = () => {
  const { user: currentUser } = UserAuth();
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!currentUser) {
      navigate("/Login");
    }
  }, [currentUser, navigate]);

  return (
    <motion.div   
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -50 }}
    transition={{ duration: 0.5 }}>
      <div className="table-head">
        <div className="mx-auto md:flex md:justify-between min-h-screen lg:max-w-4xl xl:max-w-6xl xl:items-center pt-20">
          <div className="table-left lg:w-1/2">
            <h2 className="text-2xl lg:text-4xl xl:text-5xl text-center font-extrabold font-david-libre md:text-3xl tracking-wide">
              <span className="xl:text-6xl text-orange-500 ">Make </span> your
              dining exprience Memoriable.
            </h2>
            <p className="leading-loose text-center first-letter:text-slate-900 md:my-6 my-3">
              Welcome to the table booking system of our website. You can choose
              your table for you and your famaily. You can found variety of
              table in this segments here. Enjoy your day with our delicious &
              nutrition's food.
            </p>
            <div className="buttons flex justify-center space-x-6 my-4">
              <Link
                to="/Menu"
                className="inline-block transition-transform duration-300 transform-gpu hover:scale-110"
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-white bg-black rounded-full font-david-libre border-box w-28 p-2 text-lg transition-transform duration-300 transform-gpu"
                >
                  Menu
                </motion.button>
              </Link>
              <ScrollLink
                smooth={true}
                duration={800}
                spy={true}
                exact="true"
                offset={-80}
                to="Tables"
              >
                <Button buttonText="Book a Table" />
              </ScrollLink>
            </div>
          </div>
          <div className="table-right-image my-2 lg:w-4/12">
            <img
              src="/img/table.jpg"
              alt=""
              className="object-cover h-[460px] rounded-md"
            />
          </div>
        </div>
        {/* <Link to="/Tables"> */}
        <div className="bg-black bg-opacity-5" id="Tables">
          <div className="tables-container">
            <div className="heading">
              <h2 className="text-3xl font-bold font-david-libre text-center sm:text-5xl md:p-8">
                Book your Table with us.
              </h2>
            </div>
            <div className="boxes flex justify-around">
              <div className="box1 flex p-4 space-x-2">
                <p className="font-bold">Booked</p>
                <div className="box1 h-8 w-8 bg-red-600 font-bold"></div>
              </div>

              <div className="box2 flex p-4 space-x-2">
                <p className="font-bold">Available</p>
                <div className="box1 h-8 w-8 bg-black font-bold"></div>
              </div>
            </div>
            <div className="table-items">
              <div className="flex justify-between overflow-scroll px-28 space-x-40 py-10 sm:px-20 md:px-36 no-scrollbar ">
                {/* <!-- --------------table ------- 1 --------------- --> */}
                <div className="flex-none">
                  <Link to="/TableBookingForm/1">
                    <motion.div
                      className="table1 flex justify-center my-8 relative m-auto"
                      whileHover={{ scale: 1.5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <div className="box h-56 w-32 rounded-2xl shadow-lg shadow-gray-400 border-b-8 border-black text-center p-4 bg-white cursor-pointer">
                        <span className="font-bold text-xl border-black border-b-4">
                          01
                        </span>
                      </div>
                      <div className="chair h-16 w-8 rounded-r-3xl absolute top-6 ml-40 bg-black cursor-pointer"></div>
                      <div className="chair h-16 w-8 rounded-r-3xl absolute top-32 ml-40 bg-black cursor-pointer"></div>
                      <div className="chair h-16 w-8 rounded-l-3xl absolute top-32 -ml-40 bg-black cursor-pointer"></div>
                      <div className="chair h-16 w-8 rounded-l-3xl absolute top-6 -ml-40 bg-black cursor-pointer"></div>
                    </motion.div>
                  </Link>
                </div>
                {/* <!-- ---------------Table 2 ----------------------------------- --> */}
                <Link to="/TableBookingForm/2">
                  <motion.div
                    className="table2 flex justify-center relative sm:flex-none my-10 mx-14"
                    whileHover={{ scale: 1.3 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <div className="box h-52 w-52 bg-white z-10 shadow-md text-center rounded-full py-4 cursor-pointer">
                      <span className="font-bold text-xl my-auto border-black border-b-4">
                        02
                      </span>
                    </div>
                    <div className="chair1 absolute bg-black w-20 h-10 -mt-7 z-0 rounded-t-3xl cursor-pointer"></div>
                    <div className="chair2 absolute bg-black w-10 h-20 mt-16 z-0 rounded-r-3xl -mr-56 cursor-pointer"></div>
                    <div className="chair3 absolute bg-black w-20 h-10 z-0 rounded-b-3 rounded-b-3xl top-48 cursor-pointer"></div>
                    <div className="chair4 absolute bg-black w-10 h-20 mt-16 rounded-l-3xl -ml-56 z-0 cursor-pointer"></div>
                  </motion.div>
                </Link>
                {/* <!-- ----------------------Table 3 ------------------------- --> */}
                <Link to="/TableBookingForm/3">
                  <motion.div
                    className="table3 flex justify-center relative my-16 sm:flex-none mx-10"
                    whileHover={{ scale: 1.5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <div className="box h-48 w-32 border-b-8 border-black rounded-xl shadow-md  bg-white text-center py-4 z-10">
                      <span className="font-bold text-center text-xl border-black border-b-4">
                        03
                      </span>
                    </div>
                    <div className="chair h-16 w-8 absolute bg-black ml-36 mt-16 rounded-r-xl z-0"></div>
                    <div className="chair h-16 w-8 absolute bg-black mr-36 mt-16 rounded-l-xl z-0"></div>
                  </motion.div>
                </Link>
              </div>

              <div className="flex justify-between overflow-scroll px-28 space-x-40 sm:px-20 md:px-36 no-scrollbar">
                {/* <!-- -------------Table 4--------------------------- --> */}
                <div className="">
                  <Link to="/TableBookingForm/4">
                    <motion.div
                      className="table4 mx-auto my-8 flex justify-center relative m-auto sm:flex-none"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <div className="box h-80 w-32 rounded-2xl shadow-lg shadow-gray-400 border-b-8 border-black text-center p-4 bg-white">
                        <span className="font-bold text-xl border-black border-b-4">
                          04
                        </span>
                      </div>
                      <div className="chair h-16 w-8 rounded-r-3xl absolute top-6 ml-40 bg-black"></div>
                      <div className="chair h-16 w-8 rounded-r-3xl absolute top-32 ml-40 bg-black"></div>
                      <div className="chair h-16 w-8 rounded-r-3xl absolute top-56 ml-40 bg-black"></div>
                      <div className="chair h-16 w-8 rounded-l-3xl absolute top-32 -ml-40 bg-black"></div>
                      <div className="chair h-16 w-8 rounded-l-3xl absolute top-56 -ml-40 bg-black"></div>
                      <div className="chair h-16 w-8 rounded-l-3xl absolute top-6 -ml-40 bg-black"></div>
                    </motion.div>
                  </Link>
                </div>
                {/* <!-- -----------------------Table 5----------------------------- --> */}
                <Link to="/TableBookingForm/5">
                  <motion.div
                    className="table5 flex justify-center my-28 relative sm:flex-none sm:my-20"
                    whileHover={{ scale: 1.3 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <div className="box h-52 w-52 bg-white z-10 shadow-md text-center rounded-full py-4 cursor-pointer">
                      <span className="font-bold text-xl my-auto border-black border-b-4">
                        05
                      </span>
                    </div>
                    <div className="chair1 absolute bg-black w-20 h-10 -mt-7 z-0 rounded-t-3xl cursor-pointer"></div>
                    <div className="chair2 absolute bg-black w-10 h-20 mt-16 z-0 rounded-r-3xl -mr-56 cursor-pointer"></div>
                    <div className="chair3 absolute bg-black w-20 h-10 z-0 rounded-b-3 rounded-b-3xl top-48 cursor-pointer"></div>
                    <div className="chair4 absolute bg-black w-10 h-20 mt-16 rounded-l-3xl -ml-56 z-0 cursor-pointer"></div>
                  </motion.div>
                </Link>
                {/* <!-- -------------------------------Table 6-------------------------- --> */}
                <Link to="/TableBookingForm/6">
                  <motion.div
                    className="table3 flex justify-center relative my-16 sm:flex-none"
                    whileHover={{ scale: 1.5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <div className="box h-48 w-32 border-b-8 border-black rounded-xl shadow-md  bg-white text-center py-4 z-10">
                      <span className="font-bold text-center text-xl border-black border-b-4">
                        06
                      </span>
                    </div>
                    <div className="chair h-16 w-8 absolute bg-black ml-36 mt-16 rounded-r-xl z-0"></div>
                    <div className="chair h-16 w-8 absolute bg-black mr-36 mt-16 rounded-l-xl z-0"></div>
                  </motion.div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* </Link> */}
      </div>
    </motion.div>
  );
};

export default TableBooking;
