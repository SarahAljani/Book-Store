import React, { useState } from "react";
import { books } from "../../assests/data";
import Button from "@mui/joy/Button";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import "../../index.css";
import { useDispatch, useSelector } from "react-redux";
import { addBook } from "../../redux/actions/actions";
import Search from "../Search";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const BookCard = () => {
  const [filteredBooks, setFilteredBooks] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate
  const booksInStore = useSelector((state) => state.books); // Get the updated books from the Redux store

  const handleAdd = (book) => {
    if (!book.added) {
      // Only dispatch if the book isn't already added
      dispatch(addBook(book)); // Dispatch the addBook action to the store
      book.added = true; // Update the local state
      setFilteredBooks([...filteredBooks]); // Trigger a re-render
    } else {
      dispatch(addBook(book)); // Dispatch the addBook action to the store
      book.added = false; // Update the local state
      setFilteredBooks([...filteredBooks]); // Trigger a re-render
    }
  };

  const handleSeeMore = (id) => {
    navigate(`/book/${id}`); // Pass the book data
    // , { state: { book } }
  };

  return (
    <>
      <div
        className="search"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Search books={books} setFilteredBooks={setFilteredBooks} />
      </div>
      <div className="container">
        <div className="card__container">
          {filteredBooks &&
            filteredBooks.map((book, i) => (
              <article
                key={i} // Added key to avoid unique key warning
                className="card__article"
                style={{ backgroundImage: `url(${book.image})` }}
              >
                <div className="card__data">
                  <h2
                    className="card__title titles"
                    style={{
                      fontSize: "18px",
                      fontWeight: "900",
                      color: "#ff5101",
                      marginBottom: "5px", // Reduced margin-bottom
                    }}
                  >
                    {book.title}
                  </h2>
                  <div className="data sub-titles">{book.author}</div>
                  <div className="data sub-titles">{book.pages}</div>
                  <Button
                    startDecorator={
                      book.added ? (
                        <CheckCircleOutlineOutlinedIcon />
                      ) : (
                        <ShoppingCartOutlinedIcon />
                      )
                    }
                    onClick={() => handleAdd(book)}
                    sx={{ marginTop: "10px" }} // Ensure spacing between buttons
                  >
                    add to cart
                  </Button>
                  <Button
                    onClick={() => handleSeeMore(book.id)}
                    sx={{ marginTop: "5px" }} // Styling to match the Add to Cart button
                  >
                    See More
                  </Button>
                </div>
              </article>
            ))}
        </div>
      </div>
    </>
  );
};

export default BookCard;
