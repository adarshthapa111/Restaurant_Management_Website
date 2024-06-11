import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
const AboutFoodDesc = () => {
  return (
    <>
      <motion.div
        className="main-container pt-16"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
      >
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 max-w-6xl mx-auto">
            <div className="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                  About Our Food Desc
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl font-david-libre">
                  Crafting Delicious Meals with Care
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 text-justify">
                  At our fast food restaurant, we are committed to providing our
                  customers with high-quality, freshly prepared meals made with
                  the finest ingredients. Our dedication to excellence is
                  reflected in every aspect of our food, from sourcing
                  sustainable produce to ensuring precise preparation.
                </p>
              </div>
              <img
                alt="About Our Food"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                height="310"
                src="/img/about2.webp"
                width="550"
              />
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-12">
          <div className="container px-4 md:px-6 max-w-6xl mx-auto">
            <div className="grid items-center gap-6 lg:grid-cols-[500px_1fr] lg:gap-12 xl:grid-cols-[550px_1fr]">
              <img
                alt="About Our Food"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-first"
                height="310"
                src="/img/about4.webp"
                width="550"
              />
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl font-david-libre">
                  Commitment to sustainable Coffee Beans
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 text-justify">
                  At our fast food restaurant, we are committed to providing our
                  customers with high-quality, freshly prepared meals made with
                  the finest ingredients. Our dedication to excellence is
                  reflected in every aspect of our food, from sourcing
                  sustainable produce to ensuring precise preparation.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6 max-w-6xl mx-auto">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col items-start space-y-4">
                <CropIcon className="h-12 w-12 text-gray-500 dark:text-gray-400" />
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-david-libre">
                    Fresh Produce
                  </h2>
                  <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    We source our produce from local farms and suppliers,
                    ensuring the freshest and most flavorful ingredients. Our
                    commitment to sustainability means we prioritize organic and
                    ethically grown options whenever possible.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-start space-y-4">
                <RecycleIcon className="h-12 w-12 text-gray-500 dark:text-gray-400" />
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-david-libre">
                    Sustainable Sourcing
                  </h2>
                  <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    We are committed to sustainable sourcing practices,
                    prioritizing suppliers who share our values of environmental
                    responsibility and ethical treatment of workers. This
                    ensures that our food not only tastes great but is also
                    produced in a way that is good for the planet.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-start space-y-4">
                <NutIcon className="h-12 w-12 text-gray-500 dark:text-gray-400" />
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-david-libre">
                    Nutritional Information
                  </h2>
                  <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    We believe in providing our customers with transparent
                    nutritional information, so they can make informed choices
                    about their meals. Our menu items are carefully crafted to
                    offer a balance of nutrients, with a focus on wholesome,
                    unprocessed ingredients.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-start space-y-4">
                <PresentationIcon className="h-12 w-12 text-gray-500 dark:text-gray-400" />
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-david-libre">
                    Precise Preparation
                  </h2>
                  <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    Our chefs take great pride in their craft, meticulously
                    preparing each dish to ensure consistent quality and flavor.
                    From carefully seasoning our proteins to expertly cooking
                    our vegetables, we leave no detail unattended in our pursuit
                    of culinary excellence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </motion.div>
    </>
  );
};

function CropIcon(props) {
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
      <path d="M6 2v14a2 2 0 0 0 2 2h14" />
      <path d="M18 22V8a2 2 0 0 0-2-2H2" />
    </svg>
  );
}

function NutIcon(props) {
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
      <path d="M12 4V2" />
      <path d="M5 10v4a7.004 7.004 0 0 0 5.277 6.787c.412.104.802.292 1.102.592L12 22l.621-.621c.3-.3.69-.488 1.102-.592A7.003 7.003 0 0 0 19 14v-4" />
      <path d="M12 4C8 4 4.5 6 4 8c-.243.97-.919 1.952-2 3 1.31-.082 1.972-.29 3-1 .54.92.982 1.356 2 2 1.452-.647 1.954-1.098 2.5-2 .595.995 1.151 1.427 2.5 2 1.31-.621 1.862-1.058 2.5-2 .629.977 1.162 1.423 2.5 2 1.209-.548 1.68-.967 2-2 1.032.916 1.683 1.157 3 1-1.297-1.036-1.758-2.03-2-3-.5-2-4-4-8-4Z" />
    </svg>
  );
}

function PresentationIcon(props) {
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
      <path d="M2 3h20" />
      <path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3" />
      <path d="m7 21 5-5 5 5" />
    </svg>
  );
}

function RecycleIcon(props) {
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
      <path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5" />
      <path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12" />
      <path d="m14 16-3 3 3 3" />
      <path d="M8.293 13.596 7.196 9.5 3.1 10.598" />
      <path d="m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843" />
      <path d="m13.378 9.633 4.096 1.098 1.097-4.096" />
    </svg>
  );
}

export default AboutFoodDesc;
