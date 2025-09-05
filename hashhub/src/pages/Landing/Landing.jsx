import React from 'react'
import { DarkVeil, Footer, Navbar, SlideShow } from '../../components/index'

function Landing() {
  return (
    <div className="flex flex-col min-h-screen w-full relative text-white overflow-y-auto">
      <DarkVeil />

      {/* Navbar */}
      <div className="w-full z-10">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col md:flex-row items-center justify-center w-full">
        {/* Text Section */}
        <div className="w-full md:w-1/2 text-center max-w-2xl px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Discover, Connect, and Share with HashHub
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Your ultimate social media platform to explore trending topics, connect with like-minded people, and express yourself through powerful hashtags and communities.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition">
              Get Started
            </button>
            <button className="px-6 py-3 bg-transparent border border-white rounded-lg hover:bg-white/10 transition">
              Learn More
            </button>
          </div>
        </div>
        {/* SlideShow Section */}
        <div className="w-full md:w-1/2 flex justify-center items-center mt-8 md:mt-0 px-2">
          <SlideShow />
        </div>
      </div>
    </div>
  );
}




export default Landing
