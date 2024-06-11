// import React from "react";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Homepage from "./components/Homepage";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TableBooking from "./components/TableBooking";
import Login from "./components/Login";
import Register from "./components/Register";
import Nutritions from "./components/Nutritions";
import { AuthContextProvider } from "./context/AuthContext";
import ForgotPass from "./components/ForgotPass";
import Error from "./components/Error";
import OnlineOrder from "./components/OnlineOrder";
import FoodDetail from "./components/FoodDetail";
import NutritionCalculator from "./components/NutritionCalculator";
import Admin from "./Admin/Admin";
import AddFoodItem from "./components/AddFoodItem";
// import AdminNavbar from "./components/AdminNavbar";
import FavouriteFood from "./components/FavouriteFood";
import AddToCart from "./components/AddToCart";
import TableBookingForm from "./components/TableBookingForm";
import TableConfirmation from "./components/TableConfirmation";
import Profile from "./components/Profile";
import FoodItems from "./Admin/FoodItems";
import DeliveryForm from "./components/DeliveryForm";
import OrderNotification from "./Admin/OrderNotification";
import Reservations from "./Admin/Reservations";
import Notifications from "./components/Notifications";
import Home from "./components/Home";
import AllOrder from "./Admin/AllOrder";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AboutFoodDesc from "./components/AboutFoodDesc";
import PaymentSuccess from "./components/PaymentSuccess";

const App = () => {
  return (
    <>
      <AuthContextProvider>
        <Router>
          <Routes>
            {/* Route to different pages are here */}
            <Route
              exact
              path="/"
              element={
                <>
                  <Navbar />
                  {/* <Homepage /> */}
                  <Home />
                  {/* <Menu/> */}
                  <Footer />
                </>
              }
            />
            <Route
              path="/About"
              element={
                <>
                  <Navbar />
                  <About />
                  <Footer />
                </>
              }
            />
            <Route
              path="/AboutFoodDesc"
              element={
                <>
                  <Navbar />
                  <AboutFoodDesc />
                  <Footer />
                </>
              }
            />
            <Route
              path="/Menu"
              element={
                <>
                  <Navbar />
                  <Menu />
                  <Footer />
                </>
              }
            />
            <Route
              path="/Nutrition"
              element={
                <>
                  <Navbar />
                  <Nutritions />
                  <Footer />
                </>
              }
            />
            <Route
              path="/TableBooking"
              element={
                <>
                  <Navbar />
                  <TableBooking />
                  <Footer />
                </>
              }
            />
            <Route
              path="/OnlineOrder"
              element={
                <>
                  <Navbar />
                  <OnlineOrder />
                  <Footer />
                </>
              }
            />
            <Route
              path="/FoodDetail/:id"
              element={
                <>
                  <Navbar />
                  <FoodDetail />
                  <Footer />
                </>
              }
            />
            <Route
              path="/NutritionCalculator/:id"
              element={
                <>
                  <Navbar />
                  <NutritionCalculator />
                  <Footer />
                </>
              }
            />
            <Route
              path="/Admin"
              element={
                <>
                  {/* <AdminNavbar /> */}
                  <Admin />
                  {/* <Footer /> */}
                </>
              }
            />
            <Route
              path="/FavouriteFood"
              element={
                <>
                  <Navbar />
                  <FavouriteFood />
                  <Footer />
                </>
              }
            />
            <Route
              path="/addtocart"
              element={
                <>
                  <Navbar />
                  <AddToCart />
                  <Footer />
                </>
              }
            />
            <Route
              path="/Notifications"
              element={
                <>
                  <Navbar />
                  <Notifications />
                  <Footer />
                </>
              }
            />
            <Route
              path="/profile"
              element={
                <>
                  <Navbar />
                  <Profile />
                  <Footer />
                </>
              }
            />
            <Route
              path="/delivery-form/:subtotal"
              element={
                <>
                  <Navbar />
                  <DeliveryForm />
                  <Footer />
                </>
              }
            />

            <Route
              path="/TableBookingForm/:id"
              element={
                <>
                  <Navbar />
                  <TableBookingForm />
                  <Footer />
                </>
              }
            />
            <Route
              path="/TableConfirmation/:id"
              element={
                <>
                  <Navbar />
                  <TableConfirmation />
                  <Footer />
                </>
              }
            />
            <Route path="/AddFoodItem" element={<AddFoodItem />} />
            <Route path="/Reservations" element={<Reservations />} />
            <Route path="/AllOrders" element={<AllOrder />} />
            <Route path="/reservations" element={<Reservations />} />
            <Route path="/OrderNotifications" element={<OrderNotification />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/ForgotPass" element={<ForgotPass />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Error" element={<Error />} />
            <Route path="/Admin" element={<Admin />} />
            <Route path="/FoodItems" element={<FoodItems />} />
            <Route path="/PaymentSuccess" element={<PaymentSuccess />} />
          </Routes>
          <ToastContainer />
        </Router>
      </AuthContextProvider>
    </>
  );
};

export default App;
