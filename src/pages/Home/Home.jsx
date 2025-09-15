import { div } from 'framer-motion/client';
import React, { useState } from 'react'

function Home() {
  const [clicked, setClicked] = useState(null);

  return (
    // testing out click things for chat 
    <div className='text-white bg-black min-h-screen w-full'>

      <div className='w-full h-screen grid grid-cols-[25%_75%]'>
        <div className=''>
          {
            clicked ?
              <div className='text-4xl font-bold flex justify-center items-center relative flex-col gap-8 bg-red-800 min-h-full'>
                <button onClick={(prev) => { setClicked(!prev) }} className=' text-white bg-transparent absolute top-2 right-2 '>
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 72 72">
                    <path fill='#FFFFFF' d="M 19 15 C 17.977 15 16.951875 15.390875 16.171875 16.171875 C 14.609875 17.733875 14.609875 20.266125 16.171875 21.828125 L 30.34375 36 L 16.171875 50.171875 C 14.609875 51.733875 14.609875 54.266125 16.171875 55.828125 C 16.951875 56.608125 17.977 57 19 57 C 20.023 57 21.048125 56.609125 21.828125 55.828125 L 36 41.65625 L 50.171875 55.828125 C 51.731875 57.390125 54.267125 57.390125 55.828125 55.828125 C 57.391125 54.265125 57.391125 51.734875 55.828125 50.171875 L 41.65625 36 L 55.828125 21.828125 C 57.390125 20.266125 57.390125 17.733875 55.828125 16.171875 C 54.268125 14.610875 51.731875 14.609875 50.171875 16.171875 L 36 30.34375 L 21.828125 16.171875 C 21.048125 15.391875 20.023 15 19 15 z"></path>
                  </svg>
                </button>
              </div>
              :
              <div className='w-full h-full'>
                <div className='h-[20%] bg-white/30 flex justify-center items-center'>
                  Ji
                </div>

                <div className='h-[80%] bg-gray-600 p-4 text-center '>
                  <p>the click button is to click and go to chat space of the user   </p>
                  <button onClick={() => { setClicked(true) }} className='px-4 py-2 text-black bg-white '>click me </button>
                </div>
              </div>
          }

        </div>

        {/* right side 75% */}
        <div className='p-4'>
          idhar kuch toh bhi aega
        </div>
      </div>
    </div>
  )
}

export default Home