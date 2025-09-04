import React from 'react'
import { DarkVeil, Footer, Navbar } from '../../components/index'

function Landing() {
    return (
        <div className='w-full min-h-screen relative flex flex-col justify-between text-white'>
            <DarkVeil />

            {/* navbar  */}
            <div className='w-full z-10'>
                <Navbar />
            </div>

            {/* content  */}
            <div className='flex items-center justify-center'>
                <div className='text-center max-w-2xl px-4'>
                    <h1 className='text-4xl md:text-5xl font-bold mb-4'>Discover, Connect, and Share with HashHub</h1>
                    <p className='text-lg md:text-xl mb-8'>Your ultimate social media platform to explore trending topics, connect with like-minded people, and express yourself through powerful hashtags and communities.</p>
                    <div className='flex justify-center space-x-4'>
                        <button className='px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition'>Get Started</button>
                        <button className='px-6 py-3 bg-transparent border border-white rounded-lg hover:bg-white/10 transition'>Learn More</button>
                    </div>
                </div>

                
            </div>

            {/* Footer  */}
            <div className='w-full z-10'>
                <Footer />
            </div>
        </div>
    )
}

export default Landing
