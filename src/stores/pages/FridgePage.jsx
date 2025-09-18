import React, { useState } from 'react';
import { fridgeData } from '../data/fridge';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const sortOptions = [
  { value: 'priceLowHigh', label: 'Price: Low to High' },
  { value: 'priceHighLow', label: 'Price: High to Low' },
  { value: 'dateModified', label: 'Date Modified' },
];

const itemsPerPage = 9;

const FridgePage = () => {
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [sortType, setSortType] = useState('priceLowHigh');
  const [currentPage, setCurrentPage] = useState(1);

  const uniqueCompanies = [...new Set(fridgeData.map(item => item.brand))];

  const companyHandler = (product) => {
    if (selectedProduct.includes(product)) {
      setSelectedProduct(selectedProduct.filter(item => item !== product));
    } else {
      setSelectedProduct([...selectedProduct, product]);
    }
    setCurrentPage(1);
  };

  const sortedFridges = [...fridgeData].sort((a, b) => {
    switch (sortType) {
      case 'priceLowHigh':
        return a.price - b.price;
      case 'priceHighLow':
        return b.price - a.price;
      case 'dateModified':
        return new Date(b.dateModified) - new Date(a.dateModified);
      default:
        return 0;
    }
  });

  const filteredProduct = selectedProduct.length === 0
    ? sortedFridges
    : sortedFridges.filter(item => selectedProduct.includes(item.brand));

  const totalPages = Math.ceil(filteredProduct.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProduct.slice(startIndex, startIndex + itemsPerPage);

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
          <h3 className="text-xl font-bold mb-4 text-gray-900">Filter by Brand</h3>
          <div className="flex flex-col space-y-3">
            {uniqueCompanies.map((brand, idx) => (
              <label
                key={idx}
                className="flex items-center space-x-3 cursor-pointer select-none text-gray-800 font-semibold"
              >
                <input
                  type="checkbox"
                  className="w-5 h-5 text-gray-600 rounded border-gray-400 focus:ring-gray-500"
                  checked={selectedProduct.includes(brand)}
                  onChange={() => companyHandler(brand)}
                />
                <span>{brand}</span>
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
                Fridges
              </li>
            </ol>
          </nav>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {paginatedProducts.map(item => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-md border border-gray-300 overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300"
              >
                <Link to={`/fridges/${item.id}`}>
                  <img
                    src={item.image}
                    alt={`${item.brand} ${item.model}`}
                    className="w-full h-auto object-contain"
                  />
                </Link>
                <div className="p-3 text-center text-gray-900 font-semibold">
                  {item.brand}, {item.model}
                </div>
              </div>
            ))}
          </div>

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

export default FridgePage;
