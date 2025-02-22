import { useState, useEffect } from "react";
import "../assests/Search.css";
import { Container } from "@mui/material";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { categories } from "../assests/categories";
import { useMediaQuery } from "@mantine/hooks";
const Search = ({ setFilteredBooks, categoryTitle, filteredBooks }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const category = categories.find((c) => c.title === categoryTitle);
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  const books = useSelector((state) => state.books || []);
  const [filtered, setFiltered] = useState(books);
  useEffect(() => {
    if (categoryTitle) {
      if (!books || books.length === 0) return;
      setFiltered(books.filter((book) => book.category === categoryTitle));
    }
  }, [books, categoryTitle]);
  useEffect(() => {
    setFilteredBooks(
      filtered.filter((book) => {
        const title = book.title.toLowerCase();
        const author = book.author.toLowerCase();
        const description = book.description.toLowerCase();
        const searchTermLower = searchTerm.toLowerCase();

        return (
          title.includes(searchTermLower) ||
          author.includes(searchTermLower) ||
          description.includes(searchTermLower)
        );
      })
    );
  }, [
    categoryTitle,
    category,
    books,
    setFilteredBooks,
    searchTerm,
    filtered,
    setFiltered,
  ]);
  const isSmallScreen = useMediaQuery("(max-width: 600px)");
  return (
    <StyledTextField
      variant="outlined"
      placeholder="Search for specific books"
      value={searchTerm}
      onChange={handleSearch}
      className="search"
      InputProps={{
        sx: {
          color: "#bb2701", // Text color
          width: isSmallScreen ? "100% !important" : "40% !important",
        },
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "gray", // Default border color
          },
          "&:hover fieldset": {
            borderColor: "#bb2701", // Border color on hover
          },
          "&.Mui-focused fieldset": {
            borderColor: "#bb2701", // Border color on focus
          },
        },
        "& .MuiInputBase-input::placeholder": {
          color: "gray", // Placeholder color
          opacity: 1,
        },
        fontFamily: "'Noto Sans', sans-serif",
      }}
    />
  );
};

const StyledTextField = styled(TextField)({
  fontFamily: "'Noto Sans', sans-serif", // Font family
});

export default Search;
