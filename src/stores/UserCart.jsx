import React from 'react';
import { useCart } from './context/CartContext';
import Navbar from './components/Navbar';

const UserCart = () => {
  const { cartItems, removeFromCart, saveForLater } = useCart();

  const totalPrice = cartItems.reduce((sum, item) => {
    const priceNumber = parseFloat(item.price.toString().replace('$', '')) || 0;
    return sum + priceNumber;
  }, 0);

  return (
    <>
      <Navbar />
      <div className="max-w-screen-lg mx-auto px-4 py-6">

        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Your Cart</h2>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-700 text-lg">Your Cart is Empty</p>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center bg-white rounded-xl shadow-md border border-gray-200 p-4 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-40 h-40 flex-shrink-0 overflow-hidden rounded-lg bg-white p-2">
                  <img
                    src={item.image}
                    alt={`${item.company} ${item.model}`}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex flex-col justify-center flex-1 px-6 text-gray-900">
                  <h3 className="text-xl font-semibold text-black">{item.company}</h3>
                  <p className="text-lg mt-1 text-gray-800">{item.model}</p>
                  <p className="font-bold mt-2 text-gray-900">${item.price}</p>
                </div>
                <div className="flex flex-col space-y-2 mt-4 sm:mt-0">
                  <button
                    onClick={() => saveForLater(item)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-md px-4 py-2 transition"
                  >
                    Save for Later
                  </button>
                  <button
                    onClick={() => removeFromCart(item)}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md px-4 py-2 transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 text-right text-2xl font-bold text-gray-900">
          Total: ${totalPrice.toFixed(2)}
        </div>
      </div>
    </>
  );
};

export default UserCart;
