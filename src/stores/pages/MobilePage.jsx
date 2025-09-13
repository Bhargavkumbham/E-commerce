import React, { useState } from 'react';
import { mobileData } from '../data/mobiles';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const sortOptions = [
  { value: 'priceLowHigh', label: 'Price: Low to High' },
  { value: 'priceHighLow', label: 'Price: High to Low' },
  { value: 'dateModified', label: 'Date Modified' },
];

const MobilePage = () => {
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [sortType, setSortType] = useState('priceLowHigh');

  const companyHandler = (mango) => {
    if (selectedProduct.includes(mango)) {
      setSelectedProduct(selectedProduct.filter((item) => item !== mango));
    } else {
      setSelectedProduct([...selectedProduct, mango]);
    }
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

  const uniqueCompanies = [...new Set(mobileData.map((item) => item.company))];

  return (
    <>
      <Navbar />
      <div className="max-w-screen-lg mx-auto px-4 py-6 flex flex-col md:flex-row gap-6">
        <aside className="md:w-1/4 bg-white rounded-xl shadow-md p-4 sticky top-24 self-start">
          <div className="flex flex-col mb-4">
            <label className="font-semibold text-gray-900 mb-2">Sort by</label>
            <select
              value={sortType}
              onChange={e => setSortType(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none"
            >
              {sortOptions.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div className="my-4 border-t" />
          <h3 className="text-xl font-bold mb-4 text-gray-900">Filter by Company</h3>
          <div className="flex flex-col space-y-3">
            {uniqueCompanies.map((company, idx) => (
              <label
                key={idx}
                className="flex items-center space-x-3 cursor-pointer select-none text-gray-800 font-semibold"
              >
                <input
                  type="checkbox"
                  className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  checked={selectedProduct.includes(company)}
                  onChange={() => companyHandler(company)}
                />
                <span>{company}</span>
              </label>
            ))}
          </div>
        </aside>
        <main className="md:w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProduct.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300"
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
        </main>
      </div>
    </>
  );
};

export default MobilePage;
