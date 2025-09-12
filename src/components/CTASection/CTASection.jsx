import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <div className="bg-[linear-gradient(to_right_top,#000000,#08080c,#0a1214)] w-full py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99], delay: 0.2 }}
          viewport={{ amount: 0.3 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 font-[Inter,sans-serif] tracking-tight mb-6">
            Join the HashHub Community
          </h2>
          <p className="text-base sm:text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
            Start connecting, sharing, and exploring with confidence today.
          </p>
        </motion.div>
        <motion.div
          initial={{ scale: 0.9 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.5, ease: [0.6, -0.05, 0.01, 0.99], delay: 0.4 }}
          viewport={{ amount: 0.3 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to="/signup"
            className="inline-block bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold py-3 px-8 rounded-full text-lg hover:bg-gradient-to-r hover:from-blue-600 hover:to-teal-600 transition-all duration-300"
          >
            Sign Up Now
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default CTASection;