import React, { useEffect, useState } from "react";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { CiLogout } from "react-icons/ci";
import { MdOutlineMenu, MdClose } from "react-icons/md";
import logo from "../assets/AiLogo.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { navbarStyles } from "../assets/dummyStyle";

export const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [menuopen, setMenuopen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    setLoggedIn(!!user);

    const handleAuthChange = (e) => setLoggedIn(!!e.detail?.user);
    window.addEventListener("authchanged", handleAuthChange);
    return () => window.removeEventListener("authchanged", handleAuthChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("authtoken");
    window.dispatchEvent(new CustomEvent("authchanged", { detail: { user: null } }));
    setLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="border-b border-gray-200 bg-white relative z-50 shadow-sm h-20 flex items-center">
      <div className="flex items-center justify-between px-5 py-3 max-w-7xl mx-auto w-full relative">
        
        {/* Left Side: App Name */}
        <h1 className="text-2xl font-black text-indigo-600 hidden lg:block tracking-tighter italic">
          QuizMaster AI
        </h1>

        {/* Center: Enhanced Logo */}
        <Link 
          to="/" 
          className="absolute left-1/2 -translate-x-1/2 flex items-center group"
        >
          <div className="relative p-1 rounded-full bg-gradient-to-tr from-indigo-600 via-purple-500 to-pink-500 shadow-lg group-hover:shadow-indigo-200 transition-all duration-300 group-hover:scale-110">
            <div className="bg-white rounded-full p-0.5">
               <img 
                src={logo} 
                alt="logo" 
                className="h-12 w-12 md:h-16 md:w-16 rounded-full object-cover" 
              />
            </div>
            <div className="absolute inset-0 rounded-full bg-indigo-500 animate-ping opacity-0 group-hover:opacity-20 transition-opacity"></div>
          </div>
        </Link>

        {/* Right Side: Desktop Auth Buttons */}
        <div className="hidden md:flex items-center">
          {loggedIn ? (
            <button 
              onClick={handleLogout} 
              className="flex items-center gap-2 bg-red-500 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-red-600 transition-all shadow-sm active:scale-95"
            >
              Logout <RiLogoutBoxRLine />
            </button>
          ) : (
            <Link 
              to="/login" 
              className="flex items-center gap-2 bg-indigo-600 text-white px-8 py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-md active:scale-95 shadow-indigo-100"
            >
              Login <CiLogout className="stroke-[3px]" />
            </Link>
          )}
        </div>

        {/* Mobile Menu Trigger */}
        <button 
          className="md:hidden text-3xl text-gray-600 p-2 focus:outline-none absolute right-4" 
          onClick={() => setMenuopen(!menuopen)}
        >
          {menuopen ? <MdClose /> : <MdOutlineMenu />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuopen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b shadow-xl p-6 space-y-4 flex flex-col items-center animate-in slide-in-from-top duration-300 z-40">
          {loggedIn ? (
            <button 
              onClick={() => { handleLogout(); setMenuopen(false); }} 
              className="w-full bg-red-500 text-white py-3 rounded-xl font-bold text-center"
            >
              Logout
            </button>
          ) : (
            <Link 
              to="/login" 
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold text-center" 
              onClick={() => setMenuopen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};