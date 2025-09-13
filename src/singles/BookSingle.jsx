import React from 'react';
import { booksData } from '../stores/data/books';
import { useParams } from 'react-router-dom';
import Navbar from '../stores/components/Navbar';
import { useCart } from '../stores/context/CartContext';

const BookSingle = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = booksData.find(item => item.id === id || item.id === Number(id));

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
        <div className="md:w-1/2 flex justify-center items-center bg-white rounded-md p-4">
          <img
            src={product.image.startsWith('http') ? product.image : `/${product.image}`}
            alt={product.title}
            className="max-w-full max-h-96 object-contain rounded-md"
          />
        </div>
        <div className="md:w-1/2 flex flex-col justify-center text-gray-900">
          <h2 className="text-3xl font-extrabold mb-3 text-black">{product.title}</h2>
          <h3 className="text-xl font-semibold mb-2 text-gray-800">by {product.author}</h3>
          <p className="font-bold text-2xl mb-6 text-gray-900">${product.price}</p>
          <p className="text-gray-700 mb-6">{product.description}</p>
          <button
            onClick={() => addToCart(product)}
            className="w-fit bg-gray-800 hover:bg-gray-900 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-colors duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default BookSingle;
