// import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHome, faUtensils, faBox, faBell, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';


// const AdminNavbar = () => {

//   return (
//     <div className="">
//       <div className="bg-gray-800 h-full w-64 fixed top-0 left-0 overflow-y-auto">
//       <div className="p-4">
//         <h1 className="text-white text-2xl font-bold font-david-libre">Admin</h1>
//       </div>
//       <nav className="text-white font-david-libre font-semibold">
//         <ul className="space-y-3">
//           <li className="py-2 px-4 hover:bg-gray-700">
//             <Link to="/Admin" className="flex items-center space-x-4">
//               <FontAwesomeIcon icon={faHome} />
//               <span>Home</span>
//             </Link>
//           </li>
//           <li className="py-2 px-4 hover:bg-gray-700">
//             <Link to="/AddFoodItem" className="flex items-center space-x-4">
//               <FontAwesomeIcon icon={faUtensils} />
//               <span>Add Food</span>
//             </Link>
//           </li>
//           <li className="py-2 px-4 hover:bg-gray-700">
//             <Link to="/FoodItems" className="flex items-center space-x-4">
//               <FontAwesomeIcon icon={faBox} />
//               <span>Food Items</span>
//             </Link>
//           </li>
//           <li className="py-2 px-4 hover:bg-gray-700">
//             <Link to="/Reservations" className="flex items-center space-x-4">
//               <FontAwesomeIcon icon={faBell} />
//               <span>Resevations</span>
//             </Link>
//           </li>
//           <li className="py-2 px-4 hover:bg-gray-700">
//             <Link to="/OrderNotifications" className="flex items-center space-x-4">
//               <FontAwesomeIcon icon={faBell} />
//               <span>All orders</span>
//             </Link>
//           </li>
//           <li className="py-2 px-4 hover:bg-gray-700">
//             <Link to="/logout" className="flex items-center space-x-4">
//               <FontAwesomeIcon icon={faSignOutAlt} />
//               <span>Logout</span>
//             </Link>
//           </li>
//         </ul>
//       </nav>
//     </div>
//     </div>
//   );
// };

// export default AdminNavbar;
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUtensils, faBox, faBell, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { signOut as firebaseSignOut } from "firebase/auth";
import { UserAuth } from "../context/AuthContext";
import { auth } from "../firebase";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";
const AdminNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // const { user: currentUser } = UserAuth();
  const [error, setError] = useState(null);

  const handleSignOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out ⇤",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, log out",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await firebaseSignOut(auth);
          console.log("Sign out successful.");
          navigate("/");
          window.location.reload();
        } catch (error) {
          console.error("Error signing out:", error);
          setError(error.message);
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        navigate("/Admin");
      }
    });
  };

  // useEffect(() => {
  //   if (!currentUser) {
  //     navigate("/");
  //   }
  // }, [currentUser, navigate]);

  return (
    <div className="bg-gray-800 h-full w-64 fixed top-0 left-0 overflow-y-auto">
      <div className="p-4">
        <h1 className="text-white text-2xl font-bold font-david-libr ">Admin</h1>
      </div>
      <nav className="text-white font-david-libre font-semibold">
        <ul className="flex-col space-y-8  font-inter p-2">
          <li className="cursor-pointer">
            <Link
              to="/Admin"
              className={
                location.pathname === "/Admin"
                  ? "font-bold bg-white text-black rounded-full px-6 py-4"
                  : "px-6 py-4"
              }
            >
              <FontAwesomeIcon icon={faHome} className="mr-2" />
              Home
            </Link>
          </li>
          <li className="cursor-pointer">
            <Link
              to="/AddFoodItem"
              className={
                location.pathname === "/AddFoodItem"
                ? "font-bold bg-white text-black rounded-full px-6 py-4"
                : "px-6 py-4"
              }
            >
              <FontAwesomeIcon icon={faUtensils} className="mr-2" />
              Add Food
            </Link>
          </li>
          <li className="cursor-pointer">
            <Link
              to="/FoodItems"
              className={
                location.pathname === "/FoodItems"
                ? "font-bold bg-white text-black rounded-full px-6 py-4"
                : "px-6 py-4"
              }
            >
              <FontAwesomeIcon icon={faBox} className="mr-2" />
              Food Items
            </Link>
          </li>
          <li className="cursor-pointer">
            <Link
              to="/Reservations"
              className={
                location.pathname === "/Reservations"
                ? "font-bold bg-white text-black rounded-full px-6 py-4"
                : "px-6 py-4"
              }
            >
              <FontAwesomeIcon icon={faBell} className="mr-2" />
              Reservations
            </Link>
          </li>
          <li className="cursor-pointer">
            <Link
              to="/AllOrders"
              className={
                location.pathname === "/AllOrders"
                ? "font-bold bg-white text-black rounded-full px-6 py-4"
                : "px-6 py-4"
              }
            >
              <FontAwesomeIcon icon={faBell} className="mr-2" />
              All orders
            </Link>
          </li>
          <li className="cursor-pointer">
            <Link
              to="/logout"
              className={
                location.pathname === "/logout"
                ? "font-bold bg-white text-black rounded-full px-6 py-4"
                : "px-6 py-4"
              }
              onClick={handleSignOut}
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminNavbar;
