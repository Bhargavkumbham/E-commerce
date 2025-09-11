import React from 'react';
import { acData } from '../stores/data/ac';
import { useParams } from 'react-router-dom';
import Navbar from '../stores/components/Navbar';
import { useCart } from '../stores/context/CartContext';

const AcSingle = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = acData.find(item => item.id === id || item.id === Number(id));

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
            src={product.image.startsWith('http') ? product.image : `/${product.image}`}
            alt={`${product.company} ${product.model}`}
            className="max-w-full max-h-96 object-contain rounded-md"
          />
        </div>
        <div className="md:w-1/2 flex flex-col justify-center text-gray-900">
          <h2 className="text-3xl font-extrabold mb-3">{product.company}</h2>
          <h3 className="text-xl font-semibold mb-2">{product.model}</h3>
          <p className="text-blue-600 font-bold text-2xl mb-6">${product.price}</p>
          <p className="text-gray-700 mb-6">{product.description}</p>
          <button
            onClick={() => addToCart(product)}
            className="w-fit bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-colors duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default AcSingle;
