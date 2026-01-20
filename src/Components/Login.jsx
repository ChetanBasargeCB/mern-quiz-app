import React, { useState } from 'react'
import { FiEye, FiEyeOff } from "react-icons/fi"
import { Link } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6"
import login from '../assets/login.jpg'

export default function Login() {
  const [showPass, setShowPass] = useState(false)
  const[data,setData]=useState("")

  const handelSubmit=(e)=>{
    e.preventDefault()
  }

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-gray-300">
      
      {/* Left Image Section */}
      <div className="hidden md:flex items-center justify-center">
        <img 
          src={login} 
          alt="Login" 
          className="w-3/4 rounded-2xl shadow-2xl"
        />
      </div>

      {/* Right Form Section */}
      <div className="flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-2xl">

          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
            Welcome Back 👋
          </h2>
          <p className="text-center text-gray-500 mb-8">
            Login to continue to your account
          </p>

          <form className="space-y-5" onSubmit={handelSubmit} >
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-3 cursor-pointer text-gray-500 hover:text-gray-700"
                >
                  {showPass ? <FiEyeOff /> : <FiEye />}
                </span>
              </div>
            </div>

            <button
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
            >
              Login
            </button>
          </form>

          <p className="text-center text-gray-600 mt-6">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-600 font-semibold hover:underline">
              Register
            </Link>
          </p>

          <div className="flex justify-center mt-6">
            <Link
              to="/"
              className="flex items-center gap-2 text-sm bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition"
            >
              <FaArrowLeftLong /> Home
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}
