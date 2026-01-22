import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { motion } from "framer-motion";
import login from "../assets/login.avif";
import { loginStyles } from "../assets/dummyStyle";
import toast, { Toaster } from "react-hot-toast";



export default function Login() {
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const BackendAPI = "http://localhost:3000";



  const handelSubmit = async (e) => {
    e.preventDefault();
    if(!email) return toast.error("Email is required")
    if (!password) return toast.error("Password is required")
    setLoading(true);

    try {
      const payload = {
        email: email.trim().toLowerCase(),
        password,
      };
      const resp = await fetch(`${BackendAPI}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await resp.json();

      if (!resp.ok) {
        toast.error(data.message || "Login failed")
        return;
      }
      
      localStorage.setItem("authtoken", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      window.dispatchEvent(
        new CustomEvent("authchanged", { detail: { user: data.user } })
      );
       toast.success(data.message || "Login successful");
      setTimeout(() =>{ navigate("/", { replace: true });}, 1000);

    } catch {
      toast.loading("Network error")

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <Toaster/>
      {/* Attached Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="grid grid-cols-1 md:grid-cols-2 bg-white rounded-xl shadow-2xl overflow-hidden max-w-4xl w-full"
      >
        {/* Image */}
        <div className="hidden md:flex items-center justify-center bg-blue-50 p-6">
          <img
            src={login}
            alt="Login"
            className="w-full max-w-sm object-contain"
          />
        </div>

        {/* Form */}
        <div className="p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Welcome Back 👋
          </h2>

          <form onSubmit={handelSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              />
             
            </div>

            <div>
              <label className="text-sm text-gray-600">Password</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                />
                <span
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-2.5 cursor-pointer text-gray-600"
                >
                  {showPass ? <FiEyeOff /> : <FiEye />}
                </span>
              </div>
             
            </div>
            <button
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-2 rounded-md font-semibold"
            >
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>

          <p className="text-center mt-6">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-600 font-medium">
              Register
            </Link>
          </p>

          <div className="flex justify-center mt-5">
            <Link
              to="/"
              className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition"
            >
              <FaArrowLeftLong /> Home
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
