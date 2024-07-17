import React, { useState, useEffect, useCallback } from "react";
import axiosInstance from "../config/config";
import EditBookForm from "./EditBookForm";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setBooks } from "../Redux/bookSlice";

const BookList = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editBook, setEditBook] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const books = useSelector((state) => state.book.items);

  const fetchBooks = useCallback(async () => {
    try {
      const response = await axiosInstance().get("/books");
      dispatch(setBooks(response?.data?.data || []));
      //console.log(response, "response")
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }, [dispatch]);

  const deleteBook = async (id) => {
    try {
      await axiosInstance().delete(`/books/${id}`);
      alert("Book deleted successfully")
      fetchBooks();
    } catch (error) {
      console.error("Error deleting book:", error);
      setError("Error deleting book.");
    }
  };

  const handleEditBook = (book) => {
    setEditBook(book);
    setEditMode(true);
    navigate(`/edit-book/${book._id}`, { state: { book } });
  };

  const handleCloseEdit = () => {
    setEditMode(false);
    setEditBook(null);
  };

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Header />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold my-4">Book List</h2>
        <ul className="space-y-4">
          {books.map((book) => (
            <li
              key={book._id}
              className="flex items-center justify-between bg-white p-4 rounded shadow"
            >
              <div className="flex-1">
                <span className="font-semibold">{book.title}</span> -{" "}
                {book.author}
                <br />
                <span className="text-gray-600">Genre: {book.genre}</span>
                <br />
                <span className="text-gray-600">
                  Publication year: {book.year}
                </span>
              </div>
              <div className="space-x-2">
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                  onClick={() => handleEditBook(book)}
                >
                  Edit
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                  onClick={() => deleteBook(book._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

        {editMode && (
          <EditBookForm
            book={editBook}
            onClose={handleCloseEdit}
            fetchBooks={fetchBooks}
          />
        )}
      </div>
    </div>
  );
};

export default BookList;
