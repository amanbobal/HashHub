import React, { useState, useEffect } from "react";
import Users from "../Users/Users";

function Home() {
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoader(false);
    }, 1000);

    // Cleanup timer
    return () => clearTimeout(timer);
  }, []);

  return loader ? (
    <div className="w-full grid md:grid-cols-[30%_70%] h-screen overflow-auto animate-pulse">
      {/* Sidebar */}
      <div className="bg-gradient-to-br from-zinc-900 via-black to-zinc-800 p-4">
        <div className="w-full h-full bg-gradient-to-br from-black to-gray-700 flex-col flex">
          {/* User header skeleton */}
          <div className="flex-1/10 p-2 flex bg-black/30 items-center gap-5 px-4">
            <div className="p-2 bg-gray-700 rounded-full">
              <div className="w-[24px] h-[24px] rounded-full bg-gray-600"></div>
            </div>
            <div className="bg-black/25 flex flex-col justify-center gap-2 p-2 rounded">
              <div className="w-32 h-4 bg-gray-600 rounded"></div>
              <div className="w-20 h-3 bg-gray-700 rounded"></div>
            </div>
          </div>

          {/* Sidebar body skeleton */}
          <div className="flex-9/10 p-4 space-y-4">
            <div className="w-full h-6 bg-gray-700 rounded"></div>
            <div className="w-3/4 h-6 bg-gray-700 rounded"></div>
            <div className="w-2/3 h-6 bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>

      {/* Right side skeleton */}
      <div className="hidden md:block p-6 space-y-4">
        <div className="w-full h-6 bg-gray-700 rounded"></div>
        <div className="w-4/5 h-6 bg-gray-700 rounded"></div>
        <div className="w-3/5 h-6 bg-gray-700 rounded"></div>
      </div>
    </div>
  ) : (
    <div className="text-white bg-black w-full min-h-screen">
      <Users />
    </div>
  );
}

export default Home;
