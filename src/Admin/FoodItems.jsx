// import AdminNavbar from "./AdminNavbar";
// import { useState, useEffect } from "react";
// import { ref, onValue, remove } from "firebase/database";
// import { db } from "../firebase";
// import { motion } from "framer-motion";
// const FoodItems = () => {
//   const [foodItems, setFoodItems] = useState([]);

//   useEffect(() => {
//     const foodItemsRef = ref(db, "FoodItems");

//     onValue(foodItemsRef, (snapshot) => {
//       const data = snapshot.val();
//       if (data) {
//         const foodItemsList = Object.keys(data).map((foodItemId) => ({
//           id: foodItemId,
//           ...data[foodItemId],
//         }));
//         setFoodItems(foodItemsList);
//       } else {
//         setFoodItems([]);
//       }
//     });
//   }, []);

//   const handleDelete = (foodItemId) => {
//     // Remove the food item from the database
//     remove(ref(db, `FoodItems/${foodItemId}`))
//       .then(() => {
//         console.log("Food item deleted successfully");
//         // Update the local state to remove the deleted item
//         setFoodItems(foodItems.filter((item) => item.id !== foodItemId));
//       })
//       .catch((error) => {
//         console.error("Error deleting food item: ", error);
//       });
//   };
//   return (
//     <>
//       <AdminNavbar />
//       <motion.div
//         className="ml-64 p-4"
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: -50 }}
//         transition={{ duration: 0.5 }}
//       >
//         <h1 className="font-david-libre text-center font-bold xl:text-4xl p-4">
//           Food Items Lists
//         </h1>

//         {/* ----------------Food Items ------------------  */}
//         <div className="container mx-auto px-4 py-8">
//           <div className="overflow-x-auto">
//             <table className="min-w-full border-collapse border border-gray-300 font-david-libre text-xl">
//               <thead>
//                 <tr>
//                   <th className="border border-gray-300 px-4 py-2">
//                     Food Name
//                   </th>
//                   <th className="border border-gray-300 px-4 py-2">
//                     Description
//                   </th>
//                   <th className="border border-gray-300 px-4 py-2">Price</th>
//                   <th className="border border-gray-300 px-4 py-2">Image</th>
//                   <th className="border border-gray-300 px-4 py-2">Delete</th>
//                   <th className="border border-gray-300 px-4 py-2">Update</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {foodItems.map((foodItem) => (
//                   <tr key={foodItem.id}>
//                     <td className="border text-2xl border-gray-300 px-4 py-2 font-semibold text-center">
//                       {foodItem.foodName}
//                     </td>
//                     <td className="border border-gray-300 px-4 py-2">
//                       {foodItem.description}
//                     </td>
//                     <td className="border border-gray-300 px-4 py-2 font-sans">{`Rs.${foodItem.price}`}</td>
//                     <td className="border border-gray-300 px-4 py-2">
//                       <img
//                         src={foodItem.image}
//                         alt={foodItem.foodName}
//                         className="w-56 h-20 object-cover"
//                       />
//                     </td>
//                     <td className="border border-gray-300 px-4">
//                       <button
//                         className="p-3 bg-gray-800 text-white rounded-2xl text-lg"
//                         onClick={() => handleDelete(foodItem.id)}
//                       >
//                         Delete
//                       </button>{" "}
//                     </td>
//                     <td className="border border-gray-300 px-4 py-2">
//                       <button
//                         className="p-3 bg-gray-800 text-white rounded-2xl text-lg"
//                         onClick={() => updateFunction(foodItem.id)}
//                       >
//                         Update
//                       </button>{" "}
//                       {/* Delete button */}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </motion.div>
//     </>
//   );
// };

// export default FoodItems;

import AdminNavbar from "./AdminNavbar";
import { useState, useEffect } from "react";
import { ref, onValue, remove, update } from "firebase/database";
import { db } from "../firebase";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
const FoodItems = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [selectedFoodItem, setSelectedFoodItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [updatedFoodItem, setUpdatedFoodItem] = useState({
    name: "",
    description: "",
    price: "",
  });

  useEffect(() => {
    const foodItemsRef = ref(db, "FoodItems");

    onValue(foodItemsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const foodItemsList = Object.keys(data).map((foodItemId) => ({
          id: foodItemId,
          ...data[foodItemId],
        }));
        setFoodItems(foodItemsList);
      } else {
        setFoodItems([]);
      }
    });
  }, []);

  const handleDelete = (foodItemId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        remove(ref(db, `FoodItems/${foodItemId}`))
          .then(() => {
            console.log('Food item deleted successfully');
            setFoodItems((prevItems) => prevItems.filter((item) => item.id !== foodItemId));
            Swal.fire(
              'Deleted!',
              'The food item has been deleted.',
              'success'
            );
          })
          .catch((error) => {
            console.error('Error deleting food item: ', error);
            Swal.fire(
              'Error!',
              'There was an error deleting the food item.',
              'error'
            );
          });
      }
    });
  };

  const updateFunction = (foodItemId) => {
    const selectedItem = foodItems.find((item) => item.id === foodItemId);
    setSelectedFoodItem(selectedItem);
    setShowModal(true);
    setUpdatedFoodItem({
      foodName: selectedItem.foodName,
      description: selectedItem.description,
      price: selectedItem.price,
    });
  };

  const handleUpdate = () => {
    update(ref(db, `FoodItems/${selectedFoodItem.id}`), {
      foodName: updatedFoodItem.foodName,
      description: updatedFoodItem.description,
      price: updatedFoodItem.price,
    })
      .then(() => {
        console.log("Food item updated successfully");
        setSelectedFoodItem(null);
        setShowModal(false);
      })
      .catch((error) => {
        console.error("Error updating food item: ", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedFoodItem({
      ...updatedFoodItem,
      [name]: value,
    });
  };

  const handleCancel = () => {
    setShowModal(false); // Close the modal when cancel is clicked
  };

  return (
    <>
      <AdminNavbar />
      <motion.div
        className="ml-64 p-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="font-david-libre text-center font-bold xl:text-4xl p-4">
          Food Items Lists
        </h1>

        <div className="container mx-auto px-4 py-8">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300 font-david-libre text-xl">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2">
                    Food Name
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                    Description
                  </th>
                  <th className="border border-gray-300 px-4 py-2">Price</th>
                  <th className="border border-gray-300 px-4 py-2">Image</th>
                  <th className="border border-gray-300 px-4 py-2">Delete</th>
                  <th className="border border-gray-300 px-4 py-2">Update</th>
                </tr>
              </thead>
              <tbody>
                {foodItems.map((foodItem) => (
                  <tr key={foodItem.id}>
                    <td className="border text-2xl border-gray-300 px-4 py-2 font-semibold text-center">
                      {foodItem.foodName}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {foodItem.description}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 font-sans">{`Rs.${foodItem.price}`}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <img
                        src={foodItem.image}
                        alt={foodItem.name}
                        className="w-56 h-20 object-cover"
                      />
                    </td>
                    <td className="border border-gray-300 px-4">
                      <button
                        className="p-3 bg-gray-800 text-white rounded-2xl text-lg"
                        onClick={() => handleDelete(foodItem.id)}
                      >
                        Delete
                      </button>{" "}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <button
                        className="p-3 bg-gray-800 text-white rounded-2xl text-lg"
                        onClick={() => updateFunction(foodItem.id)}
                      >
                        Update
                      </button>{" "}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {selectedFoodItem && (
        <div
          className={`fixed z-10 inset-0 overflow-y-auto ${
            showModal ? "block" : "hidden"
          }`}
        >
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
            <div className="bg-white rounded-lg overflow-hidden shadow-xl relative z-20 max-w-md p-6">
              <h1 className="text-xl font-semibold mb-4">Update Food Item</h1>
              <form>
                <div className="mb-4">
                  <label
                    className="block text-sm font-semibold mb-2"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="foodName"
                    name="foodName"
                    value={updatedFoodItem.foodName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-gray-300"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-sm font-semibold mb-2"
                    htmlFor="description"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={updatedFoodItem.description}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-gray-300"
                  ></textarea>
                </div>
                <div className="mb-4">
                  <label
                    className="block text-sm font-semibold mb-2"
                    htmlFor="price"
                  >
                    Price
                  </label>
                  <input
                    type="text"
                    id="price"
                    name="price"
                    value={updatedFoodItem.price}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-gray-300"
                  />
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
                    type="button"
                    onClick={handleUpdate}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FoodItems;
