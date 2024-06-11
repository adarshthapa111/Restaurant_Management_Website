// import AdminNavbar from "./AdminNavbar";
// import { useState, useEffect } from "react";
// import { ref, onValue, update } from "firebase/database";
// import { db } from "../firebase";
// import { motion } from "framer-motion";
// const Admin = () => {
//   const [users, setUsers] = useState([]);
//   const [updatedUser, setUpdatedUser] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     // Reference to the 'users' collection in the Firebase database
//     const usersRef = ref(db, "users");

//     // Fetch user data from the database
//     onValue(usersRef, (snapshot) => {
//       const userData = snapshot.val();
//       if (userData) {
//         const userList = Object.keys(userData).map((userId) => ({
//           id: userId,
//           ...userData[userId],
//         }));
//         setUsers(userList);
//       } else {
//         setUsers([]);
//       }
//     });
//   }, []);

//   // Function to handle user update
//   const handleUpdate = (userId) => {
//     const userToUpdate = users.find((user) => user.id === userId);
//     if (userToUpdate) {
//       setUpdatedUser(userToUpdate);
//     }
//   };

//   // Function to handle form input change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUpdatedUser((prevUser) => ({
//       ...prevUser,
//       [name]: value,
//     }));
//   };

//   // Function to handle form submission for user update
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const { id, firstName, lastName, email, role } = updatedUser;
//     const userRef = ref(db, `users/${id}`);
//     const updatedUserData = { firstName, lastName, email, role };
//     update(userRef, updatedUserData)
//       .then(() => {
//         console.log("User details updated successfully!");
//         setUpdatedUser(null);
//       })
//       .catch((error) => {
//         console.error("Error updating user details:", error);
//       });
//   };

//   return (
//     <>
//       <motion.div className="">
//         <AdminNavbar />
//         <motion.div
//           className="ml-64"
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -50 }}
//           transition={{ duration: 0.5 }}
//         >
//           {/* -------------------TOP BAR------------------------------  */}
//           <div className="flex-1 p-4">
//             <h1 className="text-4xl font-david-libre mb-4 font-bold text-gray-800">
//               Admin Homepage
//             </h1>
//             <div className="flex space-x-4">
//               <div className="bg-white p-4 shadow-md shadow-gray-400 rounded-lg w-1/3">
//                 <h2 className="text-xl lg:text-2xl font-bold mb-2 font-david-libre text-gray-800">
//                   Total Orders
//                 </h2>
//                 <p className="text-2xl font-bold text-gray-800">120</p>
//               </div>
//               <div className="bg-white p-4 shadow-md shadow-gray-400 rounded-lg w-1/3">
//                 <h2 className="text-xl lg:text-2xl font-bold mb-2 font-david-libre text-gray-800">
//                   Total Food Items
//                 </h2>
//                 <p className="text-2xl font-bold text-gray-800">50</p>
//               </div>
//               <div className="bg-white p-4 shadow-md shadow-gray-400 rounded-lg w-1/3">
//                 <h2 className="text-xl lg:text-2xl font-bold mb-2 font-david-libre text-gray-800">
//                   Total Revenue
//                 </h2>
//                 <p className="text-2xl font-bold text-gray-800">$12,000</p>
//               </div>
//             </div>
//           </div>
//           {/* -------------------------Fetching the User's Data ---------------------------  */}
//           <motion.div className="overflow-x-auto p-6">
//             <h2 className="text-2xl font-semibold mb-4">Users</h2>
//             <div className="shadow-lg rounded-lg overflow-hidden">
//               <table className="w-full">
//                 <thead className="bg-gray-200">
//                   <tr>
//                     <th className="py-2 px-4 text-left">ID</th>
//                     <th className="py-2 px-4 text-left">First Name</th>
//                     <th className="py-2 px-4 text-left">Last Name</th>
//                     <th className="py-2 px-4 text-left">Email</th>
//                     <th className="py-2 px-4 text-left">Role</th>
//                     <th className="py-2 px-4 text-left">Update</th>
//                     <th className="py-2 px-4 text-left">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody className="font-david-libre text-2xl">
//                   {users.map((user, index) => (
//                     <motion.tr
//                       key={user.id}
//                       className="hover:bg-gray-200 transition-colors "
//                     >
//                       <td className="py-2 px-4 font-sans border border-gray-300">
//                         {String.fromCharCode(0x31 + index)}
//                       </td>
//                       <td className="py-2 font-serif border border-gray-300 px-4">
//                         {user.firstName}
//                       </td>
//                       <td className="py-2 font-serif border border-gray-300 px-4">
//                         {user.lastName}
//                       </td>
//                       <td className="py-2 font-serif border border-gray-300 px-4">
//                         {user.email}
//                       </td>
//                       <td className="py-2 font-serif border border-gray-300 px-4">
//                         {user.role}
//                       </td>
//                       <td className="border border-gray-300 px-4">
//                         <button
//                           className="p-2 bg-gray-800 text-white rounded-2xl text-lg m-3"
//                           onClick={() => handleUpdate(user.id)}
//                         >
//                           Update
//                         </button>{" "}
//                       </td>
//                       <td className="border border-gray-300 px-4">
//                         <button
//                           className="p-2 bg-gray-800 text-white rounded-2xl text-lg m-3"
//                           // onClick={() => handleDelete(foodItem.id)}
//                         >
//                           Delete
//                         </button>{" "}
//                       </td>
//                     </motion.tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </motion.div>
//         </motion.div>
//       </motion.div>
//       {showModal && (
//         <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-8 rounded-lg">
//             <h2 className="text-xl font-semibold mb-4">Update User</h2>
//             <form onSubmit={handleSubmit}>
//               <input
//                 type="text"
//                 name="firstName"
//                 value={updatedUser.firstName}
//                 placeholder="First Name"
//                 onChange={handleChange}
//               />
//               <input
//                 type="text"
//                 name="lastName"
//                 value={updatedUser.lastName}
//                 placeholder="Last Name"
//                 onChange={handleChange}
//               />
//               <input
//                 type="email"
//                 name="email"
//                 value={updatedUser.email}
//                 placeholder="Email"
//                 onChange={handleChange}
//               />
//               <select
//                 name="role"
//                 value={updatedUser.role}
//                 onChange={handleChange}
//               >
//                 <option value="user">User</option>
//                 <option value="admin">Admin</option>
//               </select>
//               <button type="submit">Update User</button>
//             </form>
//           </div>
//         </div>
//       )}

//     </>
//   );
// };

// export default Admin;

// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { ref, onValue, update } from "firebase/database";
// import { db } from "../firebase";
// import AdminNavbar from "./AdminNavbar";
// const Admin = () => {
//   const [users, setUsers] = useState([]);
//   const [updatedUser, setUpdatedUser] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     // Reference to the 'users' collection in the Firebase database
//     const usersRef = ref(db, "users");

//     // Fetch user data from the database
//     onValue(usersRef, (snapshot) => {
//       const userData = snapshot.val();
//       if (userData) {
//         const userList = Object.keys(userData).map((userId) => ({
//           id: userId,
//           ...userData[userId],
//         }));
//         setUsers(userList);
//       } else {
//         setUsers([]);
//       }
//     });
//   }, []);
  
//   const updateFunction = (userId) => {
//     const userToUpdate = users.find((user) => user.id === userId);
//     if (userToUpdate) {
//       setUpdatedUser(userToUpdate);
//       setShowModal(true);
//     }
//   };

//   const handleUpdate = () => {
//     const userRef = ref(db, `users/${updatedUser.id}`);
//     const { firstName, lastName, email, role } = updatedUser;
//     const updatedUserData = { firstName, lastName, email, role };

//     update(userRef, updatedUserData)
//       .then(() => {
//         console.log("User details updated successfully!");
//         setUpdatedUser(null);
//         setShowModal(false);
//       })
//       .catch((error) => {
//         console.error("Error updating user details:", error);
//       });
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUpdatedUser((prevUser) => ({
//       ...prevUser,
//       [name]: value,
//     }));
//   };
    
//     const handleCancel = () => {
//       setShowModal(false); // Close the modal when cancel is clicked
//     };
    
//   return (
//     <>
//       <AdminNavbar />
//       <motion.div className="ml-64">
//         {/* Your existing code for the navbar and homepage */}
//         <div className="flex-1 p-4">
//           <h1 className="text-4xl font-david-libre mb-4 font-bold text-gray-800">
//             Admin Homepage
//           </h1>
//           <div className="flex space-x-4">
//             <div className="bg-white p-4 shadow-md shadow-gray-400 rounded-lg w-1/3">
//               <h2 className="text-xl lg:text-2xl font-bold mb-2 font-david-libre text-gray-800">
//                 Total Users
//               </h2>
//               <p className="text-2xl font-bold text-gray-800">120</p>
//             </div>
//           </div>
//         </div>

//         {showModal && (
//           <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex justify-center items-center">
//             <div className="bg-white p-8 rounded-lg">
//               <h2 className="text-xl font-semibold mb-4">Update User</h2>
//               <form onSubmit={handleSubmit} className="space-y-4">
//                 <div className="flex flex-col">
//                   <label htmlFor="firstName" className="text-sm font-semibold">
//                     First Name
//                   </label>
//                   <input
//                     type="text"
//                     name="firstName"
//                     id="firstName"
//                     value={updatedUser.firstName}
//                     placeholder="First Name"
//                     onChange={handleChange}
//                     className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
//                   />
//                 </div>
//                 <div className="flex flex-col">
//                   <label htmlFor="lastName" className="text-sm font-semibold">
//                     Last Name
//                   </label>
//                   <input
//                     type="text"
//                     name="lastName"
//                     id="lastName"
//                     value={updatedUser.lastName}
//                     placeholder="Last Name"
//                     onChange={handleChange}
//                     className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
//                   />
//                 </div>
//                 <div className="flex flex-col">
//                   <label htmlFor="email" className="text-sm font-semibold">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     id="email"
//                     value={updatedUser.email}
//                     placeholder="Email"
//                     onChange={handleChange}
//                     className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
//                   />
//                 </div>
//                 <div className="flex flex-col">
//                   <label htmlFor="role" className="text-sm font-semibold">
//                     Role
//                   </label>
//                   <select
//                     name="role"
//                     id="role"
//                     value={updatedUser.role}
//                     onChange={handleChange}
//                     className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
//                   >
//                     <option value="user">User</option>
//                     <option value="admin">Admin</option>
//                   </select>
//                 </div>
//                 <div className="flex justify-between">
//                   <button
//                     type="button"
//                     onClick={handleCancel}
//                     className="bg-red-500 text-white py-2 px-4 rounded-md"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="button"
//                     onClick={handleUpdate}
//                     className="bg-blue-500 text-white py-2 px-4 rounded-md"
//                   >
//                     Update
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}

//         <motion.div className="">
//           {/* Your existing code for displaying user data */}
//           <motion.div className="overflow-x-auto p-6">
//             <h2 className="text-2xl font-semibold mb-4">Users</h2>
//             <div className="shadow-lg rounded-lg overflow-hidden">
//               <table className="w-full">
//                 <thead className="bg-gray-200">
//                   <tr>
//                     <th className="py-2 px-4 text-left">ID</th>
//                     <th className="py-2 px-4 text-left">First Name</th>
//                     <th className="py-2 px-4 text-left">Last Name</th>
//                     <th className="py-2 px-4 text-left">Email</th>
//                     <th className="py-2 px-4 text-left">Role</th>
//                     <th className="py-2 px-4 text-left">Update</th>
//                     <th className="py-2 px-4 text-left">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody className="font-david-libre text-2xl">
//                   {users.map((user, index) => (
//                     <motion.tr
//                       key={user.id}
//                       className="hover:bg-gray-200 transition-colors "
//                     >
//                       <td className="py-2 px-4 font-sans border border-gray-300">
//                         {String.fromCharCode(0x31 + index)}
//                       </td>
//                       <td className="py-2 font-serif border border-gray-300 px-4">
//                         {user.firstName}
//                       </td>
//                       <td className="py-2 font-serif border border-gray-300 px-4">
//                         {user.lastName}
//                       </td>
//                       <td className="py-2 font-serif border border-gray-300 px-4">
//                         {user.email}
//                       </td>
//                       <td className="py-2 font-serif border border-gray-300 px-4">
//                         {user.role}
//                       </td>
//                       <td className="border border-gray-300 px-4">
//                         <button
//                           className="p-2 bg-gray-800 text-white rounded-2xl text-lg m-3"
//                           onClick={() => handleUpdate(user.id)}
//                         >
//                           Update
//                         </button>{" "}
//                       </td>
//                       <td className="border border-gray-300 px-4">
//                         <button
//                           className="p-2 bg-gray-800 text-white rounded-2xl text-lg m-3"
//                           // onClick={() => handleDelete(foodItem.id)}
//                         >
//                           Delete
//                         </button>{" "}
//                       </td>
//                     </motion.tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </motion.div>
//         </motion.div>
//       </motion.div>
//     </>
//   );
// };

// export default Admin;


import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ref, onValue, update } from "firebase/database";
import { db } from "../firebase";
import AdminNavbar from "./AdminNavbar";
import { auth } from "../firebase";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


const Admin = () => {
  const [users, setUsers] = useState([]);
  const [updatedUser, setUpdatedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { user: currentUser } = UserAuth();

  // useEffect(() => {
    if (!currentUser) {
      navigate("/Login");
    }
  // }, [currentUser, navigate]);


  useEffect(() => {
    const usersRef = ref(db, "users");

    onValue(usersRef, (snapshot) => {
      const userData = snapshot.val();
      if (userData) {
        const userList = Object.keys(userData).map((userId) => ({
          id: userId,
          ...userData[userId],
        }));
        setUsers(userList);
      } else {
        setUsers([]);
      }
    });
  }, [users]);

  const updateFunction = (userId) => {
    const userToUpdate = users.find((user) => user.id === userId);
    if (userToUpdate) {
      setUpdatedUser(userToUpdate);
      setShowModal(true);
    }
  };

  const handleUpdate = () => {
    const userRef = ref(db, `users/${updatedUser.id}`);
    const { firstName, lastName, email, role } = updatedUser;
    const updatedUserData = { firstName, lastName, email, role };

    update(userRef, updatedUserData)
      .then(() => {
        console.log("User details updated successfully!");
        setUpdatedUser(null);
        setShowModal(false);
      })
      .catch((error) => {
        console.error("Error updating user details:", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setShowModal(false);
  };
  

  return (
    <>
      <AdminNavbar />
      <motion.div className="ml-64">
        <div className="flex-1 p-4">
          <h1 className="text-4xl font-david-libre mb-4 font-bold text-gray-800">
            Admin Homepage
          </h1>
          <div className="flex space-x-4">
            <div className="bg-white p-4 shadow-md shadow-gray-400 rounded-lg w-1/3">
              <h2 className="text-xl lg:text-2xl font-bold mb-2 font-david-libre text-gray-800">
                Total Users
              </h2>
              <p className="text-2xl font-bold text-gray-800">2</p>
            </div>
            <div className="bg-white p-4 shadow-md shadow-gray-400 rounded-lg w-1/3">
              <h2 className="text-xl lg:text-2xl font-bold mb-2 font-david-libre text-gray-800">
                Food Items
              </h2>
              <p className="text-2xl font-bold text-gray-800">7</p>
            </div>
            <div className="bg-white p-4 shadow-md shadow-gray-400 rounded-lg w-1/3">
              <h2 className="text-xl lg:text-2xl font-bold mb-2 font-david-libre text-gray-800">
               Total Reservation
              </h2>
              <p className="text-2xl font-bold text-gray-800">3</p>
            </div>
          </div>
        </div>

        {showModal && (
          <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Update User</h2>
              <form onSubmit={handleUpdate} className="space-y-4">
                <div className="flex flex-col">
                  <label htmlFor="firstName" className="text-sm font-semibold">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={updatedUser.firstName}
                    placeholder="First Name"
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="lastName" className="text-sm font-semibold">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={updatedUser.lastName}
                    placeholder="Last Name"
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="email" className="text-sm font-semibold">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={updatedUser.email}
                    placeholder="Email"
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="role" className="text-sm font-semibold">
                    Role
                  </label>
                  <select
                    name="role"
                    id="role"
                    value={updatedUser.role}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="bg-red-500 text-white py-2 px-4 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-md"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <motion.div className="">
          <motion.div className="overflow-x-auto p-6">
            <h2 className="text-2xl font-semibold mb-4">Users</h2>
            <div className="shadow-lg rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="py-2 px-4 text-left">ID</th>
                    <th className="py-2 px-4 text-left">First Name</th>
                    <th className="py-2 px-4 text-left">Last Name</th>
                    <th className="py-2 px-4 text-left">Email</th>
                    <th className="py-2 px-4 text-left">Role</th>
                    <th className="py-2 px-4 text-left">Update</th>
                    <th className="py-2 px-4 text-left">Action</th>
                  </tr>
                </thead>
                <tbody className="font-david-libre text-2xl">
                  {users.map((user, index) => (
                    <motion.tr
                      key={user.id}
                      className="hover:bg-gray-200 transition-colors "
                    >
                      <td className="py-2 px-4 font-sans border border-gray-300">
                        {String.fromCharCode(0x31 + index)}
                      </td>
                      <td className="py-2 font-serif border border-gray-300 px-4">
                        {user.firstName}
                      </td>
                      <td className="py-2 font-serif border border-gray-300 px-4">
                        {user.lastName}
                      </td>
                      <td className="py-2 font-serif border border-gray-300 px-4">
                        {user.email}
                      </td>
                      <td className="py-2 font-serif border border-gray-300 px-4">
                        {user.role}
                      </td>
                      <td className="border border-gray-300 px-4">
                        <button
                          className="p-2 bg-gray-800 text-white rounded-2xl text-lg m-3"
                          onClick={() => updateFunction(user.id)}
                        >
                          Update
                        </button>{" "}
                      </td>
                      <td className="border border-gray-300 px-4">
                        <button
                          className="p-2 bg-gray-800 text-white rounded-2xl text-lg m-3"
                          // onClick={() => handleDelete(user.id)}
                        >
                          Delete
                        </button>{" "}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Admin;
