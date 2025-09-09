import React, { useState } from 'react'

function Home() {
  const [clicked, setClicked] = useState(null);

  return (
    // testing out click things for chat 
    <div className='text-white bg-black min-h-screen w-full'>
      {
        clicked ? <><div className='text-4xl font-bold flex justify-center items-center'>
          <h1>hello</h1>
          <button onClick={(prev) => { setClicked(!prev) }} className='px-4 py-2 text-black bg-white '>click me </button>


        </div></> :

          <div className='w-full h-screen grid grid-cols-[25%_75%]'>
            <div className=''>
              <div className='h-[20%] bg-red-700'>
                Ji
              </div>

              <div className='h-[80%] bg-gray-600'>
                <button onClick={() => { setClicked(true) }} className='px-4 py-2 text-black bg-white '>click me </button>
              </div>
            </div>
            <div>

            </div>
          </div>
      }



    </div>
  )
}

export default Home