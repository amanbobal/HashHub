import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../services/AuthContext';

function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    image: null,
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') setFormData({ ...formData, image: files[0] });
    else setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const formDataObj = new FormData();
      formDataObj.append("firstName", formData.firstName);
      formDataObj.append("lastName", formData.lastName);
      formDataObj.append("email", formData.email);
      formDataObj.append("password", formData.password);
      if (formData.image) formDataObj.append("image", formData.image);

      const response = await fetch("http://localhost/hashhub/signup.php", {
        method: "POST",
        body: formDataObj,
        credentials: "include",
      });

      const data = await response.json();
      if (data.status === "success") {
        const sessionRes = await fetch("http://localhost/hashhub/checkSession.php", {
          method: "GET",
          credentials: "include",
        });
        const sessionData = await sessionRes.json();
        setUser(sessionData.status === "success" ? sessionData.user : data.user);
        navigate("/home");
      } else {
        const backendErrors = [];
        if (data.emailError) backendErrors.email = data.emailError;
        if (data.message) backendErrors.general = data.message;
        if (data.imageStatus && data.status === "error") backendErrors.image = data.imageStatus;
        setErrors(backendErrors);
      }
    } catch (error) {
      console.error("Error:", error);
      setErrors({ general: "Something went wrong. Please try again." });
    }
  };

  return (
    <div className="flex items-center justify-center flex-col min-h-screen relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_70%)] pointer-events-none" />

      <motion.div
        className="bg-gray-900/70 backdrop-blur-lg border border-gray-800 rounded-2xl shadow-2xl shadow-black/70 w-[90%] lg:w-[40%] px-6 py-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
      >
        <h1 className="w-full mx-auto text-center font-bold text-2xl sm:text-3xl border-b border-gray-700 pb-2 mb-6 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-blue-400 to-purple-400">
          Sign Up
        </h1>

        <form className="mx-2 sm:mx-4" onSubmit={handleSubmit} encType="multipart/form-data">
          {Object.keys(errors).length > 0 && (
            <motion.div
              className="text-center text-red-500 font-medium mb-4 rounded-md bg-red-900/20 px-3 py-3 border border-red-500/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <ul className="list-disc list-inside">
                {Object.values(errors).map((err, idx) => (
                  <li key={idx}>{err}</li>
                ))}
              </ul>
            </motion.div>
          )}

          <motion.div
            className="flex w-full flex-col sm:flex-row"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="flex flex-col mb-4 w-full sm:mr-3">
              <label className="my-2 font-semibold" htmlFor="firstName">First Name</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="First Name"
                onChange={handleChange}
                className="p-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:border-teal-400 outline-none"
              />
            </div>
            <div className="flex flex-col mb-4 w-full sm:ml-3">
              <label className="my-2 font-semibold" htmlFor="lastName">Last Name</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Last Name"
                onChange={handleChange}
                className="p-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:border-teal-400 outline-none"
              />
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col mb-4"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <label className="my-2 font-semibold" htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Enter your email"
              onChange={handleChange}
              className="p-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:border-teal-400 outline-none"
            />
          </motion.div>

          <motion.div
            className="flex flex-col mb-4 relative"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <label className="my-2 font-semibold" htmlFor="password">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Enter new password"
              onChange={handleChange}
              className="p-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:border-teal-400 outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-[65%] translate-y-[-10%] text-gray-400 hover:text-teal-400 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 640 640" fill={showPassword ? '#2dd4bf' : '#aaa'}>
                <path d="M320 96C239.2 96 174.5 132.8 127.4 176.6C80.6 220.1 49.3 272 34.4 307.7C31.1 315.6 31.1 324.4 34.4 332.3C49.3 368 80.6 420 127.4 463.4C174.5 507.1 239.2 544 320 544C400.8 544 465.5 507.2 512.6 463.4C559.4 419.9 590.7 368 605.6 332.3C608.9 324.4 608.9 315.6 605.6 307.7C590.7 272 559.4 220 512.6 176.6C465.5 132.9 400.8 96 320 96zM176 320C176 240.5 240.5 176 320 176C399.5 176 464 240.5 464 320C464 399.5 399.5 464 320 464C240.5 464 176 399.5 176 320z" />
              </svg>
            </button>
          </motion.div>

          <motion.div
            className="flex flex-col mb-4"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <label className="my-2 font-semibold" htmlFor="image">Select Image</label>
            <input
              type="file"
              name="image"
              id="image"
              onChange={handleChange}
              accept="image/*"
              className="p-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:border-teal-400 outline-none file:bg-gray-700 file:text-white file:border-0 file:rounded file:px-3 file:py-1 file:mr-2 hover:file:bg-gray-600"
            />
          </motion.div>

          <motion.div
            className="flex flex-col mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-teal-500 text-white px-4 py-2 rounded-md hover:from-blue-600 hover:to-teal-600 transition-all duration-300 shadow-lg"
            >
              Continue to chat
            </button>
          </motion.div>
        </form>

        <motion.div
          className="w-full mx-auto text-center text-sm text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          Already signed up?{" "}
          <Link to="/login" className="text-teal-400 hover:underline">Login now</Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Signup;
