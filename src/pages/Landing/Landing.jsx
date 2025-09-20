import React from 'react'
import { Footer, Navbar, SlideShow, FeaturesSection, CTASection, TestimonialsSection, FAQSection } from '../../components/index'
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";

function Landing() {
  return (
    <div className="flex flex-col min-h-screen w-full relative bg-black text-white overflow-y-auto">

      {/* Main Content */}
      <motion.div
        className="flex flex-1 flex-col md:flex-row items-center justify-center w-full"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
      >
        {/* Text Section */}
        <div className="w-full md:w-1/2 text-center max-w-2xl px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Discover, Connect, and Share with HashHub
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-300">
            Your ultimate social media platform to explore trending topics, connect with like-minded people, and express yourself through powerful hashtags and communities.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to={"/login"}>
              <button className="px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition">
                Get Started
              </button>
            </Link>
            <button className="px-6 py-3 border border-white text-white rounded-lg hover:bg-white hover:text-black transition">
              Learn More
            </button>
          </div>
        </div>

        {/* SlideShow Section */}
        <div className="w-full md:w-1/2 flex justify-center items-center mt-8 md:mt-0 px-2">
          <SlideShow />
        </div>
      </motion.div>

      {/* security */}
      <div className="bg-[linear-gradient(to_right_top,#000000,#08080c,#0a1214)] w-full mt-8 relative overflow-hidden">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)] pointer-events-none" />

        <div className="w-full flex flex-col items-center justify-center max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">

          <motion.div
            className="w-full md:w-4/5 text-center max-w-3xl px-4"
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99], delay: 0.2 }}
            viewport={{ amount: 0.3 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold pb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 font-[Inter,sans-serif] tracking-tight">
              Your Privacy, Our Priority
            </h1>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99], delay: 0.4 }}
            viewport={{ amount: 0.3 }}
          >
            <p className="text-base sm:text-lg md:text-xl mb-12 text-gray-200 w-full md:w-3/4 text-center mx-auto leading-relaxed tracking-wide">
              We prioritize your privacy with cutting-edge end-to-end encryption and secure sharing features. Your data remains yours—always protected, always in your control.
            </p>
          </motion.div>


          <motion.div
            className="bg-white/5 backdrop-blur-lg p-6 sm:p-8 rounded-xl shadow-2xl shadow-gray-900/50 border border-white/10 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.6, -0.05, 0.01, 0.99], delay: 0.6 }}
            viewport={{ amount: 0.3 }}
            whileHover={{ scale: 1.02 }}
          >
            <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-5 font-[Inter,sans-serif] tracking-tight">
              End-to-End Encryption
            </h2>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-8">
              HashHub leverages advanced end-to-end encryption to ensure your shared content—be it images, posts, or messages—remains accessible only to you and your intended recipients. Your data is secured from upload to delivery.
            </p>

            <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-5 font-[Inter,sans-serif] tracking-tight">
              Your Data, Your Control
            </h2>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              Privacy is your right. With HashHub, you have full control over your data—decide what to share, when, and with whom. We never compromise on your privacy or sell your data.
            </p>
          </motion.div>
        </div>
      </div>

      <FeaturesSection />

      <CTASection />

      <TestimonialsSection />

      <FAQSection />
    </div>
  );
}

export default Landing;
