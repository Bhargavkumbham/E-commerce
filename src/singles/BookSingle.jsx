import React, { useState } from 'react';
import { booksData } from '../stores/data/books';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '../stores/components/Navbar';
import { useCart } from '../stores/context/CartContext';

const BookSingle = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const product = booksData.find(item => item.id === id || item.id === Number(id));
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);

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
    addToCart({ ...product, quantity });
    setAdded(true);
    setTimeout(() => setAdded(false), 1000);
  };

  const handleQuantityChange = (e) => {
    const val = parseInt(e.target.value);
    if (val > 0) setQuantity(val);
  };

  return (
    <>
      <Navbar />
      <nav className="max-w-4xl mx-auto px-4 py-2 text-sm text-gray-600">
        <Link to="/" className="underline hover:text-gray-900">Home</Link> &gt;{' '}
        <Link to="/books" className="underline hover:text-gray-900">Books</Link> &gt;{' '}
        {product.title}
      </nav>
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

          <label htmlFor="quantity" className="mb-2 font-semibold">Quantity</label>
          <input
            id="quantity"
            type="number"
            min="1"
            value={quantity}
            onChange={handleQuantityChange}
            className="w-20 px-3 py-2 border border-gray-300 rounded-md mb-6 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />

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

export default BookSingle;
