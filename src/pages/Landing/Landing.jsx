import React from 'react'
import { Footer, Navbar, SlideShow } from '../../components/index'
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div className="flex flex-col min-h-screen w-full relative bg-black text-white overflow-y-auto">
      {/* Navbar */}
      {/* <div className="w-full z-10">
        <Navbar />
      </div> */}

      {/* Main Content */}
      <div className="flex flex-1 flex-col md:flex-row items-center justify-center w-full">
        {/* Text Section */}
        <div className="w-full md:w-1/2 text-center max-w-2xl px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Discover, Connect, and Share with HashHub
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-300">
            Your ultimate social media platform to explore trending topics, connect with like-minded people, and express yourself through powerful hashtags and communities.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to={"/login"}><button className="px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition">
              Get Started
            </button></Link>
            <button className="px-6 py-3 border border-white text-white rounded-lg hover:bg-white hover:text-black transition">
              Learn More
            </button>
          </div>
        </div>
        {/* SlideShow Section */}
        <div className="w-full md:w-1/2 flex justify-center items-center mt-8 md:mt-0 px-2">
          <SlideShow />
        </div>
      </div>

      {/* security */}
      <div className='bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 w-full mt-8'>
        <div className='w-full flex flex-col items-center justify-center md:max-w-4xl  mx-auto  py-12 px-4'>

          {/* Heading */}
          <div className='w-full md:w-[80%] text-center max-w-2xl px-4'>
            <h1 className="text-4xl md:text-5xl font-extrabold pb-5 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 font-asimovian">
              Your Privacy, Our Priority
            </h1>
          </div>

          {/* Content */}
          <div>
            <p className="text-lg md:text-xl mb-10 text-gray-300 w-full md:w-3/4 text-center mx-auto leading-relaxed">
              We prioritize your privacy with end-to-end encryption and secure sharing features. Your data is never compromised, and you’re in control of what you share.
            </p>
          </div>

          <div className=''>
            <h2 className="text-2xl font-semibold text-white mb-4 font-asimovian">End-to-End Encryption</h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              HashHub employs state-of-the-art end-to-end encryption to ensure that only you and your intended recipients have access to your shared content. Whether it’s images, posts, or personal messages, your data is encrypted from the moment you upload it until it’s viewed by the recipient.
            </p>

            <h2 className="text-2xl font-semibold text-white mb-4 font-asimovian">Your Data, Your Control</h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              We believe that privacy is a fundamental right. With HashHub, you are in complete control of your data. You decide what to share, when to share it, and with whom. We never compromise on privacy, and we never sell your data.
            </p>
          </div>

        </div>

      </div>



      {/* Footer */}
      {/* <Footer /> */}
    </div>
  );
}

export default Landing;
