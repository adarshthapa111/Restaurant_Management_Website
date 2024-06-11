import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { ref as databaseRef, push, get } from "firebase/database";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Alert from "./Alert"; // Import the Alert component
import emailjs from "@emailjs/browser";
import { auth } from "../firebase";

const MAX_SEATS_PER_TABLE = {
  1: 4,
  2: 4,
  3: 2,
  4: 6,
  5: 4,
  6: 2,
};

const TableBookingForm = () => {
  const { id } = useParams();
  const tableId = parseInt(id);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [people, setPeople] = useState("");
  const [occasion, setOccasion] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [conflictError, setConflictError] = useState(null);
  const form = useRef();

  const navigate = useNavigate();

  const checkForConflicts = (bookings, tableId, date, time, people) => {
    const tableBookings = bookings.filter(
      (booking) =>
        booking.tableId === tableId &&
        booking.date === date &&
        booking.time === time
    );
    const totalBookedSeats = tableBookings.reduce(
      (total, booking) => total + booking.people,
      0
    );
    const availableSeats = MAX_SEATS_PER_TABLE[tableId] - totalBookedSeats;

    if (people > availableSeats) {
      return `Only ${availableSeats} seats available for this table at ${time} on ${date}.`;
    }

    return null;
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form inputs
    if (!fullName || !email || !date || !time || people < 1 || people > 10) {
      return;
    }

    const currentUser = auth.currentUser;
    const userId = currentUser ? currentUser.uid : null;

    // Create a new booking object
    const booking = {
      tableId,
      fullName,
      email,
      // date: `${date} ${time}`,
      userId,
      date,
      time,
      people,
      occasion,
      status: "booked",
    };

    try {
      // Fetch existing bookings for the selected date
      const bookingsRef = databaseRef(db, `tableBooking/${userId}`);
      const snapshot = await get(bookingsRef);
      const bookings = [];
      snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val();
        bookings.push(childData);
      });

      // Use the checkForConflicts function here
      const conflictError = checkForConflicts(
        bookings,
        tableId,
        date,
        time,
        people
      );

      if (conflictError) {
        setConflictError(conflictError);
        return;
      }

      // Add booking to Realtime Database
      await push(databaseRef(db, `tableBooking/${userId}`), booking);
      console.log("Booking added with ID: ", booking.date);

      // Email Js
      await emailjs
        .sendForm("service_4ssy2q8", "template_j7gd9er", form.current, {
          publicKey: "6JGV6ItG1V6aRiX2x",
        })
        .then(
          () => {
            console.log("SUCCESS!");
          },
          (error) => {
            console.log("FAILED...", error.text);
          }
        );

      navigate(`/TableConfirmation/${tableId}`, { state: booking });
      // Clear form fields
      setFullName("");
      setEmail("");
      setDate("");
      setTime("");
      setPeople(1);
      setOccasion("");

      // Show success alert
      setShowSuccessAlert(true);

      // Hide success alert after 3 seconds
      setTimeout(() => {
        setShowSuccessAlert(false);
      }, 3000);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const getTableDiv = (tableId) => {
    switch (tableId) {
      case 1:
        return (
          <>
            <motion.div
              className="table1 flex justify-center relative"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              <div className="table1 box h-56 w-32  rounded-2xl shadow-lg shadow-gray-400 border-b-8 border-black text-center p-4 bg-white cursor-pointer">
                <span className="font-bold text-xl border-black border-b-4">
                  01
                </span>
              </div>
              <div className="chair h-16 w-8 rounded-r-3xl absolute top-6 ml-40 bg-black cursor-pointer"></div>
              <div className="chair h-16 w-8 rounded-r-3xl absolute top-32 ml-40 bg-black cursor-pointer"></div>
              <div className="chair h-16 w-8 rounded-l-3xl absolute top-32 -ml-40 bg-black cursor-pointer"></div>
              <div className="chair h-16 w-8 rounded-l-3xl absolute top-6 -ml-40 bg-black cursor-pointer"></div>
            </motion.div>
          </>
        );
      case 2:
        return (
          <div className="table2 flex justify-center relative sm:flex-none my-10 mx-14">
            <div className="box h-52 w-52 p-14 bg-white z-10 shadow-md text-center rounded-full py-4 cursor-pointer">
              <span className="font-bold text-xl my-auto border-black border-b-4">
                02
              </span>
            </div>
            <div className="chair1 absolute bg-black w-20 h-10 -mt-7 z-0 rounded-t-3xl cursor-pointer"></div>
            <div className="chair2 absolute bg-black w-10 h-20 mt-16 z-0 rounded-r-3xl -mr-56 cursor-pointer"></div>
            <div className="chair3 absolute bg-black w-20 h-10 z-0 rounded-b-3 rounded-b-3xl top-48 cursor-pointer"></div>
            <div className="chair4 absolute bg-black w-10 h-20 mt-16 rounded-l-3xl -ml-56 z-0 cursor-pointer"></div>
          </div>
        );
      case 3:
        return (
          <div className="table3 flex justify-center relative my-16 sm:flex-none mx-10">
            <div className="box h-48 w-32 border-b-8 border-black rounded-xl shadow-md  bg-white text-center py-4 z-10">
              <span className="font-bold text-center text-xl border-black border-b-4">
                03
              </span>
            </div>
            <div className="chair h-16 w-8 absolute bg-black ml-36 mt-16 rounded-r-xl z-0"></div>
            <div className="chair h-16 w-8 absolute bg-black mr-36 mt-16 rounded-l-xl z-0"></div>
          </div>
        );
      case 4:
        return (
          <div className="table4 mx-auto my-8 flex justify-center relative m-auto sm:flex-none">
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
          </div>
        );
      case 5:
        return (
          <div className="table5 flex justify-center my-28 relative sm:flex-none sm:my-20">
            <div className="box h-52 w-52 bg-white z-10 shadow-md text-center rounded-full py-4 cursor-pointer">
              <span className="font-bold text-xl my-auto border-black border-b-4">
                05
              </span>
            </div>
            <div className="chair1 absolute bg-black w-20 h-10 -mt-7 z-0 rounded-t-3xl cursor-pointer"></div>
            <div className="chair2 absolute bg-black w-10 h-20 mt-16 z-0 rounded-r-3xl -mr-56 cursor-pointer"></div>
            <div className="chair3 absolute bg-black w-20 h-10 z-0 rounded-b-3 rounded-b-3xl top-48 cursor-pointer"></div>
            <div className="chair4 absolute bg-black w-10 h-20 mt-16 rounded-l-3xl -ml-56 z-0 cursor-pointer"></div>
          </div>
        );
      case 6:
        return (
          <div className="table6 flex justify-center relative my-16 sm:flex-none">
            <div className="box h-48 w-32 border-b-8 border-black rounded-xl shadow-md  bg-white text-center py-4 z-10">
              <span className="font-bold text-center text-xl border-black border-b-4">
                06
              </span>
            </div>
            <div className="chair h-16 w-8 absolute bg-black ml-36 mt-16 rounded-r-xl z-0"></div>
            <div className="chair h-16 w-8 absolute bg-black mr-36 mt-16 rounded-l-xl z-0"></div>
          </div>
        );
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Helper function to pad single digit hour or minute with zero
  const padZero = (number) => {
    return number < 10 ? `0${number}` : number.toString();
  };

  const getCurrentDate = () => {
    const today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; // January is 0!
    const yyyy = today.getFullYear();

    if (dd < 10) {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }

    return yyyy + "-" + mm + "-" + dd;
  };

  const generateTimeOptions = () => {
    const options = [];

    // Loop through each hour from 5 PM (17:00) to 10 PM (22:00)
    for (let hour = 17; hour <= 23; hour++) {
      // Loop through each minute interval within the hour
      for (let minute = 0; minute < 60; minute += 60) {
        const hourFormatted = padZero(hour % 12); // Convert to 12-hour format
        const minuteFormatted = padZero(minute); // Ensure minutes are padded with zero

        // Determine AM/PM based on hour
        const period = hour >= 12 ? "PM" : "AM";

        // Construct the time string
        const time = `${hourFormatted}:${minuteFormatted} ${period}`;

        // Push the option to the options array
        options.push(
          <option key={time} value={time}>
            {time}
          </option>
        );
      }
    }

    return options;
  };

  return (
    <>
      {conflictError && (
        <Alert
          type="error"
          message={conflictError}
          onClose={() => setConflictError(null)}
        />
      )}
      <motion.div
        className="min-h-screen bg-gray-100"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.8 }}
      >
        <div className="lg:flex max-w-5xl mx-auto items-center justify-between">
          <div className="lg:w-1/2">
            <div className="">{getTableDiv(tableId)}</div>
          </div>
          <div className="lg:w-1/2 xl:w-9/12">
            <div className="min-h-screen  bg-gray-100 flex items-center justify-center pt-20">
              <form
                onSubmit={handleSubmit}
                // action="/submit"
                ref={form}
                // method="post"
                className="bg-white shadow-md w-full rounded-xl px-8 pt-6 pb-8 mb-4 md:max-w-2xl"
              >
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="name"
                  >
                    Full Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder:text-gray-400 focus:ring-2 focus:ring-gray-400 sm:text-sm"
                    id="name"
                    placeholder="Enter your Full name..."
                    type="text"
                    name="user_fullname"
                    required
                    onChange={(e) => setFullName(e.target.value)}
                    value={fullName}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-3 px-3 placeholder:text-gray-400 focus:ring-2 focus:ring-gray-400 sm:text-sm md:text-md text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    name="user_email"
                    placeholder="Enter your email..."
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="date"
                  >
                    Date
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="date"
                    type="date"
                    name="user_date"
                    required
                    onChange={(e) => setDate(e.target.value)}
                    value={date}
                    min={getCurrentDate()}
                  />
                </div>
                <div className="mb-4 relative">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="time"
                  >
                    Time
                  </label>
                  <div className="relative">
                    <select
                      className="shadow appearance-none border rounded w-full py-3 px-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="time"
                      type="text"
                      name="user_time"
                      required
                      onChange={(e) => setTime(e.target.value)}
                      value={time}
                    >
                      {/* Populate options for time intervals */}
                      <option value="">Select a time</option>
                      {generateTimeOptions()}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 12l-5-5 1.5-1.5L10 9l3.5-3.5L15 7z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="mb-4 relative">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="people"
                  >
                    Number of People
                  </label>
                  <div className="relative">
                    <select
                      className="shadow appearance-none border rounded w-full py-3 px-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-md"
                      id="people"
                      name="user_people"
                      type="number"
                      value={people}
                      onChange={(e) => setPeople(parseInt(e.target.value))}
                      required
                    >
                      <option value="">Select number of people</option>
                      <option value="1">1 person</option>
                      <option value="2">2 people</option>
                      <option value="3">3 people</option>
                      <option value="4">4 people</option>
                      <option value="5">5 people</option>
                      <option value="6">6 people</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 12l-5-5 1.5-1.5L10 9l3.5-3.5L15 7z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="mb-4 relative">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="occasion"
                  >
                    Occasion (optional)
                  </label>
                  <div className="relative">
                    <select
                      className="shadow appearance-none border rounded w-full py-3 px-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-md"
                      id="occasion"
                      name="user_function"
                      onChange={(e) => setOccasion(e.target.value)}
                      value={occasion}
                      type="text"
                    >
                      <option value="">Select an occasion</option>
                      <option value="Family Gathering">Family Gathering</option>
                      <option value="Birthday Party">Birthday Party</option>
                      <option value="Anniversary">Anniversary</option>
                      <option value="Business Meeting">Business Meeting</option>
                      <option value="Personal Things">Personal things</option>
                      <option value="Others">Other</option>
                      {/* Add more options as needed */}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 12l-5-5 1.5-1.5L10 9l3.5-3.5L15 7z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <button
                    className="bg-orange-400 hover:bg-orange-500 text-white w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
      {showSuccessAlert && (
        <div className="fixed inset-x-0 bottom-0 z-50 p-4 bg-green-500 text-white text-center">
          Table booking successful!
        </div>
      )}
    </>
  );
};

export default TableBookingForm;
