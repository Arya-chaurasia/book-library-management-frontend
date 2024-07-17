import React, { useState } from 'react';
import axiosInstance from '../config/config';

const AddBook = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    year: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const { title, author, genre, year } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance().post('/books', formData);
      //console.log('Book', response.data);
      setSuccessMessage('Book added successfully!');
      setFormData({ title: '', author: '', genre: '', year: '' });
    } catch (error) {
      console.error('Error adding book:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="w-full max-w-md p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Book</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="title">Title</label>
          <input 
            type="text" 
            name="title" 
            value={title} 
            onChange={handleChange} 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            required 
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="author">Author</label>
          <input 
            type="text" 
            name="author" 
            value={author} 
            onChange={handleChange} 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            required 
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="genre">Genre</label>
          <input 
            type="text" 
            name="genre" 
            value={genre} 
            onChange={handleChange} 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            required 
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="year">Year</label>
          <input 
            type="number" 
            name="year" 
            value={year} 
            onChange={handleChange} 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            required 
          />
        </div>
        <div className="flex items-center justify-between">
          <button 
            type="submit" 
            disabled={loading} 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {loading ? 'Adding...' : 'Add Book'}
          </button>
          {successMessage && <div className="text-green-500 text-sm mt-2">{successMessage}</div>}
            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        </div>
      </form>
    </div>
  </div>
  );
};

export default AddBook;
