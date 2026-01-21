import React, { useEffect, useState } from "react";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { CiLogout } from "react-icons/ci";
import { MdOutlineMenu, MdClose } from "react-icons/md";
import { BsFillBookmarkStarFill } from "react-icons/bs";
import logo from "../assets/AiLogo.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { navbarStyles } from "../assets/dummyStyle";

export const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [menuopen, setMenuopen] = useState(false);
  const navigate = useNavigate();

  //  Check auth on load + listen to login/logout
  useEffect(() => {
    const user = localStorage.getItem("user");
    setLoggedIn(!!user);

    const handleAuthChange = (e) => {
      setLoggedIn(!!e.detail?.user);
    };

    window.addEventListener("authchanged", handleAuthChange);
    return () => window.removeEventListener("authchanged", handleAuthChange);
  }, []);

  const handellogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("authtoken");

    window.dispatchEvent(
      new CustomEvent("authchanged", { detail: { user: null } }),
    );

    setLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="border-b border-gray-200 relative max-md:h-13"  >
      <div className="flex items-center justify-between px-5 py-3   ">
       <Link
  to="/"
  className=" absolute left-1/2 -translate-x-1/2 flex  items-center"
>
  <img
    src={logo}
    alt="logo"
    className={navbarStyles.logo}
  />
</Link>


        <h1 className={navbarStyles.textlogo}>Quiz Application</h1>

        {/* Desktop */}
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

        {/* Mobile menu button */}
        <button
          className="md:hidden text-3xl absolute right-0  top-1"
          onClick={() => setMenuopen(!menuopen)}
        >
          {menuopen ? <MdClose /> : <MdOutlineMenu />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuopen && (
        <div className="md:hidden absolute top-15 w-full  flex flex-col gap-3 px-5 pb-4">
          <button className="w-full h-10 flex items-center justify-center gap-2 bg-green-400 text-white rounded-lg">
            My Result <BsFillBookmarkStarFill />
          </button>

          {loggedIn ? (
            <button
              onClick={handellogout}
              className="w-full h-10 flex items-center justify-center gap-2 bg-red-400 text-white rounded-lg"
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
