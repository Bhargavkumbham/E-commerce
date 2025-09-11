import React, { useState } from 'react';
import { computerData } from '../data/computers';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const ComputerPage = () => {
  const [selectedProduct, setSelectedProduct] = useState([]);
  const uniqueCompanies = [...new Set(computerData.map(item => item.company))];

  const companyHandler = (product) => {
    if (selectedProduct.includes(product)) {
      setSelectedProduct(selectedProduct.filter(item => item !== product));
    } else {
      setSelectedProduct([...selectedProduct, product]);
    }
  };

  const filteredProduct = selectedProduct.length === 0
    ? computerData
    : computerData.filter(item => selectedProduct.includes(item.company));

  return (
    <>
      <Navbar />
      <div className="max-w-screen-lg mx-auto px-4 py-6 flex flex-col md:flex-row gap-6">
        <aside className="md:w-1/4 bg-white rounded-xl shadow-md p-4 sticky top-24 self-start">
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
          {filteredProduct.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300"
            >
              <Link to={`/computers/${item.id}`}>
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

export default ComputerPage;
