import React from 'react';
import { acData } from '../data/ac';

const Ac = () => {
  const firstFiveImages = acData.slice(0, 5);

  return (
    <>
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Air Conditioner</h2>
      </div>
      <div className="flex flex-wrap justify-center gap-6 px-4 md:px-0">
        {firstFiveImages.map((item, idx) => (
          <div
            key={idx}
            className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col items-center border border-slate-200 hover:shadow-xl transition-shadow duration-300 w-64"
          >
            <img
              className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
              src={item.image}
              alt="AC"
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Ac;
