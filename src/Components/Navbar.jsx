import React, { useState } from "react";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { CiLogout } from "react-icons/ci";
import { MdOutlineMenu, MdClose } from "react-icons/md";
import { BsFillBookmarkStarFill } from "react-icons/bs";
import logo from "../assets/logo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { navbarStyles } from "../assets/dummyStyle";

export const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(true);
  const [menuopen, setMenuopen] = useState(false);
  const navigate = useNavigate();

  const handellogout = () => {
    try {
      localStorage.clear();
    } catch (err) {}

    window.dispatchEvent(
      new CustomEvent("authchanged", { detail: { user: null } })
    );

    setLoggedIn(false)
    setMenuopen(!loggedIn);
    navigate("/login");
  };

  return (
    <nav className="border-b border-gray-200">
      <div className="flex items-center justify-between px-5 py-3">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="logo" className="h-10" />
        </Link>
        <h1 className={navbarStyles.textlogo}>
           Quiz Application
        </h1>
        <div className="hidden md:flex gap-4">
          <button className="w-28 h-10 flex items-center justify-center gap-2 bg-green-400 text-white rounded-sm hover:bg-green-500">
            My Result <BsFillBookmarkStarFill />
          </button>

          {loggedIn ? (
            <button
              onClick={handellogout}
              className="w-28 h-10 flex items-center justify-center gap-2 bg-red-400 text-white rounded-sm hover:bg-red-500"
            >
              Logout <RiLogoutBoxRLine className="text-xl" />
            </button>
          ) : (
            <Link to="/login">
              <button className="w-28 h-10 flex items-center justify-center gap-2 bg-red-400 text-white rounded-sm hover:bg-red-500">
                Login <CiLogout className="text-xl" />
              </button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-3xl"
          onClick={() => setMenuopen(!menuopen)}
        >
          {menuopen ? <MdClose /> : <MdOutlineMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuopen && (
        <div className="md:hidden flex flex-col gap-3 px-5 pb-4">
          <button className="w-full h-10 flex items-center justify-center gap-2 bg-green-400 text-white rounded-sm">
            My Result <BsFillBookmarkStarFill />
          </button>

          {loggedIn ? (
            <button
              onClick={handellogout}
              className="w-full h-10 flex items-center justify-center gap-2 bg-red-400 text-white rounded-sm"
            >
              Logout <RiLogoutBoxRLine />
            </button>
          ) : (
            <Link to="/login">
              <button className="w-full h-10 flex items-center justify-center gap-2 bg-red-400 text-white rounded-sm">
                Login <CiLogout />
              </button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};
