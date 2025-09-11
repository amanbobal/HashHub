import React from 'react'

function Footer() {
  return (
    <footer className="bg-black text-white py-6 mt-8">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        {/* Logo / Brand */}
        <p className="font-semibold text-lg">HashHub</p>

        {/* Links */}
        <div className="flex space-x-6 text-sm">
          <a href="#" className="hover:text-gray-300 transition">About</a>
          <a href="#" className="hover:text-gray-300 transition">Privacy</a>
          <a href="#" className="hover:text-gray-300 transition">Contact</a>
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} HashHub. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
