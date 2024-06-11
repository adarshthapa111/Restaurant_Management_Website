// import { useEffect, Link, useState } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SpecialDishes from "./SpecialDishes";
import { auth } from "../firebase";

const variants = {
  hidden: { opacity: 0, y: -50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Set up Firebase Authentication observer
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        setIsAuthenticated(true);
      } else {
        // No user is signed in
        setIsAuthenticated(false);
      }
    });

    // Unsubscribe from Firebase Authentication observer when component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <>
      <motion.div
        className="main-Container overflow-y-hidden pt-16"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.6 }}
      >
        {/* HOMEPAGE*/}
        <div className="lg:flex lg:justify-between lg:items-center xl:h-screen lg:max-w-5xl xl:max-w-6xl mx-auto p-5">
          <motion.div
            className="col-1 lg:w-2/5"
            variants={variants}
            initial="hidden"
            animate="visible"
          >
            <div className="">
              <h1 className="font-extrabold text-3xl text-center md:text-5xl xl:text-center md:text-left md:leading-10 sm:text-4xl lg:text-5xl xl:text-6xl font-david-libre block mb-2">
                Welcome to Our <br />
                <span className="text-orange-500"> ✤ Restaurant ✤</span>
              </h1>
              <h2 className="text-center leading-8 xl:text-lg mb-2">
                Welcome to Khana Aau, a culinary haven that will transport you
                to the rich and vibrant flavors of Nepal. Prepare to embark on a
                gastronomic journey like no other, where traditional Nepalese
                cuisine meets modern culinary artistry.
              </h2>
            </div>
            <div className="buttons py-3 space-x-4 flex justify-center">
              {!isAuthenticated && (
                <>
                  <Link to="/Login">
                    <motion.button
                      className="text-white bg-orange-400 rounded-md font-david-libre border-box w-32 p-2 text-lg shadow-lg hover:shadow-orange-200"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      Login ☞
                    </motion.button>
                  </Link>
                  <Link to="/Register">
                    <motion.button
                      className="text-white bg-gray-800 opacity-90 rounded-md font-david-libre border-box px-8 py-2 text-lg shadow-lg shadow-gray-200 hover:shadow-gray-400"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      Register ☞
                    </motion.button>
                  </Link>
                </>
              )}
            </div>

            {/* <div className="buttons py-3 space-x-4 flex justify-center">
              {!isAuthenticated && (
                <>
                  <Link to="/Login">
                    <motion.button
                      className="text-white bg-orange-400 rounded-md font-david-libre border-box w-32 p-2 text-lg shadow-lg hover:shadow-orange-200"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      Login ☞
                    </motion.button>
                  </Link>
                  <Link to="/Register">
                    <motion.button
                      className="text-white bg-gray-800 opacity-90 rounded-md font-david-libre border-box px-8 py-2 text-lg shadow-lg shadow-gray-200 hover:shadow-gray-400"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      Register ☞
                    </motion.button>
                  </Link>
                </>
              )}
            </div> */}

            <div className="flex justify-center lg:my-4">
              <div className="flex space-x-6 p-1 justify-center h-10 w-10">
                <img
                  src="/img/facebook.png"
                  alt=""
                  className="cursor-pointer"
                />
                <img
                  src="/img/instagram.png"
                  alt=""
                  className="cursor-pointer"
                />
                <img src="/img/twitter.png" alt="" className="cursor-pointer" />
              </div>
            </div>
          </motion.div>

          <div className="col-2 ">
            <div className="flex justify-center items-center min-h-96">
              <motion.div
                className="relative animate-spin-slow"
                variants={variants}
                initial="hidden"
                animate="visible"
              >
                <div className="border-4 border-gray-400  border-double border-orange p-9 xl:p-20 rounded-full shadow-xl shadow-gray-400">
                  <div className="bg-gradient-to-r from-orange-300 via-orange-400 to-orange-500 border-2 w-32 h-32 sm:h-56 rounded-full shadow-xl shadow-gray-400 sm:w-56 relative">
                    {/* Image at the top */}
                    <motion.img
                      src="/img/burger.webp"
                      alt=""
                      className="absolute top-0 lg:top-[-25px] left-1/2 transform -translate-x-1/2 -translate-y-full h-20 w-20 md:h-24 md:w-24 rounded-full shadow-xl shadow-gray-400 border-t-2 border-gray-400"
                    />
                    {/* Image at the bottom */}
                    <img
                      src="/img/pizza.png"
                      alt=""
                      className="absolute bottom-0 lg:bottom-[-25px] left-1/2 transform -translate-x-1/2 translate-y-full h-20 w-20 md:h-24 md:w-24 rounded-full shadow-xl shadow-gray-400 border-b-2 border-gray-400"
                    />
                    {/* Image at the left */}
                    <img
                      src="/img/sandwich.jpg"
                      alt=""
                      className="absolute left-0 lg:left-[-25px] top-1/2 transform -translate-y-1/2 -translate-x-full h-20 w-20 md:h-24 md:w-24 rounded-full shadow-xl shadow-gray-400 border-l-2 border-gray-400"
                    />
                    {/* Image at the right */}
                    <img
                      src="/img/hotdog.png"
                      alt=""
                      className="absolute right-0 lg:right-[-25px] top-1/2 transform -translate-y-1/2 translate-x-full h-20 w-20 md:h-24 md:w-24 rounded-full shadow-xl shadow-gray-400 border-r-2 border-gray-400  "
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* </div> */}
          </div>
        </div>
      </motion.div>

      <div className="bg-black bg-opacity-5 md:p-10 p-5">

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <button className=" bg-gray-400 inline-block rounded-lg text-white px-3 py-1 text-sm dark:bg-gray-800">
                  Our Specialty Dishes
                </button>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-david-libre">
                  Savor the Flavors
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Indulge in our expertly crafted dishes made with the freshest
                  ingredients and innovative culinary techniques.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <img
                alt="Dish"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                height="400"
                src="/img/burger.webp"
                width="600"
              />
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">
                        Grilled Salmon with Lemon Butter
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        Succulent salmon fillet grilled to perfection, served
                        with a tantalizing lemon butter sauce.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">
                        Vegetable Stir-Fry with Tofu
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        A vibrant medley of fresh vegetables and crispy tofu,
                        stir-fried in a savory sauce.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">
                        Classic Beef Bolognese
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        Slow-simmered beef in a rich tomato sauce, served over
                        perfectly al dente pasta.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        {/* ___________________Video ___________________________ */}
        {/* <h2 className="text-2xl md:text-3xl font-david-libre text-center font-bold lg:text-4xl xl:text-5xl mt-10">
          <span className="text-orange-500">How</span> to use our{" "}
          <span className="text-orange-500">Website</span>
        </h2>
        <div className="max-w-6xl mx-auto rounded-lg my-10 border border-gray-400">
          <video className="" controls>
            <source src="/video/howtouse.mov" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div> */}

        {/* <!-- -------------------------------Our special dishes------------------------------------ --> */}
        <div className="special-dishes mt-12 max-w-6xl mx-auto">
          <div className="top">
            <h2 className="font-extrabold text-3xl font-david-libre text-center xl:text-5xl">
              Our <span className="text-orange-500">Special</span> Dishes
            </h2>
            <p className="text-base text-center xl:text-md font-light leading-8 md:mt-4">
              Special dishes are culinary delights that stand out from the
              ordinary. These extraordinary creations can be found in various
              cuisines around the world, each offering its own unique flavors
              and ingredients.
            </p>
          </div>
          <div>
            {/* fetch 3 food items here */}
            <SpecialDishes />
          </div>
        </div>
      </div>
      {/* Review FRAME */}

      {/* Master chef */}

      <div className="chef lg:flex lg:justify-between lg:items-center lg:max-w-4xl lg:space-x-10 my-6 xl:max-w-6xl xl:min-h-screen mx-auto">
        <div className="chef-head p-2 lg:space-y-8">
          <h1 className="font-bold text-3xl font-david-libre text-center lg:text-6xl">
            ✤ Our <span className="text-orange-500">Expert</span> Chef ✤
          </h1>
          <p className="text-center leading-8 xl:leading-8 xl:text-lg font-light">
            A cooking chef is a masterful artisan of the culinary world,
            wielding both skill and creativity to transform raw ingredients into
            gastronomic delights. With a keen understanding of flavors,
            textures, and techniques.
          </p>
          <div className="list flex text-justify">
            <img
              src="/img/tick.png"
              alt=""
              className="h-6 w-6 xl:h-10 xl:w-10"
            />
            <p className="text-sm lg:text-base xl:text-lg font-light">
              A chef is a masterful artisan skilled in transforming raw
              ingredients into culinary delights
            </p>
          </div>
          <div className="list flex text-justify">
            <img
              src="/img/tick.png"
              alt=""
              className="h-6 w-6 xl:h-10 xl:w-10"
            />
            <p className="text-sm lg:text-base xl:text-lg font-light">
              A chef is a masterful artisan skilled in transforming raw
              ingredients into culinary delights
            </p>
          </div>
          <div className="list flex text-justify">
            <img
              src="/img/tick.png"
              alt=""
              className="h-6 w-6 xl:h-10 xl:w-10"
            />
            <p className="text-sm lg:text-base xl:text-lg font-light">
              A chef is a masterful artisan skilled in transforming raw
              ingredients into culinary delights
            </p>
          </div>
          <div className="list flex text-justify">
            <img
              src="/img/tick.png"
              alt=""
              className="h-6 w-6 xl:h-10 xl:w-10"
            />
            <p className="text-sm lg:text-base xl:text-lg font-light">
              A chef is a masterful artisan skilled in transforming raw
              ingredients into culinary delights
            </p>
          </div>

          <div className="buttons p-2 text-center space-x-4 ">
            <Link to="/TableBooking">
              <button className="text-white bg-[#EA6D27] rounded-md font-david-libre border-box w-32 p-2 text-lg shadow-lg shadow-orange-200 hover:shadow-orange-400">
                Book a Table
              </button>
            </Link>
            <Link to="/Menu">
              <button className="text-white bg-black opacity-90 rounded-md font-david-libre border-box px-10 py-2 text-lg shadow-lg shadow-orange-200 hover:black">
                Menu ☞
              </button>
            </Link>
          </div>
        </div>
        <div className="chef-photo relative ">
          <div className="h-[310px] w-[310px] md:h-[410px] md:w-[410px] rounded-full bg-gradient-to-b from-orange-500 to-orange-200 static shadow-gray-400 shadow-xl mx-auto">
            {" "}
          </div>
          <div className="top-10 md:left-8">
            <img
              src="/img/chef.png"
              alt=""
              className="absolute top-[60px] left-24 lg:left-16 lg:top-16 rounded-full w-[200px] md:w-[280px]"
            />
          </div>
        </div>
      </div>
      {/* end of master chef  */}

      <div className="Review bg-black bg-opacity-5 p-2 lg:px-20 xl:px-40">
        <div className="py-4">
          <h1 className="text-3xl md:text-4xl font-david-libre font-bold text-center lg:text-5xl xl:text-6xl">
            ✿ Our{" "}
            <span className="text-orange-500 lg:text-5xl xl:text-6xl">
              Happy
            </span>{" "}
            Customers ✿
          </h1>
          <p className="text-center p-2 font-semibold font-sans py-6">
            We extend our heartfelt thanks for choosing Khana Aau. Your trust is
            the driving force behind our commitment to excellence, and we are
            truly grateful for the opportunity to serve you.
          </p>
        </div>

        <div className="flex px-4  overflow-scroll no-scrollbar space-x-6 xl:max-w-6xl mx-auto justify-between">
          <div className="rounded-lg border border-gray-320 shadow-md hover:shadow-inner w-80 bg-white p-6 space-y-3 flex-none">
            <div className="flex justify-center space-x-2">
              <img src="/img/rating.png" alt="" className="h-5" />
              <img src="/img/rating.png" alt="" className="h-5" />
              <img src="/img/rating.png" alt="" className="h-5" />
              <img src="/img/rating.png" alt="" className="h-5" />
              <img src="/img/rating.png" alt="" className="h-5" />
            </div>
            <div className="">
              <p className="text-center leading-6">
                I recently had the pleasure of engaging with Khana Aau and I am
                overjoyed to share my delightful experience. From start to
                finish, the entire journey was marked by exceptional service and
                genuine customer care.
              </p>
            </div>
            <div className="flex items-center justify-center space-x-4">
              <img
                src="/img/adarsh.png"
                alt=""
                className="rounded-full h-10 w-10"
              />
              <div>
                <p className="font-bold font-david-libre text-lg">
                  Adarsh Thapa
                </p>
                <p className="text-sm">Master Chef</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-320 shadow-md hover:shadow-inner w-80 bg-white p-6 space-y-3 flex-none">
            <div className="flex justify-center space-x-2">
              <img src="/img/rating.png" alt="" className="h-5" />
              <img src="/img/rating.png" alt="" className="h-5" />
              <img src="/img/rating.png" alt="" className="h-5" />
              <img src="/img/rating.png" alt="" className="h-5" />
              <img src="/img/rating.png" alt="" className="h-5" />
            </div>
            <div className="">
              <p className="text-center leading-6">
                I recently had the pleasure of engaging with Khana Aau and I am
                overjoyed to share my delightful experience. From start to
                finish, the entire journey was marked by exceptional service and
                genuine customer care.
              </p>
            </div>
            <div className="flex items-center justify-center space-x-4">
              <img
                src="/img/adarsh.png"
                alt=""
                className="rounded-full h-10 w-10"
              />
              <div>
                <p className="font-bold font-david-libre text-lg">
                  Adarsh Thapa
                </p>
                <p className="text-sm">Master Chef</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-320 shadow-md hover:shadow-inner w-80 bg-white p-6 space-y-3 flex-none">
            <div className="flex justify-center space-x-2">
              <img src="/img/rating.png" alt="" className="h-5" />
              <img src="/img/rating.png" alt="" className="h-5" />
              <img src="/img/rating.png" alt="" className="h-5" />
              <img src="/img/rating.png" alt="" className="h-5" />
              <img src="/img/rating.png" alt="" className="h-5" />
            </div>
            <div className="">
              <p className="text-center leading-6">
                I recently had the pleasure of engaging with Khana Aau and I am
                overjoyed to share my delightful experience. From start to
                finish, the entire journey was marked by exceptional service and
                genuine customer care.
              </p>
            </div>
            <div className="flex items-center justify-center space-x-4">
              <img
                src="/img/adarsh.png"
                alt=""
                className="rounded-full h-10 w-10"
              />
              <div>
                <p className="font-bold font-david-libre text-lg">Tim Cook</p>
                <p className="text-sm">Master Chef</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex px-4  overflow-scroll no-scrollbar space-x-8 xl:max-w-6xl mx-auto justify-center mt-14 pb-20">
          <div className="rounded-lg border border-gray-320 shadow-md hover:shadow-inner w-80 bg-white p-6 space-y-3 flex-none">
            <div className="flex justify-center space-x-2">
              <img src="/img/rating.png" alt="" className="h-5" />
              <img src="/img/rating.png" alt="" className="h-5" />
              <img src="/img/rating.png" alt="" className="h-5" />
              <img src="/img/rating.png" alt="" className="h-5" />
              <img src="/img/rating.png" alt="" className="h-5" />
            </div>
            <div className="">
              <p className="text-center leading-6">
                I recently had the pleasure of engaging with Khana Aau and I am
                overjoyed to share my delightful experience. From start to
                finish, the entire journey was marked by exceptional service and
                genuine customer care.
              </p>
            </div>
            <div className="flex items-center justify-center space-x-4">
              <img
                src="/img/adarsh.png"
                alt=""
                className="rounded-full h-10 w-10"
              />
              <div>
                <p className="font-bold font-david-libre text-lg">
                  Adarsh Thapa
                </p>
                <p className="text-sm">Master Chef</p>
              </div>
            </div>
          </div>

          <motion.div
            className="rounded-lg border border-gray-320 shadow-md w-80 bg-white p-6 space-y-3 flex-none"
            whileHover={{
              translateZ: 80,
              boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.2)",
            }} // Move forward on hover
            whileTap={{ translateZ: 80 }}
          >
            <div className="flex justify-center space-x-2">
              <img src="/img/rating.png" alt="" className="h-5" />
              <img src="/img/rating.png" alt="" className="h-5" />
              <img src="/img/rating.png" alt="" className="h-5" />
              <img src="/img/rating.png" alt="" className="h-5" />
              <img src="/img/rating.png" alt="" className="h-5" />
            </div>
            <div>
              <p className="text-center leading-6">
                I recently had the pleasure of engaging with Khana Aau and I am
                overjoyed to share my delightful experience. From start to
                finish, the entire journey was marked by exceptional service and
                genuine customer care.
              </p>
            </div>
            <div className="flex items-center justify-center space-x-4">
              <img
                src="/img/adarsh.png"
                alt=""
                className="rounded-full h-10 w-10"
              />
              <div>
                <p className="font-bold font-david-libre text-lg">Tim Cook</p>
                <p className="text-sm">Master Chef</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* <div className="max-w-6xl mx-auto rounded-lg bg-white my-10 border border-gray-400">
        <motion.h2
          className="text-2xl md:text-3xl font-david-libre text-center font-bold lg:text-4xl xl:text-5xl m-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-orange-500">How</span> to use our{" "}
          <span className="text-orange-500">Website</span>
        </motion.h2>
        <motion.video
          className=""
          controls
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <source src="/video/howtouse.mov" type="video/mp4" />
          Your browser does not support the video tag.
        </motion.video>
      </div> */}

      {/* newsletter  */}

      <div className="relative isolate overflow-hidden bg-black bg-opacity-5  py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            <div className="max-w-xl lg:max-w-lg">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Subscribe to our newsletter.
              </h2>
              <p className="mt-4 text-lg leading-8 text-gray-800">
                Nostrud amet eu ullamco nisi aute in ad minim nostrud
                adipisicing velit quis. Duis tempor incididunt dolore.
              </p>
              <div className="mt-6 flex max-w-md gap-x-4">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-3.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-800 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  placeholder="Enter your email"
                />
                <button
                  type="submit"
                  className="flex-none rounded-md bg-orange-400 px-3.5 py-2.5 text-sm font-semibold text-white  shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  Subscribe
                </button>
              </div>
            </div>
            <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
              <div className="flex flex-col items-start">
                <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                  <img
                    src="/img/facebook.png"
                    className="h-6 w-6 text-gray-800"
                  />
                </div>
                <dt className="mt-4 font-semibold text-gray-800 ">
                  Weekly articles
                </dt>
                <dd className="mt-2 leading-7 text-gray-800">
                  Non laboris consequat cupidatat laborum magna. Eiusmod non
                  irure cupidatat duis commodo amet.
                </dd>
              </div>
              <div className="flex flex-col items-start">
                <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                  <img
                    src="/img/instagram.png"
                    className="h-6 w-6 text-gray-800 "
                  />
                </div>
                <dt className="mt-4 font-semibold text-gray-800 ">No spam</dt>
                <dd className="mt-2 leading-7 text-gray-800">
                  Officia excepteur ullamco ut sint duis proident non
                  adipisicing. Voluptate incididunt anim.
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <div
          className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6"
          aria-hidden="true"
        >
          <div className="aspect-[1155/678] w-[72.1875rem] " />
        </div>
      </div>
      {/* End of Newlatter */}
    </>
  );
};

export default Home;
