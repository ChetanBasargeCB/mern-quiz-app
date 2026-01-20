import React from "react";

export const Navbar = (logoSrc) => {
  return (
    <nav>
      <div className="flex justify-between flex-wrap mx-5 border-b border-b-gray-200 p-2 h-fit ">
        <div className="font-bold hover:scale-105">Logo</div>
        <h1>Quiz Application</h1>
        <div className="flex justify-between gap-10 mr-5">
          <button className="w-28 bg-green-400 text-white p-1  rounded-sm hover:scale-105 hover:bg-green-500 cursor-pointer">
            My Result
          </button>

          <button className="w-28 bg-red-400 text-white p-1  rounded-sm hover:scale-105 hover:bg-red-500 cursor-pointer">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};
