import React from 'react';
import { useCart } from './context/CartContext';
import Navbar from './components/Navbar';

const UserCart = () => {
  const { cartItems, removeFromCart } = useCart();
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
          <>
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-center bg-white rounded-xl shadow-md border border-gray-200 p-4 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="w-40 h-40 flex-shrink-0 overflow-hidden rounded-lg">
                    <img
                      src={item.image}
                      alt={`${item.company} ${item.model}`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex flex-col justify-center flex-1 px-6 text-gray-900">
                    <h3 className="text-xl font-semibold">{item.company}</h3>
                    <p className="text-lg mt-1">{item.model}</p>
                    <p className="text-blue-600 font-bold mt-2">${item.price}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item)}
                    className="mt-4 sm:mt-0 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md px-4 py-2 transition"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-8 text-right text-2xl font-bold text-gray-900">
              Total: ${totalPrice.toFixed(2)}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default UserCart;
