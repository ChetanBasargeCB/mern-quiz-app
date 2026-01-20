import React from "react";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { BsFillBookmarkStarFill } from "react-icons/bs"
import logo from '../assets/logo.png'
import { navbarStyles } from "../assets/dummyStyle";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav>
      <div className="flex justify-between flex-wrap mx-5 border-b border-b-gray-200 p-2 h-fit ">
        <Link to="/">
        <div className="font-bold hover:scale-105 "><img className={navbarStyles.logo} src={logo} alt="logo"  /></div>
        </Link>
     <div className={navbarStyles.text}>
  <h1 className="font-semibold tracking-wide">
    Quiz Application
  </h1>
</div>

        <div className="flex justify-between gap-10 mr-5">
          <button className="w-28 flex justify-center items-center gap-2 h-10 bg-green-400 text-white p-1  rounded-sm hover:scale-105 hover:bg-green-500 cursor-pointer">
            My Result <BsFillBookmarkStarFill className="" />
          </button>
          <Link to="/login">
           <button className="w-28 h-10 flex  justify-center items-center gap-2 bg-red-400 text-white p-1  rounded-sm hover:scale-105 hover:bg-red-500 cursor-pointer">
            Login <RiLogoutBoxRLine className="text-2xl text-black hover:scale-110"/>
           </button>
          </Link>
     
        </div>
      </div>
    </nav>
  );
};
