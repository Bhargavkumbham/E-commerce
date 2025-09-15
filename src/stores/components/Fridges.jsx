import React from 'react';
import { fridgeData } from '../data/fridge';

const Fridges = () => {
  const firstFiveImages = fridgeData.slice(0, 5);

  return (
    <>
      <div className="text-3xl font-bold text-gray-900 text-center">Fridges</div>
      <div className="flex flex-wrap justify-center gap-6 px-4">
        {firstFiveImages.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden w-64 flex flex-col items-center hover:shadow-lg transition-shadow duration-300"
          >
            <img
              className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
              src={item.image}
              alt={item.name || "fridge"}
            />
            <div className="p-3 text-gray-900 font-semibold">{item.name}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Fridges;
