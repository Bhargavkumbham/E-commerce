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
inside teminal:

git clone https://github.com/Bhargavkumbham/E-commerce.git

cd e-commerce-site

npm install

npm run dev

## Folder Structure

```
public/
  assets/               # Images, logo

src/
  singles/                # Single product pages
  stores/
    components/           # Navbar, ProductList, etc.
    context/              # Cart context
    data/                 # Product data files (mobileData.js, acData.js, etc.)
    pages/                # Category pages (filter, sort, etc.)
    LoginSignup.jsx       # Login and signup component
    SavedItemsPage.jsx    # Saved items component
    UserCart.jsx          # User cart component
  App.jsx                 # Main App component
  main.jsx                # Entry point


```

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