import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { db, auth } from "../firebase";
import { ref, onValue, set } from "firebase/database";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard, faWallet } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const DeliveryForm = () => {
  // const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [fullname, setFullname] = useState();
  const [location, setLocation] = useState();
  const [email, setEmail] = useState();
  const [phonenumber, setPhonenumber] = useState();
  const [cartItems, setCartItems] = useState([]);
  const [foodDetails, setFoodDetails] = useState([]);
  const { subtotal } = useParams();

  
  useEffect(() => {
    const fetchCartItems = () => {
      const userId = auth.currentUser ? auth.currentUser.uid : null;
      if (userId) {
        const cartItemsRef = ref(db, `CartItems/${userId}`);
        onValue(cartItemsRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const userCartItems = Object.keys(data).map((key) => ({
              id: key,
              ...data[key],
            }));
            setCartItems(userCartItems);
            const foodDetails = userCartItems.map(item => ({
              foodName: item.name,
              quantity: item.quantity
            }));
            setFoodDetails(foodDetails);
          } else {
            setCartItems([]);
            setFoodDetails([]);
          }
        });
      }
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchCartItems();
      } else {
        setCartItems([]);
        setFoodDetails([]);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);



  //   const subtotal = calculateSubtotal(cartItems);
  const total = parseInt(subtotal) + 100;

  // const handlePayment = async(e) => {
  //   e.preventDefault();
  //   const payload = {
  //     "return_url": "http://localhost:5173/",
  //     "website_url": "http://localhost:5173/",
  //     // "amount": 1300,
  //     "amount": total*100,
  //     "purchase_order_id": "test12",
  //     "purchase_order_name": "test",
  //     "customer_info": {
  //         "name": "Khalti Bahadur",
  //         "email": "example@gmail.com",
  //         "phone": "9800000123"
  //     }
  //   }
  //   const url = "http://localhost:8000/khalti-api";
  //   const response = await axios.post(url, payload)
  //   console.log(response);
  //   if(response){
  //     window.location.href= `${response?.data?.data?.payment_url}`
  //   }

  // };

  

  const handlePayment = async (e) => {
    e.preventDefault();

    const userRef = ref(db, "deliveryForm/" + new Date().getTime());
    const formData = {
      fullname,
      email,
      location,
      phonenumber,
      subtotal,
      total,
      cartItems:foodDetails,
    };

    try {
      await set(userRef, formData);
      console.log("Data saved successfully!");

      const payload = {
        return_url: "http://localhost:5173/PaymentSuccess",
        website_url: "http://localhost:5173/",
        amount: total * 100,
        purchase_order_id: "test12",
        purchase_order_name: "test",
        customer_info: {
          name: fullname,
          email: email,
          phone: phonenumber,
        },
      };
      const url = "http://localhost:8000/khalti-api";
      const response = await axios.post(url, payload);
      if (response) {
        window.location.href = `${response.data.data.payment_url}`;
      }
    } catch (error) {
      console.error("Error saving data or processing payment: ", error);
      alert("There was an error processing your request. Please try again.");
    }
  };

  return (
    <>
      <motion.div
        className="bg-gray-200"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
      >
        <div className="pt-3 ">
          <form
            // onSubmit={handleSubmit}
            className="lg:flex max-w-6xl mx-auto lg:justify-between min-h-screen lg:items-center"
          >
            <div className="lg:w-1/2">
              <h1 className="font-david-libre lg:text-4xl font-semibold  pb-6">
                {" "}
                Delivery Information
              </h1>
              <div className="mb-6">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your full name..."
                  name="name"
                  onChange={(e) => setFullname(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email..."
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  placeholder="Enter your full location..."
                  name="location"
                  onChange={(e) => setLocation(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="Enter your phone number..."
                  name="phone number"
                  onChange={(e) => setPhonenumber(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
                  required
                />
              </div>
            </div>

            <div className="lg:w-2/5">
              <h2 className="font-david-libre lg:text-4xl font-semibold mb-6">
                Cart Totals
              </h2>
              <div className="flex justify-between mb-4 border-b">
                <p className="text-2xl font-light">Subtotal</p>
                <p className="text-2xl font-light">Rs.{subtotal}</p>
                {/* <p className="text-2xl font-light">Rs.200</p> */}
              </div>
              <hr className="border-black mb-4" />
              <div className="flex justify-between mb-4">
                <p className="text-2xl font-light">Delivery Fee</p>
                <p className="text-2xl font-light">Rs.100</p>
              </div>
              <hr className="border-black mb-4" />
              <div className="flex justify-between mb-12 font-bold">
                <p className="text-3xl ">Total</p>
                <p className="text-3xl ">Rs.{total}</p>
              </div>

              <motion.button
                onClick={handlePayment}
                type="submit"
                className=" text-white hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-xl font-semibold w-full px-5 py-4 bg-orange-400 font-david-libre"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Pay Via Khalti
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </>
  );
};

export default DeliveryForm;
