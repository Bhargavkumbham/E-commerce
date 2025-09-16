import React, { useState } from 'react';
import { mobileData } from '../data/mobiles';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const sortOptions = [
  { value: 'priceLowHigh', label: 'Price: Low to High' },
  { value: 'priceHighLow', label: 'Price: High to Low' },
  { value: 'dateModified', label: 'Date Modified' },
];

const itemsPerPage = 9;

const MobilePage = () => {
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [sortType, setSortType] = useState('priceLowHigh');
  const [currentPage, setCurrentPage] = useState(1);

  const uniqueCompanies = [...new Set(mobileData.map((item) => item.company))];

  const companyHandler = (mango) => {
    if (selectedProduct.includes(mango)) {
      setSelectedProduct(selectedProduct.filter((item) => item !== mango));
    } else {
      setSelectedProduct([...selectedProduct, mango]);
    }
    setCurrentPage(1);
  };

  const sortedMobiles = [...mobileData].sort((a, b) => {
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

  const filteredProduct =
    selectedProduct.length === 0
      ? sortedMobiles
      : sortedMobiles.filter((orange) => selectedProduct.includes(orange.company));

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
              onChange={(e) => {
                setSortType(e.target.value);
                setCurrentPage(1);
              }}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none text-gray-800 bg-white"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div className="my-4 border-t border-gray-300" />
          <h3 className="text-xl font-bold mb-4 text-gray-900">Filter by Company</h3>
          <div className="flex flex-col space-y-3">
            {uniqueCompanies.map((company, idx) => (
              <label
                key={idx}
                className="flex items-center space-x-3 cursor-pointer select-none text-gray-800 font-semibold"
              >
                <input
                  type="checkbox"
                  className="w-5 h-5 text-gray-600 rounded border-gray-400 focus:ring-gray-500"
                  checked={selectedProduct.includes(company)}
                  onChange={() => companyHandler(company)}
                />
                <span>{company}</span>
              </label>
            ))}
          </div>
        </aside>
        <main className="md:w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {paginatedProducts.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-md border border-gray-300 overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300"
              >
                <Link to={`/mobiles/${item.id}`}>
                  <img
                    src={item.image}
                    alt={`${item.company} ${item.model}`}
                    className="w-full h-auto object-contain"
                  />
                </Link>
                <div className="p-3 text-center text-gray-900 font-semibold">
                  {item.company}, {item.model}
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

export default MobilePage;
