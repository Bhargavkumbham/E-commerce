import React from "react";
import { computerData } from "../data/computers";
import { mobileData } from "../data/mobiles";
import { acData } from "../data/ac";
import { fridgeData } from "../data/fridge";
import { booksData } from "../data/books";

const categories = [
  { title: "Computers", data: computerData },
  { title: "Mobiles", data: mobileData },
  { title: "Ac", data: acData },
  { title: "Fridges", data: fridgeData },
  { title: "Books", data: booksData },
];

const Products = () => {
  return (
    <div className="bg-gray-100 min-h-screen px-6 py-12 max-w-screen-xl mx-auto">
      <section className="relative rounded-2xl overflow-hidden shadow-2xl mb-14">
        <img
          src="/assets/herobanner.png"
          alt="Hero Banner"
          className="w-full h-72 md:h-96 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
        <div className="absolute bottom-16 left-8 max-w-3xl">
          <h1 className="text-white text-4xl md:text-5xl font-extrabold drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] leading-tight max-w-2xl">
            Discover. <span className="text-yellow-400">Shop Smart.</span> Save
          </h1>
          <p className="mt-4 text-white text-lg md:text-xl drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)] max-w-md tracking-wide">
            Explore top-quality products and unbeatable offers across categories.
          </p>
        </div>
      </section>

      <h2 className="text-2xl font-semibold mb-6 text-center">
        What are you shopping for today?
      </h2>

      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {categories.map(({ title, data }) => {
          const isBook = title === "Books";
          return (
            <div key={title} className="flex flex-col items-center max-w-xs mx-auto">
              <a
                href={`/${title.toLowerCase().replace(/\s+/g, "")}`}
                className="relative group rounded-xl overflow-hidden shadow-md border border-gray-300 cursor-pointer"
                style={{ aspectRatio: "1 / 1", height: "176px", width: "100%" }}
              >
                <div className="relative w-full h-full flex items-center justify-center bg-gray-50 overflow-hidden">
                  <img
                    src={data[0]?.image}
                    alt={title}
                    className={
                      isBook
                        ? "object-contain max-h-[70%] max-w-[60%] drop-shadow-md transition duration-700"
                        : "object-cover w-full h-full transition duration-700"
                    }
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-center items-center p-3">
                    <button className="bg-white text-gray-900 rounded-full px-3 py-1 text-sm font-semibold shadow hover:bg-gray-100 transition opacity-0 group-hover:opacity-100">
                      Explore
                    </button>
                  </div>
                </div>
              </a>
              <span className="mt-2 text-center text-gray-900 font-semibold select-none">
                {title}
              </span>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default Products;
