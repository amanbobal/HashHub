import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function Navbar() {
  const logoVariants = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  const buttonVariants = {
    initial: { opacity: 0, y: -20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  return (
    <nav className="h-20 bg-black text-white shadow-md">
      <div className="flex justify-between px-8 items-center h-full">
        {/* Logo */}
        <Link to={"/"}>
        <motion.div
          variants={logoVariants}
          initial="initial"
          animate="animate"
          >
          <p className="font-extrabold text-xl tracking-wide" id="navName">
            HashHub
          </p>
        </motion.div>
          </Link>

        {/* Buttons */}
        <div className="flex space-x-4">
          <Link to={"/login"}>
          <motion.button
            className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition max-sm:text-[14px]"
            variants={buttonVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            >
            Login
          </motion.button>
            </Link>
          <Link to={"/signup"}>
          <motion.button
            className="px-4 py-2 border border-white text-white rounded hover:bg-white hover:text-black transition  max-sm:text-[14px]"
            variants={buttonVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            >
            Signup
          </motion.button>
            </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
