import React from "react";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { BsFillBookmarkStarFill } from "react-icons/bs"
import logo from '../assets/logo.png'
import { navbarStyles } from "../assets/dummyStyle";

export const Navbar = () => {
  return (
    <nav>
      <div className="flex justify-between flex-wrap mx-5 border-b border-b-gray-200 p-2 h-fit   ">
        <div className="font-bold hover:scale-105 "><img className="h-10 w-10 rounded-full object-contain bg-white p-1 shadow-md ring-1 ring-gray-200 transition-all duration-300 hover:shadow-lg hover:scale-105" src={logo} alt="logo"  /></div>
     <div className={navbarStyles.text}
 >
  <h1 className="font-semibold tracking-wide">
    Quiz Application
  </h1>
</div>

        <div className="flex justify-between gap-10 mr-5">
          <button className="w-28 flex justify-center items-center gap-2 h-10 bg-green-400 text-white p-1  rounded-sm hover:scale-105 hover:bg-green-500 cursor-pointer">
            My Result <BsFillBookmarkStarFill className="" />
          </button>

          <button className="w-28 h-10 flex  justify-center items-center gap-2 bg-red-400 text-white p-1  rounded-sm hover:scale-105 hover:bg-red-500 cursor-pointer">
            Login <RiLogoutBoxRLine className="text-2xl text-black hover:scale-110"/>
          </button>
        </div>
      </div>
    </nav>
  );
};
