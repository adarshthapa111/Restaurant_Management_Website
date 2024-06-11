import { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { ref, get, orderByChild, equalTo } from "firebase/database";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { signOut as firebaseSignOut } from "firebase/auth";
import { auth } from "../firebase";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const Profile = () => {
  const { user: currentUser } = UserAuth();
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        try {
          // Fetch user data from Realtime Database
          const dbRef = ref(db, `users/${currentUser.uid}`);
          const snapshot = await get(dbRef);

          if (snapshot.exists()) {
            setUserData(snapshot.val());
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [currentUser]);

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
      }
    });
  };

  useEffect(() => {
    if (!currentUser) {
      navigate("/Login");
    }
  }, [currentUser, navigate]);

  return (
    <div className="bg-gray-100">
      <div className=" pt-24 p-2 min-h-screen max-w-6xl mx-auto ">
        {/* <h2 className="font-david-libre text-2xl font-bold xl:text-4xl p-4 text-center">
        Profile
      </h2> */}
        <div className="py-10 text-2xl font-light shadow-md rounded-md">
          {userData && (
            <div>
              <div>
                <p className="font-david-libre font-semibold text-2xl md:text-3xl lg:text-4xl text-center">
                  {" "}
                  Welcome Dear,{" "}
                  <span className="text-orange-400">
                    {" "}
                    {userData.firstName} {userData.lastName}
                  </span>
                </p>
              </div>
              <div className="p-10">
                <p className="font-david-libre">
                  {" "}
                  <span className="text-orange-400 "> Email:</span>{" "}
                  {currentUser.email}
                </p>
              </div>
              <div className="md:flex justify-between p-4 md:px-10 space-x-4 capitalize mb-10 font-david-libre">
                <p>
                  <span className="text-orange-400"> First Name:</span>{" "}
                  {userData.firstName}
                </p>
                <p>
                  <span className="text-orange-400 "> Last Name:</span>{" "}
                  {userData.lastName}
                </p>
              </div>
              <div className="text-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-white bg-orange-400 rounded-full font-david-libre w-36 p-2 text-lg shadow-lg shadow-gray-200 mr-2 mx-auto hover:font-semibold"
                  onClick={handleSignOut}
                >
                  Log Out
                </motion.button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

// import { useEffect, useState } from "react";
// import { UserAuth } from "../context/AuthContext";
// import { ref, get } from "firebase/database";
// import { db } from "../firebase";
// import { useNavigate } from "react-router-dom";
// import { signOut as firebaseSignOut } from "firebase/auth";
// import { auth } from "../firebase";
// import { motion } from "framer-motion";

// const Profile = () => {
//   const { user: currentUser } = UserAuth();
//   const [userData, setUserData] = useState(null);
//   const navigate = useNavigate();
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       if (currentUser) {
//         try {
//           // Fetch user data from Realtime Database
//           const dbRef = ref(db, `users/${currentUser.uid}`);
//           const snapshot = await get(dbRef);

//           if (snapshot.exists()) {
//             setUserData(snapshot.val());
//           }
//         } catch (error) {
//           console.error("Error fetching user data:", error);
//         }
//       }
//     };

//     fetchUserData();
//   }, [currentUser]);

//   const handleSignOut = async () => {
//     try {
//       console.log("Signing out...", currentUser);
//       await firebaseSignOut(auth);
//       console.log("Sign out successful.");
//       navigate("/");
//       window.location.reload();
//     } catch (error) {
//       console.error("Error signing out:", error);
//       setError(error.message);
//     }
//   };

//   useEffect(() => {
//     if (!currentUser) {
//       navigate("/");
//     }
//   }, [currentUser, navigate]);

//   return (
//     <div className="bg-gray-100 pt-24 p-2 min-h-screen">
//       <h2 className="font-david-libre text-2xl font-bold xl:text-4xl p-4 text-center">
//         Profile
//       </h2>
//       <div className="bg-white max-w-5xl mx-auto py-10 text-2xl font-light shadow-md rounded-md">
//         {userData && (
//           <div>
//             <div>
//               <p className="font-david-libre font-semibold text-2xl md:text-3xl lg:text-4xl text-center">
//                 {" "}
//                 Welcome,{" "}
//                 <span className="text-orange-400">
//                   {" "}
//                   {currentUser.displayName}
//                 </span>
//               </p>
//             </div>
//             <div className="p-10">
//               <p className="font-david-libre">
//                 {" "}
//                 <span className="text-orange-400 "> Email:</span>{" "}
//                 {currentUser.email}
//               </p>
//             </div>
//             <div className="md:flex justify-between p-4 md:px-10 space-x-4 capitalize mb-10 font-david-libre">
//               <p>
//                 <span className="text-orange-400"> First Name:</span>{" "}
//                 {userData.firstName}
//               </p>
//               <p>
//                 <span className="text-orange-400 "> Last Name:</span>{" "}
//                 {userData.lastName}
//               </p>
//             </div>
//             <div className="text-center">
//               <motion.button
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//                 className="text-white bg-orange-400 rounded-full font-david-libre w-36 p-2 text-lg shadow-lg shadow-gray-200 mr-2 mx-auto hover:font-semibold"
//                 onClick={handleSignOut}
//               >
//                 Log Out
//               </motion.button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Profile;
