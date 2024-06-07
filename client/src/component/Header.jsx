import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
export default function Header() {
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center mx-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-warp">
            <span className="text-slate-500">India</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>
        <form className="bg-slate-100 p-3 flex rounded-lg">
          <input
            type="text"
            placeholder="Search..."
            className="w-24 sm:w-64
            bg-transparent focus:outline-none"
          />
          <button>
            <FaSearch className="text-slate-600" />
          </button>
        </form>
        <ul className="flex gap-4">
          <Link to="/">
            <li className="hidden sm:inline hover:underline">Home</li>
          </Link>
          <Link to="/sign-in">
            <li className="hover:underline">SignIn</li>
          </Link>
          <Link to="sign-out">
            <li className="hover:underline">SignUp</li>
          </Link>
        </ul>
      </div>
    </header>
  );
}
