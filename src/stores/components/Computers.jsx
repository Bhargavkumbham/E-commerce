import React from 'react';
import { computerData } from '../data/computers';

const Computers = () => {
  const firstFiveImages = computerData.slice(0, 5);

  return (
    <>
      <h2 className="text-3xl font-bold text-slate-800 tracking-tight text-center">
        Computers
      </h2>
      <div className="flex flex-wrap justify-center gap-6 px-4">
        {firstFiveImages.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden w-64 flex flex-col items-center hover:shadow-lg transition-shadow duration-300"
          >
            <img
              className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
              src={item.image}
              alt="computer"
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Computers;
