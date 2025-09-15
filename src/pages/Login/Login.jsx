import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error for this field if it was set
    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Invalid email format';

    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6)
      newErrors.password = 'Password must be at least 6 characters';

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    console.log('Form submitted:', formData);
  };

  return (
    <div className="flex items-center justify-center flex-col bg-[linear-gradient(to_right_top,#000000,#08080c,#0a1214)] text-white min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)] pointer-events-none" />
      <motion.div
        className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl shadow-gray-900/50 w-[90%] sm:w-[75%] md:w-[50%] lg:w-[35%] max-w-md mx-auto px-4 sm:px-6 py-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
      >
        <h1 className="w-full mx-auto text-center font-bold text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 font-[Inter,sans-serif] tracking-tight border-b border-white/10 pb-2 mb-6">
          Login to HashHub
        </h1>

        <form className="mx-4 sm:mx-6" onSubmit={handleSubmit}>
          {/* Show all errors at once in a list */}
          {Object.keys(errors).length > 0 && (
            <motion.ul
              className="text-left text-red-400 font-medium mb-4 rounded-md bg-red-100/10 px-3 py-2 border border-red-500/30 list-disc list-inside"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {Object.values(errors).map((err, idx) => (
                <li key={idx}>{err}</li>
              ))}
            </motion.ul>
          )}

          {/* Email */}
          <motion.div
            className="flex flex-col mb-4"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <label className="my-2 font-semibold text-gray-200" htmlFor="email">
              Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className={`p-2 bg-transparent text-white border ${
                errors.email ? 'border-red-500' : 'border-gray-600'
              } rounded-md focus:border-teal-400 outline-none transition-all duration-300`}
            />
          </motion.div>

          {/* Password */}
          <motion.div
            className="flex flex-col mb-4 relative"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <label
              className="my-2 font-semibold text-gray-200"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              id="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className={`p-2 bg-transparent text-white border ${
                errors.password ? 'border-red-500' : 'border-gray-600'
              } rounded-md focus:border-teal-400 outline-none transition-all duration-300`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-[65%] translate-y-[-10%] text-gray-400 hover:text-teal-400 transition-colors"
            >
              {/* same eye SVG as before */}
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
          </motion.div>

          {/* Submit Button */}
          <motion.div
            className="flex flex-col mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-teal-500 text-white px-4 py-2 rounded-md hover:bg-gradient-to-r hover:from-blue-600 hover:to-teal-600 transition-all duration-300 shadow-lg"
            >
              Login to HashHub
            </button>
          </motion.div>
        </form>

        <motion.div
          className="w-full mx-auto text-center text-sm text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="text-teal-400 hover:underline">
            Sign up now
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Login;
