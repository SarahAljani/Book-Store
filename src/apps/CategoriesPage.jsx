import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { books } from "../assests/data";
import "../index.css";
import "../assests/BookCard.css";
import Button from "@mui/joy/Button";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { categories } from "../assests/categories";
import Search from "../Components/Search";
import { addBook } from "../redux/actions/actions";
import { useDispatch } from "react-redux";

const CategoriesPage = () => {
  const { categoryTitle } = useParams();
  const navigate = useNavigate();
  const category = categories.find((c) => c.title === categoryTitle);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const dispatch = useDispatch();

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
  // const handleSeeMore = (index) => {
  //   navigate(`/book/category/${index}`); // Pass the index in the URL
  // };
  const handleSeeMore = (id) => {
    // Navigate to the book details page
    window.location.href = `/book/${id}`;
  };

  useEffect(() => {
    if (category) {
      const filtered = books.filter((book) => book.category === category.title);
      setFilteredBooks(filtered);
    } else {
      setFilteredBooks([]);
    }
  }, [categoryTitle, category]);

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
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book, i) => (
              <article
                key={i}
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
                    }}
                  >
                    {book.title}
                  </h2>
                  <div className="data sub-titles">{book.author}</div>
                  <div className="data sub-titles">{book.pages}</div>
                  <div
                    className="card-buttons"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      rowGap: "7px",
                    }}
                  >
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
                    <Button onClick={() => handleSeeMore(book.id)}>
                      See More
                    </Button>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <p>No books found in this category.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default CategoriesPage;
