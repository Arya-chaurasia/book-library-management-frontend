import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
      <Link to="/" className="text-white text-2xl font-bold">
          Book Library
        </Link>
        <div className="header-actions">
          <Link 
            to="/add-book" 
            className="bg-white text-blue-600 font-semibold py-2 px-4 rounded shadow hover:bg-gray-100 transition duration-200"
          >
            Add Book
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
