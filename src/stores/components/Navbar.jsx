import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { BookmarkIcon } from '@heroicons/react/24/solid';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';

const Navbar = () => {
  const { cartItems } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

  const productPages = {
    mobiles: "/mobiles",
    computers: "/computers",
    books: "/books",
    fridges: "/fridges",
    ac: "/ac",
  };

  const categories = Object.keys(productPages);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    if (e.target.value) {
      navigate(productPages[e.target.value]);
    }
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
    <nav className="w-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 shadow-lg rounded-b-lg border-t border-b border-gray-300">
      <div className="max-w-screen-lg mx-auto flex flex-wrap items-center justify-between px-6 py-4">
        <Link
          to="/"
          className="flex items-center"
        >
          <img src="/assets/logo.png" alt="E-mart" className="h-24 w-auto" />
        </Link>

        <form
          onSubmit={handleSearchSubmit}
          className="hidden md:flex items-center flex-1 justify-center mx-6 space-x-4"
        >
          <div className="flex">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-64 px-4 py-2 border border-gray-300 bg-white text-gray-900 rounded-l-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
              style={{ borderRightWidth: 0 }}
            />

            <button
              type="submit"
              className="px-5 py-2 bg-gray-600 text-white rounded-r-md shadow hover:bg-gray-700 transition border border-gray-300 border-l-0"
            >
              Search
            </button>
          </div>

          <div className="relative">
            <label htmlFor="category-select" className="sr-only">
              Categories
            </label>
            <select
              id="category-select"
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="px-4 py-2 border border-gray-300 bg-white text-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 cursor-pointer transition"
              aria-label="Select category"
            >
              <option value="" disabled>
                Categories
              </option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </form>

        <div className="flex items-center gap-8">
          <Link
            to="/login"
            className="text-gray-700 font-semibold hover:underline hover:text-gray-900 transition"
          >
            Login / Sign Up
          </Link>

          <Link
            to="/saved"
            className="relative flex items-center gap-1 text-gray-700 hover:text-gray-900 transition"
            aria-label="Saved Items"
          >
            <BookmarkIcon className="h-6 w-6" />
          </Link>

          <Link
            to="/cart"
            className="relative flex items-center gap-2 text-gray-700 hover:text-gray-900 transition"
          >
            <ShoppingCartIcon className="h-6 w-6" />
            <span className="absolute -top-2 -right-3 bg-gray-800 text-white rounded-full px-2 text-xs font-bold">
              {cartItems.length}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
