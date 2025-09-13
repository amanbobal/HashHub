import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastname: '',
    email: '',
    password: '',
    image: null,
  })
  const [errors, setErrors] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({...formData, [name] : value});
    setErrors({...errors, [name] : ''});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if(Object.keys(newErrors).length > 0){
      setErrors(newErrors);
      return;
    }
  }

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    return newErrors;
  }
  return (
    <>
      {/* <Navbar /> */}
      <div className="flex items-center justify-center flex-col bg-black text-white min-h-screen">
        <div className="bg-black border border-gray-700 rounded-2xl shadow-lg w-[90%] lg:w-[40%]">
          <div className="px-3 sm:px-6 py-8">
            <h1 className="w-full mx-auto text-center font-bold text-2xl border-b border-gray-700 pb-2 mb-6">
              Sign Up
            </h1>

            <form className="mx-5" onSubmit={handleSubmit}>
              {/* Error Message */}
              {Object.keys(errors).length > 0 && (

                <div className="text-center text-red-500 font-medium mb-4 rounded-md bg-red-100/10 px-3 py-3 border border-red-500/30">
                  {errors.email || errors.password || 'Please check your input'}
                </div>
              )



              }

              {/* Name details */}
              <div className="flex w-full flex-col sm:flex-row">
                <div className="flex flex-col mb-4 w-full mr-3">
                  <label className="my-2 font-semibold" htmlFor="firstName">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstname"
                    id="firstName"
                    placeholder="First Name"
                    onChange={handleChange}
                    className="p-2 bg-transparent text-white border border-gray-600 rounded-md focus:border-white outline-none"
                  />
                </div>
                <div className="flex flex-col mb-4 w-full ml-3">
                  <label className="my-2 font-semibold" htmlFor="lastName">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastname"
                    id="lastName"
                    placeholder="Last Name"
                    className="p-2 bg-transparent text-white border border-gray-600 rounded-md focus:border-white outline-none"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col mb-4">
                <label className="my-2 font-semibold" htmlFor="email">
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  className="p-2 bg-transparent text-white border border-gray-600 rounded-md focus:border-white outline-none"
                />
              </div>

              {/* Password */}
              <div className="flex flex-col mb-4 relative">
                <label className="my-2 font-semibold" htmlFor="password">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Enter new password"
                  className="p-2 bg-transparent text-white border border-gray-600 rounded-md focus:border-white outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-[65%] translate-y-[-10%] text-gray-400 hover:text-teal-400 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="16"
                    width="16"
                    viewBox="0 0 640 640"
                    fill={showPassword ? '#2dd4bf' : '#aaa'}
                  >
                    {showPassword ? (
                      <path d="M320 96C239.2 96 174.5 132.8 127.4 176.6C80.6 220.1 49.3 272 34.4 307.7C31.1 315.6 31.1 324.4 34.4 332.3C49.3 368 80.6 420 127.4 463.4C174.5 507.1 239.2 544 320 544C400.8 544 465.5 507.2 512.6 463.4C559.4 419.9 590.7 368 605.6 332.3C608.9 324.4 608.9 315.6 605.6 307.7C590.7 272 559.4 220 512.6 176.6C465.5 132.9 400.8 96 320 96zM176 320C176 240.5 240.5 176 320 176C399.5 176 464 240.5 464 320C464 399.5 399.5 464 320 464C240.5 464 176 399.5 176 320z" />
                    ) : (
                      <path d="M320 96C239.2 96 174.5 132.8 127.4 176.6C80.6 220.1 49.3 272 34.4 307.7C31.1 315.6 31.1 324.4 34.4 332.3C49.3 368 80.6 420 127.4 463.4C174.5 507.1 239.2 544 320 544C400.8 544 465.5 507.2 512.6 463.4C559.4 419.9 590.7 368 605.6 332.3C608.9 324.4 608.9 315.6 605.6 307.7C590.7 272 559.4 220 512.6 176.6C465.5 132.9 400.8 96 320 96zM176 320C176 240.5 240.5 176 320 176C399.5 176 464 240.5 464 320C464 399.5 399.5 464 320 464C240.5 464 176 399.5 176 320zM320 256C320 291.3 291.3 320 256 320C244.5 320 233.7 317 224.3 311.6C223.3 322.5 224.2 333.7 227.2 344.8C240.9 396 293.6 426.4 344.8 412.7C396 399 426.4 346.3 412.7 295.1C400.5 249.4 357.2 220.3 311.6 224.3C316.9 233.6 320 244.4 320 256z" />
                    )}
                  </svg>
                </button>
              </div>

              {/* Image input */}
              <div className="flex flex-col mb-4">
                <label className="my-2 font-semibold" htmlFor="image">
                  Select Image
                </label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  className="p-2 bg-transparent text-white border border-gray-600 rounded-md focus:border-white outline-none file:bg-gray-800 file:text-white file:border-0 file:rounded file:px-3 file:py-1 file:mr-2 hover:file:bg-gray-700"
                />
              </div>

              {/* Submit button */}
              <div className="flex flex-col mb-4">
                <button
                  type="submit"
                  className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition cursor-pointer"
                >
                  Continue to chat
                </button>
              </div>
            </form>

            <div className="w-full mx-auto text-center text-sm">
              Already signed up?{" "}
              <Link to={"/login"}>
                <button className="hover:underline text-gray-300 cursor-pointer"> Login now </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup
