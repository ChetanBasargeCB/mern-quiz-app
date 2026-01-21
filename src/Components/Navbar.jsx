import React, { useState } from "react";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { CiLogout } from "react-icons/ci";
import { MdOutlineMenu } from "react-icons/md"
import { MdClose } from "react-icons/md";
import { BsFillBookmarkStarFill } from "react-icons/bs"
import logo from '../assets/logo.png'
import { navbarStyles } from "../assets/dummyStyle";
import { Link, NavLink, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const[loggedIn,setLoggedIn]=useState(false);
  const[menuopen,setMenuopen]=useState(false);
  const navigate =useNavigate()

  //!  Logout Function
  const handellogout = ()=>{
    try {
      localStorage.removeItem('authtoken')
      localStorage.clear()
    } catch (err) {
      // ignore all error
    }
    window.dispatchEvent(
      new CustomEvent('authchanged',{detail:{user:null}})
    )
    setMenuopen(false)
    try {
      navigate("/login")
    } catch (e) {
      window.location.href="/login"
    }
  }
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
          { loggedIn ?<NavLink to="">
            <button className="w-28 h-10 flex  justify-center items-center gap-2 bg-red-400 text-white p-1  rounded-sm hover:scale-105 hover:bg-red-500 cursor-pointer">
             Logout <RiLogoutBoxRLine className="text-2xl text-black hover:scale-110"/>
            </button>
          </NavLink> 
          : <Link to="/login">
            <button className="w-28 h-10 flex  justify-center items-center gap-2 bg-red-400 text-white p-1  rounded-sm hover:scale-105 hover:bg-red-500 cursor-pointer">
             Login <CiLogout className="text-2xl text-black hover:scale-110"/>
            </button>
           </Link>}
      
        </div>
          <div>
            <button onClick={()=>setMenuopen(!menuopen)} className={navbarStyles.menuToggleButton}>
              {
                menuopen? <MdClose className={navbarStyles.menuIcon}></MdClose>
                : <MdOutlineMenu className={navbarStyles.menuIcon}></MdOutlineMenu>
              }
            </button>
          </div>
        </div>
       
    </nav>
  );
};
