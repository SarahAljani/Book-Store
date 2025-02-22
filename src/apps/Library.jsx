import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/joy/Button";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Search from "../Components/Search";
import { useDispatch, useSelector } from "react-redux";
import { addBook, deleteBook } from "../redux/actions/actions";
import "../index.css";
import "../assests/BookCard.css"; // Ensure this path is correct
import { useSnackbar } from "notistack";
import { toggleAddedInv } from "../redux/reducers/booksSlice";

const Library = () => {
  const [filteredBooks, setFilteredBooks] = useState([]);
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books || []);
  useEffect(() => {
    if (!books || books.length === 0) return;
    setFilteredBooks(books);
  }, [books]);
  const { enqueueSnackbar } = useSnackbar();
  const handleAdd = (book) => {
    if (!book.added) {
      dispatch(addBook(book));
      console.log("book.added to cart");
      const title = book.title;
      enqueueSnackbar(`${title} Book added to cart!`, {
        variant: "success",
      });
      setFilteredBooks([...filteredBooks]); // Trigger a re-render
    } else {
      dispatch(deleteBook(book.id));
      console.log("book removed from cart");
      const title = book.title;
      enqueueSnackbar(`${title} Book removed from cart!`, { variant: "error" });
      setFilteredBooks([...filteredBooks]);
    }
    dispatch(toggleAddedInv(book.id));
    console.log("book.added reversed");
  };
  const navigate = useNavigate();
  const handleSeeMore = (book) => {
    // Navigate to the book details page
    navigate(`/book/${book.id}`, { state: { book } });
  };

  return (
    <div className="main__container">
      <div
        className="searchhh"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div className={"route__domain"}>{`Library / all Books`}</div>
        <Search
          setFilteredBooks={setFilteredBooks}
          filteredBooks={filteredBooks}
        />
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
                    >
                      {book.added ? "Remove from cart" : "Add to cart"}
                    </Button>
                    <Button onClick={() => handleSeeMore(book)}>
                      See More
                    </Button>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <p>No books found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Library;
