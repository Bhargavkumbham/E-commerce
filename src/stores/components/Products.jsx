import React from "react";
import { computerData } from "../data/computers";
import { mobileData } from "../data/mobiles";
import { acData } from "../data/ac";
import { fridgeData } from "../data/fridge";
import { booksData } from "../data/books";

const categories = [
  { title: "Computers", data: computerData },
  { title: "Mobiles", data: mobileData },
  { title: "Air Conditioners", data: acData },
  { title: "Fridges", data: fridgeData },
  { title: "Books", data: booksData },
];

const Products = () => {
  return (
    <div className="bg-gray-100 min-h-screen px-6 py-12 max-w-screen-xl mx-auto">
      <section className="relative rounded-2xl overflow-hidden shadow-2xl mb-14">
        <img
          src="/assets/banner.jpeg"
          alt="Hero Banner"
          className="w-full h-72 md:h-96 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
        <div className="absolute bottom-16 left-8">
          <h1 className="text-white text-4xl md:text-5xl font-extrabold drop-shadow-lg max-w-2xl text-left">
            Discover . Shop Smart . Save
          </h1>
          <p className="mt-3 text-white text-lg md:text-xl max-w-md drop-shadow-md">
            Explore top-quality products and unbeatable offers across categories.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {categories.map(({ title, data }) => {
          const isBook = title === "Books";
          return (
            <a
              key={title}
              href={`/${title.toLowerCase().replace(/\s+/g, "")}`}
              className="relative group rounded-xl overflow-hidden shadow-md border border-gray-300 cursor-pointer flex items-center max-w-xs mx-auto"
              style={{ aspectRatio: "1 / 1", height: "176px" }}
            >
              <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                <img
                  src={data[0]?.image}
                  alt={title}
                  className={
                    isBook
                      ? "object-contain max-h-[70%] max-w-[60%] drop-shadow-md transition duration-700"
                      : "object-cover w-full h-full transition duration-700"
                  }
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-center items-center p-3">
                <h2 className="text-white text-lg font-bold text-center drop-shadow mb-1">
                  {title}
                </h2>
                <button className="bg-white text-gray-900 rounded-full px-3 py-1 text-sm font-semibold shadow hover:bg-gray-100 transition opacity-0 group-hover:opacity-100">
                  Explore
                </button>
              </div>
            </a>
          );
        })}
      </section>
    </div>
  );
};

export default Products;
