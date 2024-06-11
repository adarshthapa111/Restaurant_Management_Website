import { useState } from "react";
import { useForm } from "react-hook-form";
import { uploadBytes, ref as imgRef, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { push, set, ref } from "firebase/database";
import { db, storage } from "../firebase";
import AdminNavbar from "../Admin/AdminNavbar";
import { motion } from "framer-motion";
const AddFoodItem = () => {
  const { register } = useForm();
  const [error, setError] = useState(null);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [ingredient, setIngredient] = useState("");
  const [fat, setFat] = useState(0);
  const [calorie, setCalorie] = useState(0);
  const [protein, setProtein] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [code, setCode] = useState("");
  const [foodName, setFoodName] = useState("");
  const [foodTag, setFoodTag] = useState("veg");
  const [img, setImg] = useState(null);

  const foodItemsRef = ref(db, "FoodItems");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newFoodItemRef = push(foodItemsRef);
    const imageUrl = await uploadImage();

    const newFoodItem = {
      foodName: foodName,
      description: description,
      price: price,
      ingredient: ingredient,
      fat: fat,
      calorie: calorie,
      protein: protein,
      carbs: carbs,
      code: code,
      foodTag: foodTag,
      image: imageUrl,
    };
    set(newFoodItemRef, newFoodItem)
      .then(() => {
        alert("Food Items saved..");
      })
      .catch((error) => {
        console.log("Error saving food Items");
        setError("Error saving food items");
        return null;
      });
  };

  const uploadImage = async () => {
    // event.preventDefault()

    if (img == null) return;

    const imageRef = imgRef(storage, `images/${img.name}_${v4()}`);

    try {
      await uploadBytes(imageRef, img);
      alert("Image Uploaded");
      const imageUrl = await getDownloadURL(imageRef);
      return imageUrl;
    } catch (error) {
      console.log("Error Uploading Image", error);
      setError("Error Uplaoding Image");
      return null;
    }
  };

  return (
    <>
      <AdminNavbar />
      <h1 className="text-center p-4 font-semibold text-lg md:text-xl lg:text-2xl xl:text-3xl font-david-libre">
        Add Food Item
      </h1>
      <motion.form
        className="w-full max-w-2xl m-auto py-10  px-10 border"
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <label
            className="block text-gray-600 font-bold mb-2"
            htmlFor="description"
          >
            Food Name
          </label>
          <textarea
            className="appearance-none bg-gray-200 border border-gray-200 rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white"
            id="title"
            type="text"
            placeholder="title"
            name="title"
            onChange={(e) => setFoodName(e.target.value)}
            value={foodName}
            required
          />
          <label
            className="block text-gray-600 font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            className="appearance-none bg-gray-200 border border-gray-200 rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white"
            id="description"
            type="text"
            placeholder="Description"
            name="description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
          />
        </div>
        <div className="mt-4">
          <label className="block text-gray-600 font-bold mb-2" htmlFor="price">
            Price
          </label>
          <input
            className="appearance-none bg-gray-200 border border-gray-200 rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white"
            id="price"
            type="number"
            step="0.01"
            placeholder="Price"
            name="price"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            required
          />
        </div>
        <div className="mt-4">
          <label
            className="block text-gray-600 font-bold mb-2"
            htmlFor="ingredients"
          >
            Ingredients
          </label>
          <textarea
            className="appearance-none bg-gray-200 border border-gray-200 rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white"
            id="ingredients"
            type="text"
            placeholder="Ingredients"
            name="ingredients"
            onChange={(e) => setIngredient(e.target.value)}
            value={ingredient}
            required
          />
        </div>
        <div className="mt-4">
          <label
            className="block text-gray-600 font-bold mb-2"
            htmlFor="totalCalories"
          >
            Total Calories
          </label>
          <input
            className="appearance-none bg-gray-200 border border-gray-200 rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white"
            id="totalCalories"
            type="number"
            placeholder="Total Calories"
            name="totalCalories"
            onChange={(e) => setCalorie(e.target.value)}
            value={calorie}
            required
          />
        </div>
        <div className="mt-4">
          <label
            className="block text-gray-600 font-bold mb-2"
            htmlFor="totalFat"
          >
            Total Fat
          </label>
          <input
            className="appearance-none bg-gray-200 border border-gray-200 rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white"
            id="totalFat"
            type="number"
            placeholder="Total Fat"
            name="totalFat"
            onChange={(e) => setFat(e.target.value)}
            value={fat}
            required
          />
        </div>
        <div className="mt-4">
          <label
            className="block text-gray-600 font-bold mb-2"
            htmlFor="totalCarbs"
          >
            Total Carbs
          </label>
          <input
            className="appearance-none bg-gray-200 border border-gray-200 rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white"
            id="totalCarbs"
            type="number"
            placeholder="Total Carbs"
            name="totalCarbs"
            onChange={(e) => setCarbs(e.target.value)}
            value={carbs}
            required
          />
        </div>
        <div className="mt-4">
          <label
            className="block text-gray-600 font-bold mb-2"
            htmlFor="protein"
          >
            Protein
          </label>
          <input
            className="appearance-none bg-gray-200 border border-gray-200 rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white"
            id="protein"
            type="number"
            placeholder="Protein"
            name="protein"
            onChange={(e) => setProtein(e.target.value)}
            value={protein}
            required
          />
        </div>
        <div className="mt-4">
          <label
            className="block text-gray-600 font-bold mb-2"
            htmlFor="foodTags"
          >
            Food Tags
          </label>
          <input
            className="appearance-none bg-gray-200 border border-gray-200 rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white"
            id="foodTags"
            type="text"
            placeholder="Food Tags (comma-separated)"
            name="foodTags"
            onChange={(e) => setFoodTag(e.target.value)}
            value={foodTag}
          />
        </div>
        <div className="mt-4">
          <label className="block text-gray-600 font-bold mb-2" htmlFor="code">
            Code
          </label>
          <input
            className="appearance-none bg-gray-200 border border-gray-200 rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white"
            id="code"
            type="text"
            placeholder="Code"
            name="code"
            onChange={(e) => setCode(e.target.value)}
            value={code}
            required
          />
        </div>
        <div className="mt-4">
          <label className="block text-gray-600 font-bold mb-2" htmlFor="image">
            Image
          </label>
          <input
            className="appearance-none bg-gray-200 border border-gray-200 rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white"
            id="image"
            type="file"
            name="image"
            onChange={(e) => setImg(e.target.files[0])}
          />
        </div>
        <div className="mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </motion.form>
    </>
  );
};

export default AddFoodItem;
