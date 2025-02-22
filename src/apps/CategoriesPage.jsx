import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../index.css";
import "../assests/BookCard.css";
import Button from "@mui/joy/Button";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { categories } from "../assests/categories";
import Search from "../Components/Search";
import { addBook, deleteBook } from "../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { toggleAddedInv } from "../redux/reducers/booksSlice";
import { useMediaQuery } from "@mantine/hooks";

const CategoriesPage = () => {
  const { categoryTitle } = useParams();
  const navigate = useNavigate();
  const books = useSelector((state) => state.books || []);
  console.log(books[1].title);
  const [filteredBooks, setFilteredBooks] = useState([]);
  useEffect(() => {
    if (!books || books.length === 0) return;
    setFilteredBooks(books.filter((book) => book.category === categoryTitle));
  }, [books, categoryTitle]);

  // const [filteredBooks, setFilteredBooks] = useState([]);
  const dispatch = useDispatch();
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
      console.log("book removed to cart");
      const title = book.title;
      enqueueSnackbar(`${title} Book removed from cart!`, { variant: "error" });
      setFilteredBooks([...filteredBooks]);
    }
    dispatch(toggleAddedInv(book.id));
    console.log("book.added reversed");
  };
  // const handleSeeMore = (index) => {
  //   navigate(`/book/category/${index}`); // Pass the index in the URL
  // };
  const handleSeeMore = (book) => {
    // Navigate to the book details page
    navigate(`/book/${book.id}`, { state: { book } });
  };
  const isSmallScreen = useMediaQuery("(max-width: 600px)");
  return (
    <div className="main__container">
      <div className="searchhh" style={{}}>
        <div className={"route__domain"}>{`Library / ${categoryTitle}`}</div>
        <Search
          setFilteredBooks={setFilteredBooks}
          categoryTitle={categoryTitle}
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
                      sx={{ marginTop: "10px" }} // Ensure spacing between buttons
                    >
                      {book.added ? "remove from cart" : "add to cart"}
                    </Button>
                    <Button onClick={() => handleSeeMore(book)}>
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
    </div>
  );
};

export default CategoriesPage;
