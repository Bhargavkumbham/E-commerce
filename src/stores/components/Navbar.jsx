import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { cartItems } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const productPages = {
    mobiles: "/mobiles",
    computers: "/computers",
    books: "/books",
    fridges: "/fridges",
    ac: "/ac",
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = searchTerm.trim().toLowerCase();

    if (query) {
      if (productPages[query]) {
        navigate(productPages[query]);
      } 
    }
  };

  return (
    <nav className="w-full bg-gray-100 shadow-md rounded-md border border-gray-300">
      <div className="max-w-screen-lg mx-auto flex flex-wrap items-center justify-between px-4 py-3">
        <Link
          to="/"
          className="flex items-center text-gray-900 text-2xl font-extrabold tracking-tight"
        >
          <img src="/assets/logo.png" alt="E-mart" className="h-24 w-auto" />
        </Link>

        <form
          onSubmit={handleSearchSubmit}
          className="hidden md:flex items-center flex-1 justify-center mx-4"
        >
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-64 px-3 py-2 border border-gray-400 bg-white text-gray-800 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-gray-500 text-white rounded-r-md hover:bg-gray-600 transition"
          >
            Search
          </button>
        </form>

        <div className="flex items-center gap-6">
          <Link
            to="/login"
            className="text-gray-700 font-semibold hover:underline hover:text-gray-900 transition"
          >
            Login/SignUp
          </Link>
          <Link
            to="/cart"
            className="relative flex items-center gap-2 text-gray-900 hover:text-gray-700 transition"
          >
            <span>Cart</span>
            <span className="bg-gray-700 text-white rounded-full px-2 text-xs font-bold">
              {cartItems.length}
            </span>
          </Link>
        </div>
      </div>
      <div className="bg-gray-200 border-t border-gray-300">
        <ul className="flex justify-center gap-3 py-2 text-gray-700 text-base font-semibold">
          {["mobiles", "computers", "books", "fridges", "ac"].map((item) => (
            <li key={item}>
              <Link
                to={`/${item}`}
                className="px-4 py-1 rounded hover:bg-gray-500 hover:text-white transition"
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
