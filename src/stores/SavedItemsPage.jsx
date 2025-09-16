import React from 'react';
import { useCart } from './context/CartContext';
import Navbar from './components/Navbar';

const SavedItemsPage = () => {
  const { savedItems, moveToCart } = useCart();

  return (
    <>
      <Navbar />
      <div className="max-w-screen-lg mx-auto px-4 py-6">
        <h2 className="text-3xl font-bold text-gray-900 my-6 text-center">Saved for Later</h2>

        {savedItems.length === 0 ? (
          <p className="text-center text-gray-700 text-lg">No saved items</p>
        ) : (
          <div className="space-y-6">
            {savedItems.map(item => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center bg-white rounded-xl shadow-md border border-gray-300 p-4 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-40 h-40 flex-shrink-0 overflow-hidden rounded-lg bg-white p-2">
                  <img
                    src={item.image}
                    alt={`${item.company} ${item.model}`}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex flex-col justify-center flex-1 px-6 text-gray-900">
                  <h3 className="text-xl font-semibold text-gray-900">{item.company}</h3>
                  <p className="text-lg mt-1 text-gray-700">{item.model}</p>
                  <p className="font-bold mt-2 text-gray-900">${item.price}</p>
                </div>
                <div className="flex flex-col mt-4 sm:mt-0">
                  <button
                    onClick={() => moveToCart(item)}
                    className="bg-gray-700 hover:bg-gray-800 text-white font-semibold rounded-md px-4 py-2 transition"
                  >
                    Move to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SavedItemsPage;
