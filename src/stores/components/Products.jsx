import React, { useState } from 'react';
import { computerData } from '../data/computers';
import { mobileData } from '../data/mobiles';
import { acData } from '../data/ac';
import { fridgeData } from '../data/fridge';
import { booksData } from '../data/books';

const itemsPerCategory = 4;

const categories = [
  { title: 'Computers', data: computerData },
  { title: 'Mobiles', data: mobileData },
  { title: 'Air Conditioners', data: acData },
  { title: 'Fridges', data: fridgeData },
  { title: 'Books', data: booksData },
];

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(
    ...categories.map(cat => Math.ceil(cat.data.length / itemsPerCategory))
  );

  const paginate = (data) => {
    const startIndex = (currentPage - 1) * itemsPerCategory;
    return data.slice(startIndex, startIndex + itemsPerCategory);
  };

  return (
    <div>

      {categories.map(({ title, data }) => (
        <CategorySection key={title} title={title} items={paginate(data)} />
      ))}

      <div className="flex justify-center space-x-4 mt-8">
        <button
          onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-4 py-2 text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

const CategorySection = ({ title, items }) => (
  <div className="mb-10">
    <h3 className="text-2xl font-semibold mb-4 text-center">{title}</h3>
    <div className="flex flex-wrap justify-center gap-6 px-4">
      {items.map((item, idx) => (
        <div
          key={idx}
          className="bg-white rounded-xl shadow-md border border-gray-200 w-64 flex flex-col items-center hover:shadow-lg transition-shadow duration-300 overflow-hidden"
        >
          <img
            className={`w-full h-64 transition-transform duration-300 hover:scale-105 ${
              title === 'Books' ? 'object-contain bg-white' : 'object-cover'
            }`}
            src={item.image}
            alt={item.name || title}
          />
        </div>
      ))}
    </div>
  </div>
);

export default Products;
