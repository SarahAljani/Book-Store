import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "@mui/joy/Button";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import "../assests/BookPage.css";
import { useDispatch } from "react-redux";
import { addBook } from "../redux/actions/actions";
import { books } from "../assests/data";
import { useMediaQuery } from "@mantine/hooks";
// import { useMediaQuery } from "@mantine/hooks";

const BookPage = () => {
  const isSmallScreen = useMediaQuery("(max-width: 700px)");
  const { id } = useParams(); // Get the book index from the URL params
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Safely retrieve the book using the index
  const book = books.find((b) => b.id == id);

  if (!book) {
    // If no book is found, navigate back to a safe page
    navigate("/");
    return null;
  }

  const handleAddToCart = () => {
    dispatch(addBook(book));
  };

  return (
    <div
      className="book-page-container"
      style={{
        width: "100%",
        display: "flex",
        flexWrap: isSmallScreen ? "wrap" : "nowarp",
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
            startDecorator={<ShoppingCartOutlinedIcon />}
            onClick={handleAddToCart}
            sx={{ marginTop: "10px" }}
          >
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookPage;
