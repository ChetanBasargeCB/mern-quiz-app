import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import register from "../assets/register.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [showPass, setShowPass] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const BackendAPI = "http://localhost:3000";

  const handelSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    // Input validations
    if (!name || !email || !password) {
      return setErrors({ field: "All fields require!" });
    }
    if (password.length < 6) {
      return setErrors({ password: "Password Must be 6 characters" });
    }
    const userdata = {
      name,
      email,
      password,
    };
    try {
      const resp = await axios.post(
        `${BackendAPI}/api/auth/register/`,
        userdata,
      );
      setSuccess(resp.data.message)
      // console.log(resp)

      setTimeout(() => navigate("/login"), 1700);
    } catch (err) {
      setErrors({
        field: err.response?.data?.message || "Registration failed",
      });
    }
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="grid grid-cols-1 md:grid-cols-2 bg-white rounded-xl shadow-2xl overflow-hidden max-w-4xl w-full"
      >
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="hidden md:flex items-center justify-center bg-green-50 p-6"
        >
          <img
            src={register}
            alt="Register"
            className="w-full max-w-sm object-contain"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="p-6 sm:p-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Create Account
          </h2>
          <form className="flex flex-col gap-4" onSubmit={handelSubmit}>
            <div>
              <label className="text-sm text-gray-600">Full Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Enter your name"
                className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-green-400 outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter your email"
                className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-green-400 outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPass ? "text" : "password"}
                placeholder="Minimum 6 characters"
                className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-green-400 outline-none"
              />
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                onChange={() => setShowPass(!showPass)}
                className="accent-green-500"
              />
              <span>Show Password</span>
            </div>
            <div>
              {/* Error Message */}
              {(errors.field || errors.password) && (
                <p className="text-red-500 text-sm text-center animate-pulse">
                  {errors.field || errors.password}
                </p>
              )}

              {/* Success Message */}
              {success && (
                <p className="text-green-600 text-sm text-center font-semibold">
                  {success}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 transition text-white py-2 rounded-md font-semibold"
            >
              Create Account
            </button>
            <div>
              <p className="text-center text-sm text-gray-600 mt-4">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Login
                </Link>
              </p>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
}
