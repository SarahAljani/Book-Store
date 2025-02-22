import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Button from "@mui/joy/Button";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import "../assests/BookPage.css";
import { useDispatch } from "react-redux";
import { addBook, deleteBook } from "../redux/actions/actions";
import { books } from "../assests/data";
import { useMediaQuery } from "@mantine/hooks";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { SnackbarProvider, useSnackbar } from "notistack";
import { toggleAddedInv } from "../redux/reducers/booksSlice";

const BookPage = () => {
  const isSmallScreen = useMediaQuery("(max-width: 700px)");
  const { id } = useParams(); // Get the book index from the URL params
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();
  const book = location.state?.book;
  // Safely retrieve the book using the index
  const [bookAdded, setBookAdded] = useState(book.added);
  useEffect(() => {
    setBookAdded(book.added);
  }, [book.added]);
  if (!book) {
    // If no book is found, navigate back to a safe page
    navigate("/");
    return null;
  }

  const handleAdd = () => {
    if (!bookAdded) {
      dispatch(addBook(book));
      enqueueSnackbar(`${book.title} added to cart!`, { variant: "success" });
    } else {
      dispatch(deleteBook(book.id));
      enqueueSnackbar(`${book.title} removed from cart!`, { variant: "error" });
    }

    dispatch(toggleAddedInv(book.id)); // Update Redux state
    setBookAdded((prev) => !prev); // Toggle local state
  };

  return (
    <div
      className="book-page-container"
      style={{
        width: "100%",
        marginTop: "27px",
        display: "flex",
        flexWrap: isSmallScreen ? "wrap" : "nowrap",
        justifyContent: "center",
        alignItems: "start",
      }}
    >
      <div className="book-page-image">
        <img
          src={book?.image}
          alt={book?.title}
          style={{ width: isSmallScreen ? "230px" : "500px" }}
        />
      </div>
      <div
        className="book-page-details"
        style={{ marginLeft: isSmallScreen ? "0" : "40px" }}
      >
        <h1 className="book-title">{book?.title}</h1>
        <h2 className="book-author">{book?.author}</h2>
        <div className="book-pages">{book?.pages}</div>
        <div
          className="book-description"
          style={{
            color: "black",
            display: "block",
            visibility: "visible",
            zIndex: 10,
            opacity: 1,
          }}
        >
          {book?.description}
        </div>

        <div className="book-page-actions">
          <Button
            startDecorator={
              bookAdded ? (
                <CheckCircleOutlineOutlinedIcon />
              ) : (
                <ShoppingCartOutlinedIcon />
              )
            }
            onClick={() => handleAdd()} // Pass a reference to the function
            sx={{ marginTop: "10px" }}
          >
            {bookAdded ? "Remove from cart" : "Add to cart"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookPage;
