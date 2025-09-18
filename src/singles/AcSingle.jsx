import React, { useState } from 'react';
import { acData } from '../stores/data/ac';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '../stores/components/Navbar';
import { useCart } from '../stores/context/CartContext';

const AcSingle = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const product = acData.find(item => item.id === id || item.id === Number(id));
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8 text-gray-900 text-center text-xl font-medium">
          Product not found.
          <div className="mt-4">
            <button
              onClick={() => navigate(-1)}
              className="text-gray-600 underline"
              aria-label="Go back to previous page"
            >
              Go Back
            </button>
          </div>
        </div>
      </>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <>
      <style>{`
        /* Hide number input spinners - not needed anymore, but left if reused */
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type=number] {
          -moz-appearance: textfield;
        }
      `}</style>

      <Navbar />
      <nav className="max-w-4xl mx-auto px-4 py-2 text-sm text-gray-600">
        <Link to="/" className="underline hover:text-gray-900">Home</Link> &gt;{' '}
        <Link to="/ac" className="underline hover:text-gray-900">Air Conditioners</Link> &gt;{' '}
        {product.model}
      </nav>
      <div className="max-w-4xl mx-auto px-4 py-8 bg-white rounded-xl shadow-lg flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2 flex justify-center items-center bg-white rounded-md p-4 shadow-sm">
          <img
            src={product.image}
            alt={`${product.brand} ${product.model}`}
            className="max-w-full max-h-96 object-contain rounded-md"
          />
        </div>
        <div className="md:w-1/2 flex flex-col justify-center text-gray-900">
          <h2 className="text-3xl font-extrabold mb-3 text-black">{product.company}</h2>
          <h3 className="text-xl font-semibold mb-2 text-gray-800">{product.model}</h3>
          <p className="font-bold text-2xl mb-6 text-gray-900">${product.price}</p>
          <p className="text-gray-700 mb-4">{product.description}</p>

          <button
            onClick={handleAddToCart}
            className={`w-fit bg-gray-800 hover:bg-gray-900 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-colors duration-300 disabled:opacity-50`}
            disabled={added}
            aria-pressed={added}
          >
            {added ? 'Added to Cart' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </>
  );
};

export default AcSingle;
