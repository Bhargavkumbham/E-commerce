import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { cartItems } = useCart();

  return (
    <>
      <nav className="w-full bg-white shadow-md rounded-md mt-10">
        <div className="max-w-screen-lg mx-auto flex flex-wrap items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center text-gray-900 text-2xl font-bold tracking-tight">
            E-Mart
          </Link>

          <div className="hidden md:flex items-center flex-1 justify-center mx-4">
            <input
              type="text"
              placeholder="Search..."
              className="w-64 px-3 py-2 border border-gray-300 bg-white text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex items-center gap-6">
            <Link to="/login" className="text-blue-600 font-medium hover:underline hover:text-blue-700 transition">
              Login/SignUp
            </Link>
            <Link to="/cart" className="relative flex items-center gap-2 text-gray-900 hover:text-blue-600 transition">
              <span>Cart</span>
              <span className="bg-blue-500 text-white rounded-full px-2 text-xs font-bold">
                {cartItems.length}
              </span>
            </Link>
          </div>
        </div>
        <div className="bg-gray-100 border-t border-gray-300">
          <ul className="flex justify-center gap-3 py-2 text-gray-700 text-base">
            {["mobiles", "computers", "books", "fridges", "ac"].map((item) => (
              <li key={item}>
                <Link
                  to={`/${item}`}
                  className="px-4 py-1 rounded hover:bg-blue-500 hover:text-white transition font-semibold"
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
