import { motion } from "framer-motion";
import { useViewportScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
const About = () => {
  const { scrollYProgress } = useViewportScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1.1]);

  return (
    <div>
      <motion.div
        className="main-container pt-16"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
      >
        <div className="main-heading min-h-screen p-4 sm:p-10 md:flex  lg:max-w-4xl xl:max-w-6xl mx-auto lg:justify-between lg:items-center">
          <div className="left md:my-4 lg:w-1/2  xl:my-28">
            <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800 my-4">
              About Our Food
            </div>
            <h2 className="text-2xl lg:text-4xl xl:text-left xl:text-6xl text-center font-extrabold font-david-libre md:text-3xl tracking-wide">
              <span className="xl:text-6xl  text-orange-500 "></span>From Our
              Kitchen to Your Table:{" "}
              <span className="xl:text-6xl  text-orange-500 ">
                Fresh And Tasty
              </span>
            </h2>
            <p className="text-center md:my-2 lg:text-left">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio
              incidunt, laborum recusandae eveniet inventore natus dolor at quas
              repellendus perferendis, expedita aspernatur itaque.
            </p>
            <div className="buttons  md:my-4 flex justify-center lg:justify-start">
              <Link to="/Menu">
                <button className="text-white bg-black rounded-full font-david-libre border-box w-28 p-2 text-lg">
                  Menu
                </button>
              </Link>
              <Link to="/TableBooking">
                <button
                  className="text-white bg-orange-400 rounded-full
                    font-david-libre  w-36 p-2 ml-4 text-lg"
                >
                  Book a table
                </button>
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2 ">
            <div className="flex justify-between">
              <div className="relative rounded-lg overflow-hidden w-[250px] h-[200px]">
                <img
                  alt="Food Image"
                  className="object-cover w-full h-full"
                  height={200}
                  src="/img/hotdog.png"
                  style={{
                    aspectRatio: "300/200",
                    objectFit: "cover",
                  }}
                  width={300}
                />
                <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                  <FlameIcon className="h-4 w-4" />
                  320 cal
                </div>
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-white text-lg font-semibold flex items-center gap-2">
                    <SaladIcon className="h-6 w-6" />
                    Grilled Salmon Salad
                  </h3>
                </div>
              </div>

              <div className="relative rounded-lg overflow-hidden w-[250px] h-[200px]">
                <img
                  alt="Food Image"
                  className="object-cover w-full h-full"
                  height={200}
                  src="/img/sandwich.jpg"
                  style={{
                    aspectRatio: "300/200",
                    objectFit: "cover",
                  }}
                  width={300}
                />
                <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                  <FlameIcon className="h-4 w-4" />
                  320 cal
                </div>
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-white text-lg font-semibold flex items-center gap-2">
                    <SaladIcon className="h-6 w-6" />
                    Grilled Salmon Salad
                  </h3>
                </div>
              </div>
            </div>

            <div className="relative rounded-lg overflow-hidden w-[250px] h-[200px] mx-auto mt-4">
              <img
                alt="Food Image"
                className="object-cover w-full h-full"
                height={200}
                src="/img/sushi.jpg"
                style={{
                  aspectRatio: "300/200",
                  objectFit: "cover",
                }}
                width={300}
              />
              <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                <FlameIcon className="h-4 w-4" />
                320 cal
              </div>
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4">
                <h3 className="text-white text-lg font-semibold flex items-center gap-2">
                  <SaladIcon className="h-6 w-6" />
                  Grilled Salmon Salad
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- ----------------second------------part--------------- --> */}
        <div className="second-container bg-black bg-opacity-5 p-4 sm:p-10 lg:px-20 ">
          <div className="xl:max-w-6xl mx-auto xl:pb-10">
            <motion.div style={{ scale }}>
              <div className="head">
                <h1 className="font-black font-david-libre text-3xl sm:text-4xl sm:text-center sm:my-4 md:text-5xl lg:text-6xl xl:text-7xl">
                  We're passionate about our food.
                </h1>
                <p className="text-justify">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Commodi porro beatae ad distinctio quos delectus veniam.
                  Consequuntur provient odit architecto maiores.
                </p>
              </div>
              <div className="col-container flex flex-col space-y-6">
                {/* <!-- ---------------------1st col--------------------------- --> */}
                <motion.div
                  className="col-1 md:flex md:flex-row-reverse md:justify-between"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="image md:ml-4 md:my-4 md:w-1/2">
                    <img
                      src="/img/tomato.jpg"
                      alt=""
                      className="md:object-cover md:rounded-lg md:h-44 md:w-full"
                    />
                  </div>
                  <div className="para md:w-1/2">
                    <div className="first-line flex my-2 items-center space-x-1">
                      <img src="/img/tick.png" alt="" className="h-8 w-auto" />
                      <h3 className="text-3xl">Commitment to Quality</h3>
                    </div>
                    <div className="second-line ml-10">
                      <p className="text-justify my-2">
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Exercitationem maxime iusto labore.
                      </p>
                      <Link to="/AboutFoodDesc">
                        <button className="text-white bg-[#EA6D27] rounded-md font-david-libre border-box w-36 p-2 text-lg">
                          Learn More
                        </button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
                {/* <!-- --------------------------second-row---------------------------- --> */}
                <motion.div
                  className="col-1 md:flex md:flex-row-reverse md:justify-between"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="image md:ml-4 md:my-4 md:w-1/2">
                    <img
                      src="/img/vegetable.jpg"
                      alt=""
                      className="md:object-cover md:rounded-lg md:h-44 md:w-full"
                    />
                  </div>
                  <div className="para md:w-1/2">
                    <div className="first-line flex my-2 items-center space-x-1">
                      <img src="/img/tick.png" alt="" className="h-8 w-auto" />
                      <h3 className="text-3xl">Our Food Experts</h3>
                    </div>
                    <div className="second-line ml-10">
                      <p className="text-justify my-2">
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Exercitationem maxime iusto labore.
                      </p>
                      <button className="text-white bg-[#EA6D27] rounded-md font-david-libre border-box w-36 p-2 text-lg">
                        Learn More
                      </button>
                    </div>
                  </div>
                </motion.div>
                {/* third column */}
                <motion.div
                  className="col-1 md:flex md:flex-row-reverse md:justify-between"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="image md:ml-4 md:my-4 md:w-1/2">
                    <img
                      src="/img/basket-vetable.jpeg"
                      alt=""
                      className="md:object-cover md:rounded-lg md:h-44 md:w-full"
                    />
                  </div>
                  <div className="para md:w-1/2">
                    <div className="first-line flex my-2 items-center space-x-1">
                      <img src="/img/tick.png" alt="" className="h-8 w-auto" />
                      <h3 className="text-3xl">Variety of Choices</h3>
                    </div>
                    <div className="second-line ml-10">
                      <p className="text-justify my-2">
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Exercitationem maxime iusto labore.
                      </p>
                      <button className="text-white bg-[#EA6D27] rounded-md font-david-libre border-box w-36 p-2 text-lg">
                        Learn More
                      </button>
                    </div>
                  </div>
                </motion.div>
                {/* <!-- -----------------------------fourth column-------------------- --> */}
                <motion.div
                  className="col-1 md:flex md:flex-row-reverse md:justify-between"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="image md:ml-4 md:my-4 md:w-1/2">
                    <img
                      src="/img/meats.jpg"
                      alt=""
                      className="md:object-cover md:rounded-lg md:h-44 md:w-full"
                    />
                  </div>
                  <div className="para md:w-1/2">
                    <div className="first-line flex my-2 items-center space-x-1">
                      <img src="/img/tick.png" alt="" className="h-8 w-auto" />
                      <h3 className="text-3xl">Fresh Meat and Fish</h3>
                    </div>
                    <div className="second-line ml-10">
                      <p className="text-justify my-2">
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Exercitationem maxime iusto labore.
                      </p>
                      <button className="text-white bg-[#EA6D27] rounded-md font-david-libre border-box w-36 p-2 text-lg">
                        Learn More
                      </button>
                    </div>
                  </div>
                </motion.div>
                {/* <!-- --------------------fifth row----------------------- --> */}
                <motion.div
                  className="col-1 md:flex md:flex-row-reverse md:justify-between"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="image md:ml-4 md:my-4 md:w-1/2">
                    <img
                      src="/img/all-fruits.jpg"
                      alt=""
                      className="md:object-cover md:rounded-lg md:h-44 md:w-full"
                    />
                  </div>
                  <div className="para md:w-1/2">
                    <div className="first-line flex my-2 items-center space-x-1">
                      <img src="/img/tick.png" alt="" className="h-8 w-auto" />
                      <h3 className="text-3xl">Variety of Fruits mixed</h3>
                    </div>
                    <div className="second-line ml-10">
                      <p className="text-justify my-2">
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Exercitationem maxime iusto labore.
                      </p>
                      <button className="text-white bg-[#EA6D27] rounded-md font-david-libre border-box w-36 p-2 text-lg">
                        Learn More
                      </button>
                    </div>
                  </div>
                </motion.div>
                {/* <!-- ------------------------sixth row---------------------------- --> */}
                <motion.div
                  className="col-1 md:flex md:flex-row-reverse md:justify-between"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="image md:ml-4 md:my-4 md:w-1/2">
                    <img
                      src="/img/vegii.jpg"
                      alt=""
                      className="md:object-cover md:rounded-lg md:h-44 md:w-full"
                    />
                  </div>
                  <div className="para md:w-1/2">
                    <div className="first-line flex my-2 items-center space-x-1">
                      <img src="/img/tick.png" alt="" className="h-8 w-auto" />
                      <h3 className="text-3xl">
                        Commitment of Authentic Taste
                      </h3>
                    </div>
                    <div className="second-line ml-10">
                      <p className="text-justify my-2">
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Exercitationem maxime iusto labore.
                      </p>
                      <button className="text-white bg-[#EA6D27] rounded-md font-david-libre border-box w-36 p-2 text-lg">
                        Learn More
                      </button>
                    </div>
                  </div>
                </motion.div>
                {/* <!-- -------------------------------End of rows----------------------- --> */}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

function FlameIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  );
}

function UtensilsIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
      <path d="M7 2v20" />
      <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
    </svg>
  );
}

function SaladIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 21h10" />
      <path d="M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z" />
      <path d="M11.38 12a2.4 2.4 0 0 1-.4-4.77 2.4 2.4 0 0 1 3.2-2.77 2.4 2.4 0 0 1 3.47-.63 2.4 2.4 0 0 1 3.37 3.37 2.4 2.4 0 0 1-1.1 3.7 2.51 2.51 0 0 1 .03 1.1" />
      <path d="m13 12 4-4" />
      <path d="M10.9 7.25A3.99 3.99 0 0 0 4 10c0 .73.2 1.41.54 2" />
    </svg>
  );
}

export default About;
