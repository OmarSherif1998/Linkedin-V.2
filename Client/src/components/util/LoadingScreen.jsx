/** @format */

import { motion } from "framer-motion";
const LoadingScreen = () => {
  const darkMode = localStorage.getItem("darkMode") === "true";
  const componentBGColorClass = darkMode ? "bg-[#1d2226]" : "bg-gray-100";
  return (
    <div
      className={`flex min-h-screen w-full flex-col items-center justify-center ${componentBGColorClass}`}
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/0/01/LinkedIn_Logo.svg"
        alt="LinkedIn Logo"
        className="mb-6 w-40"
      />
      <div className={`${darkMode ? "bg-white" : "bg-gray-600"} w-60`}>
        <motion.div
          className="relative h-1 w-28 rounded bg-blue-600"
          animate={{ x: [0, 100, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        ></motion.div>
      </div>
    </div>
  );
};

export default LoadingScreen;
