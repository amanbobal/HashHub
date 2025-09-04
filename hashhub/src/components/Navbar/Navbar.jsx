import React from 'react';
import { motion } from 'framer-motion';

function Navbar() {
  // Variants for optimized animations: logo pulse and button fade-in
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
    <nav className="h-20 bg-black/10 text-white">
      <div className="flex justify-between px-8 items-center h-full">
        <motion.div
          variants={logoVariants}
          initial="initial"
          animate="animate"
        >
          <p className="font-extrabold" id="navName">HashHub</p>
        </motion.div>
        <div className="flex space-x-4">
          <motion.button
            className="px-4 py-2 bg-white/10 rounded hover:bg-white/15"
            variants={buttonVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
          >
            Login
          </motion.button>
          <motion.button
            className="px-4 py-2 bg-white/10 rounded hover:bg-white/15"
            variants={buttonVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
          >
            Signup
          </motion.button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
