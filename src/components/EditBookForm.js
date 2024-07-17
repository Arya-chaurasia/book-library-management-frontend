import React, { useState, useEffect } from 'react';
import axiosInstance from '../config/config';
import { useLocation } from 'react-router-dom';
import Header from './Header';

const EditBookForm = ({ onClose, fetchBooks }) => {
//console.log(fetchBooks, "fetchBooksfetchBooks")
  const location = useLocation();
  const book = location.state?.book;
  // console.log(book, "book")
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    year: '',
  });

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title || '',
        author: book.author || '',
        genre: book.genre || '',
        year: book.year || '',
      });
    }
  }, [book]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance().put(`/books/${book._id}`, formData);
      alert("Book Updated")
      // onClose();
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  const handleCancel = () => {
    // onClose();
  };

  return (
    
    <div className="bg-gray-100 justify-center min-h-screen items-center">
    <Header />
    <div className="mt-8">
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white rounded shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="author">
            Author
          </label>
          <input
            id="author"
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="genre">
            Genre
          </label>
          <input
            id="genre"
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            required 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="year">
            Year
          </label>
          <input
            id="year"
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            required 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button 
            type="submit" 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update
          </button>
          <button 
            type="button" 
            onClick={handleCancel} 
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
  );
};

export default EditBookForm;
