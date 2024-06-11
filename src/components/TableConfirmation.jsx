
import { useParams, Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
const TableConfirmation = () => {
  
  const { id } = useParams();
  const { state } = useLocation();
  const booking = state || {};

  return (
    <motion.div
      className="min-h-screen bg-gray-100 flex items-center justify-center py-24"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.7 }}
    >
      <div className="w-full xl:max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-4">
          <motion.h2
            className="text-3xl font-bold text-gray-800 text-center mb-6 font-david-libre"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            Table Confirmation
          </motion.h2>
          <motion.div
            className="bg-green-100 border-l-8 border-green-500 text-green-700 p-4 mb-8 w-full xl:max-w-3xl mx-auto rounded-lg shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-lg font-semibold">Booking Confirmed!</p>
            <p>
              Dear {booking.fullName}, your table has been successfully booked
              for {booking.people} people on {booking.date} at {booking.time}. 
              We look forward to hosting you for this {booking.function}!
            </p>
          </motion.div>
          {/* Rest of your content */}
          <div className="flex justify-center lg:justify-end mt-4">
            <motion.div
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Link
                to="/"
                state={booking}
                className="bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-300"
              >
                Thanks 
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TableConfirmation;

