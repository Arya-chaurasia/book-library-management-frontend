import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";
import EditBookForm from "./components/EditBookForm";

function App() {
  return (
    <Router>
      <div>
          <Routes>
            <Route path="/" element={<BookList />} />
            <Route path="/add-book" element={<AddBook />} />
            <Route path="/edit-book/:id" element={<EditBookForm />} />
          </Routes>

      </div>
    </Router>
  );
}

export default App;
