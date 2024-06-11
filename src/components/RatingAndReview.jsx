import { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { ref, get, push } from "firebase/database";
import { motion } from "framer-motion";
import Alert from "./Alert";


export function RatingAndReview({ reviews }) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);



  const handleRatingChange = (newValue) => {
    setRating(newValue);
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const reviewsRef = ref(db, "RateAndReview");
      const userRef = ref(db, `users/${user.uid}`);
      const userSnapshot = await get(userRef);

      const userData = userSnapshot.val();
      const firstName = userData.firstName;
      const lastName = userData.lastName;

      await push(reviewsRef, {
        rating,
        review,
        foodId: window.location.pathname.split("/")[2],
        createdAt: new Date().toISOString(),
        firstName: firstName,
        lastName: lastName,
      });

      setSubmitted(true);

      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <>
      <div className="px-4 pt-12 text-center lg:flex mx-auto max-w-6xl lg:items-center lg:justify-between">
        {submitted && (
          <Alert type="success" message="Thank you for your feedback!" />
        )}
        <h2 className="text-3xl lg:text-4xl font-semibold text-gray-900 mb-6 font-david-libre">
          Leave your review ✓
        </h2>
        <form onSubmit={handleSubmit} className="mt-4 lg:w-1/2">
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              {[...Array(5)].map((_, index) => (
                <motion.button
                  key={index}
                  className="outline-none focus:outline-none"
                  whileHover={{ scale: 1.4 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleRatingChange(index + 1)}
                >
                  {index + 1 <= rating ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-orange-400 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0l3.192 6.245 7.143.858-5.18 5.042 1.225 7.12-6.38-3.35-6.382 3.35 1.223-7.12-5.18-5.042 7.143-.858z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-gray-300 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0l3.192 6.245 7.143.858-5.18 5.042 1.225 7.12-6.38-3.35-6.382 3.35 1.223-7.12-5.18-5.042 7.143-.858z" />
                    </svg>
                  )}
                </motion.button>
              ))}
            </div>
          </div>
          <textarea
            rows={3}
            placeholder="Write your review here"
            onChange={handleReviewChange}
            className="mt-4 p-2 w-full rounded-md border border-gray-400 resize-none"
            required
          />
          <motion.button
            type="submit"
            color="gray"
            ripple="light"
            rounded={true}
            className="mt-4 bg-orange-400 rounded-full p-4 text-white font-semibold"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Submit
          </motion.button>
        </form>
      </div>

      <div className="py-8 flex max-w-6xl mx-auto justify-end">
        <div className=" max-w-xl w-full rounded-lg shadow-t-lg">
          <h2 className="text-3xl lg:text-4xl font-semibold text-gray-900 mb-6 font-david-libre text-center">
            Reviews
          </h2>
          <ul>
            {reviews.map((review) => (
              <li
                key={review.createdAt}
                className="mb-4 p-4 rounded-lg shadow-md bg-white"
              >
                <div className="flex items-center">
                  <p className="text-gray-800 font-david-libre text-xl font-semibold">
                    {review.firstName + " " + review.lastName}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-2 space-x-4">
                  <div className="">
                    <p className="text-gray-800">{review.review}</p>
                  </div>
                  <div className="flex space-x-1">
                    {[...Array(review.rating)].map((_, index) => (
                      <svg
                        key={index}
                        className="h-6 w-6 text-orange-400 fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0l3.192 6.245 7.143.858-5.18 5.042 1.225 7.12-6.38-3.35-6.382 3.35 1.223-7.12-5.18-5.042 7.143-.858z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
