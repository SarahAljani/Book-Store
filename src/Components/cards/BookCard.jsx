import React, { useEffect, useState } from "react";
import Button from "@mui/joy/Button";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import "../../index.css";
import { useDispatch, useSelector } from "react-redux";
import { addBook, deleteBook } from "../../redux/actions/actions";
import Search from "../Search";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import EmptyBook from "../../Components/Lotties/EmptyBook.json";
import Lottie from "react-lottie";
import { useSnackbar } from "notistack";
import { toggleAddedInv } from "../../redux/reducers/booksSlice";
const BookCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate
  // Now accessing books inside an object

  const booksInStore = useSelector((state) => state.books); // Get the updated books from the Redux store
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: EmptyBook,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const { enqueueSnackbar } = useSnackbar();
  const books = useSelector((state) => state.books || []);
  const [filteredBooks, setFilteredBooks] = useState([]);
  useEffect(() => {
    if (!books || books.length === 0) return;
    setFilteredBooks(books);
  }, [books]);
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
      console.log("book removed to cart");
      const title = book.title;
      enqueueSnackbar(`${title} Book removed from cart!`, { variant: "error" });
      setFilteredBooks([...filteredBooks]);
    }
    dispatch(toggleAddedInv(book.id));
    console.log("book.added reversed");
  };

  const handleSeeMore = (book) => {
    // Navigate to the book details page
    navigate(`/book/${book.id}`, { state: { book } });
  };

  return (
    <>
      <div className="searchh" style={{ width: "100%" }}>
        <Search setFilteredBooks={setFilteredBooks} />
      </div>
      <div className="container">
        <div className="card__container">
          {filteredBooks && filteredBooks.length > 0 ? (
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
                    {book.added ? "remove from cart" : "add to cart"}
                  </Button>
                  <Button
                    onClick={() => handleSeeMore(book)}
                    sx={{ marginTop: "5px" }} // Styling to match the Add to Cart button
                  >
                    See More
                  </Button>
                </div>
              </article>
            ))
          ) : (
            <div
              style={{
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "20px",
                fontSize: "18px",
                fontWeight: "700",
                color: "#555",
                paddingBottom: "130px",
              }}
            >
              <Lottie
                options={defaultOptions}
                height={300}
                width={300}
                style={{
                  marginBottom: "-85px",
                  marginTop: "-130px",
                  pointerEvents: "none",
                }}
              />
              No books found. Try adjusting your search!
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BookCard;
