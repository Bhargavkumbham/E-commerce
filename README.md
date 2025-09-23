# E-mart

E-mart is a modern React-based e-commerce platform for browsing products by category, sorting, and managing a shopping cart. The UI features a clean grey-and-white theme styled with Tailwind CSS. Product data and images use static local files for fast prototyping and learning.

## Features

Product Catalog:
Mobiles, Computers, Air Conditioners, Fridges, and Books.

Category Pages:
Responsive product grids, filtering by category, sort by price/date modified.

Cart Functionality:
Add, update quantity, and remove items from cart.

Static Data:
Product info and images stored in /src/data/ and public/assets/.

Branding:
Custom E-mart logo and tagline.

Tailwind CSS:
Responsive UI, grey-white theme.

## Getting Started

git clone (https://github.com/yourusername/e-mart.git)

cd e-mart

npm install

npm run dev

## Folder Structure

public/
  assets/        # Images, logo
src/
  singles/       # Single product pages 
  stores/
    components/    # Navbar, ProductList
    context/       # Cart context
    data/          # Product data files (mobileData.js, acData.js etc.)
    pages/         # Category pages(filter,sort,etc)
    LoginSignup.jsx
    SavedItemsPage.jsx
    UserCart.jsx
  App.jsx
  main.jsx

## Planned Improvements

User Authentication: Login/signup system

Mock API / Backend Integration: Replace static files with scalable API

Search Autocomplete: Enhance product search

## Tech Stack

React (Components, Hooks)

Tailwind CSS

React Router

Context API (Cart)

Static Data (JS files, public assets)