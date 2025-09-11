import React, { useState } from 'react';
import { booksData } from '../data/books';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const BooksPage = () => {
  const [selectedProduct, setSelectedProduct] = useState([]);
  const uniqueBooks = [...new Set(booksData.map(item => item.category))];

  const categoryHandler = (category) => {
    if (selectedProduct.includes(category)) {
      setSelectedProduct(selectedProduct.filter(item => item !== category));
    } else {
      setSelectedProduct([...selectedProduct, category]);
    }
  };

  const filteredProduct = selectedProduct.length === 0
    ? booksData
    : booksData.filter(item => selectedProduct.includes(item.category));

  return (
    <>
      <Navbar />
      <div className="max-w-screen-lg mx-auto px-4 py-6 flex flex-col md:flex-row gap-6">
        <aside className="md:w-1/4 bg-white rounded-xl shadow-md p-4 sticky top-24 self-start">
          <h3 className="text-xl font-bold mb-4 text-gray-900">Filter by Category</h3>
          <div className="flex flex-col space-y-3">
            {uniqueBooks.map((category, idx) => (
              <label
                key={idx}
                className="flex items-center space-x-3 cursor-pointer select-none text-gray-800 font-semibold"
              >
                <input
                  type="checkbox"
                  className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  checked={selectedProduct.includes(category)}
                  onChange={() => categoryHandler(category)}
                />
                <span>{category}</span>
              </label>
            ))}
          </div>
        </aside>

        <main className="md:w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProduct.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300"
            >
              <Link to={`/books/${item.id}`}>
                <img
                  src={item.image}
                  alt={`${item.title} by ${item.author}`}
                  className="w-full h-auto object-contain"
                />
              </Link>
              <div className="p-3 text-center text-gray-900 font-semibold">
                {item.title}, {item.author}
              </div>
            </div>
          ))}
        </main>
      </div>
    </>
  );
};

export default BooksPage;
