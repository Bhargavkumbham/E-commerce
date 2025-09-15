import React from 'react';
import { booksData } from '../data/books';

const Books = () => {
  const firstTwelveImages = booksData.slice(0, 7);

  return (
    <>
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Books</h2>
      </div>
      <div className="flex flex-wrap justify-center gap-6 px-2">
        {firstTwelveImages.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden flex flex-col items-center w-40 mb-4"
          >
            <img
              className="w-full h-56 object-cover transition-transform duration-300 hover:scale-105"
              src={item.image}
              alt="book"
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Books;
