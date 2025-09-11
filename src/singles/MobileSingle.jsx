import React from 'react';
import { mobileData } from '../stores/data/mobiles';
import { useParams } from 'react-router-dom';
import Navbar from '../stores/components/Navbar';
import { useCart } from '../stores/context/CartContext';

const MobileSingle = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = mobileData.find((item) => item.id === id || item.id === Number(id));

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8 text-gray-900 text-center text-xl font-medium">
          Product not found.
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8 bg-white rounded-xl shadow-lg flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2 flex justify-center items-center">
          <img
            src={product.image}
            alt={product.name}
            className="max-w-full max-h-96 object-contain rounded-md"
          />
        </div>
        <div className="md:w-1/2 flex flex-col justify-center text-gray-900">
          <h1 className="text-4xl font-extrabold mb-4">{product.name}</h1>
          <p className="text-gray-700 text-base leading-relaxed mb-6">{product.description}</p>
          <button
            onClick={() => addToCart(product)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-colors duration-300 w-fit"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default MobileSingle;
