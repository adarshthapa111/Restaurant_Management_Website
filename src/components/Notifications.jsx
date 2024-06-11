

import { useState, useEffect } from "react";
import { auth, db } from "../firebase"; // assuming you have a firebase config file
import { ref, onValue, update } from "firebase/database";
import Swal from "sweetalert2";

const Notifications = () => {
  const [tableBookings, setTableBookings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTableBookings = () => {
      const userId = auth.currentUser ? auth.currentUser.uid : null;
      if (userId) {
        const tableBookingsRef = ref(db, `tableBooking/${userId}`);
        onValue(tableBookingsRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const userTableBookings = Object.keys(data)
            .filter((key) => data[key].status !== "cancelled")
            .map((key) => ({
              id: key,
              ...data[key],
            }));
            setTableBookings(userTableBookings);
          } else {
            setTableBookings([]);
          }
        });
      }
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchTableBookings();
      } else {
        setTableBookings([]);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleCancel = (booking) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedBooking = { ...booking, status: "cancelled" };
        const updatedBookingsRef = ref(
          db,
          `tableBooking/${auth.currentUser.uid}/${booking.id}`
        );
        update(updatedBookingsRef, updatedBooking)
          .then(() => {
            Swal.fire(
              "Cancelled!",
              "Your booking has been cancelled.",
              "success"
            );
          })
          .catch((error) => {
            console.error("Error cancelling booking:", error);
            Swal.fire(
              "Error!",
              "An error occurred while cancelling your booking. Please try again later.",
              "error"
            );
          });
      }
    });
  };

  return (
    <div className="min-h-screen">
      {tableBookings.length === 0 ? (
        <p className="text-center text-gray-600 font-david-libre font-semibold text-2xl dark:text-gray-400 mt-24">
          No notifications to show
        </p>
      ) : (
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-24 max-w-6xl mx-auto">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Table
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Time
              </th>
              <th scope="col" className="px-6 py-3">
                Occasion
              </th>
              <th scope="col" className="px-6 py-3">
                People
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {tableBookings.map((tableBooking) => (
              <tr
                key={tableBooking.id}
                className="border-b border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-800"
              >
                {console.log(tableBooking.id)}
                <td className="px-6 py-4 whitespace-nowrap">
                  {tableBooking.tableId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {tableBooking.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {tableBooking.time}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {tableBooking.occasion}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {tableBooking.people}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {tableBooking.status}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleCancel(tableBooking)}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      ;
    </div>
  );
};

export default Notifications;
