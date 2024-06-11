import React, { useState, useEffect } from "react";
import { ref, get, remove, onValue } from "firebase/database";
import { db, auth } from "../firebase";
import Swal from "sweetalert2";
import AdminNavbar from "./AdminNavbar";
const Reservations = () => {
  const [tableBookings, setTableBookings] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTableBookings = () => {
      const tableBookingsRef = ref(db, "tableBooking");
      onValue(
        tableBookingsRef,
        (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const allTableBookings = Object.values(data).flatMap((user) =>
              Object.values(user)
            );
            setTableBookings(allTableBookings);
            setLoading(false);
          } else {
            setTableBookings([]);
            setLoading(false);
          }
        },
        (error) => {
          setError(error.message);
          setLoading(false);
        }
      );
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchTableBookings();
      } else {
        setTableBookings([]);
        setLoading(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleDeleteReservation = (tableBookingId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const tableBookingRef = ref(db, `tableBooking/${tableBookingId}`);
        remove(tableBookingRef)
          .then(() => {
            Swal.fire(
              "Deleted!",
              "The reservation has been deleted.",
              "success"
            );
            setTableBookings((prevTableBookings) =>
              prevTableBookings.filter(
                (booking) => booking.id !== tableBookingId
              )
            );
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "An error occurred while deleting the reservation. Please try again later.",
            });
            console.error("Error deleting reservation:", error);
          });
      }
    });
  };

  return (
    <>
      <AdminNavbar />
      <div className="ml-64">
        <div className="font-david-libre text-2xl xl:text-4xl font-semibold p-4 text-center">
          All Reservations Are Listed Here
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 ">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Full Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Occasion
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                People
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 text-gray-500 text-sm">
            {tableBookings.map((booking) => (
              <tr key={booking.id}>
                <td className="px-6 py-4 whitespace-nowrap capitalize">
                  {booking.fullName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{booking.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{booking.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">{booking.time}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {booking.occasion}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {booking.people}
                </td>
                <td
                  className={`px-6 py-4 whitespace-nowrap ${
                    booking.status === "cancelled"
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {booking.status}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => handleDeleteReservation(booking.id)}
                    className="text-white bg-red-500 p-2 rounded-lg font-medium hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Reservations;
