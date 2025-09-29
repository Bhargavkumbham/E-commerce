import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const sortOptions = [
  { value: 'priceLowHigh', label: 'Prices: Low to High' },
  { value: 'priceHighLow', label: 'Prices: High to Low' },
];

const itemsPerPage = 9;

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [sortType, setSortType] = useState('priceLowHigh');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get('https://fakestoreapi.com/products')
      .then((response) => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const uniqueBooks = [...new Set(books.map(item => item.category))];

  const categoryHandler = (category) => {
    if (selectedProduct.includes(category)) {
      setSelectedProduct(selectedProduct.filter(item => item !== category));
    } else {
      setSelectedProduct([...selectedProduct, category]);
    }
    setCurrentPage(1);
  };

  const sortedBooks = [...books].sort((a, b) => {
    switch (sortType) {
      case 'priceLowHigh':
        return a.price - b.price;
      case 'priceHighLow':
        return b.price - a.price;
      default:
        return 0;
    }
  });

  const filteredBooks = selectedProduct.length === 0
    ? sortedBooks
    : sortedBooks.filter(item => selectedProduct.includes(item.category));

  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBooks = filteredBooks.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Navbar />
      <div className="max-w-screen-lg mx-auto px-4 py-6 flex flex-col md:flex-row gap-6">
        <aside className="md:w-1/4 bg-white rounded-xl shadow-md p-4 sticky top-24 self-start">
          <div className="flex flex-col mb-4">
            <label className="font-semibold text-gray-900 mb-2">Sort by</label>
            <select
              value={sortType}
              onChange={e => {
                setSortType(e.target.value);
                setCurrentPage(1);
              }}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none text-gray-800 bg-white"
            >
              {sortOptions.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div className="my-4 border-t border-gray-300" />
          <h3 className="text-xl font-bold mb-4 text-gray-900">Filter by Category</h3>
          <div className="flex flex-col space-y-3">
            {uniqueBooks.map((category, idx) => (
              <label
                key={idx}
                className="flex items-center space-x-3 cursor-pointer select-none text-gray-800 font-semibold"
              >
                <input
                  type="checkbox"
                  className="w-5 h-5 text-gray-600 rounded border-gray-400 focus:ring-gray-500"
                  checked={selectedProduct.includes(category)}
                  onChange={() => categoryHandler(category)}
                />
                <span>{category}</span>
              </label>
            ))}
          </div>
        </aside>
        <main className="md:w-3/4">
          <nav className="text-sm text-gray-600 mb-4" aria-label="Breadcrumb">
            <ol className="list-reset flex">
              <li>
                <Link to="/" className="text-gray-700 underline hover:text-gray-900">
                  Home
                </Link>
              </li>
              <li>
                <span className="mx-2">/</span>
              </li>
              <li className="text-gray-500" aria-current="page">
                Books
              </li>
            </ol>
          </nav>
          {loading ? (
            <div className="text-center my-8 text-xl text-gray-700">Loading books...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {paginatedBooks.map(item => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-md border border-gray-300 overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300"
                >
                  <Link to={`/books/${item.id}`}>
                    <div className="w-full h-48 bg-gray-50 flex items-center justify-center p-4 overflow-hidden rounded-t-xl">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="max-w-full max-h-full object-contain rounded-xl transition-transform duration-300 hover:scale-105 bg-white"
                      />
                    </div>
                  </Link>
                  <div className="p-3 text-center text-gray-900 font-semibold">
                    {item.title}
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="flex justify-center mt-6 space-x-3">
            <button
              onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded border border-gray-400 bg-gray-100 text-gray-600 disabled:opacity-40"
            >
              Prev
            </button>
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                onClick={() => handlePageChange(idx + 1)}
                className={`px-3 py-1 rounded border ${
                  currentPage === idx + 1
                    ? 'bg-white border-gray-500 text-gray-700'
                    : 'bg-gray-100 border-gray-400 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {idx + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded border border-gray-400 bg-gray-100 text-gray-600 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </main>
      </div>
    </>
  );
};

export default BooksPage;
