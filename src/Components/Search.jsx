import { useState, useEffect } from "react";
import "../assests/Search.css";
import { Container } from "@mui/material";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

const Search = ({ books, setFilteredBooks }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const filteredBooks = books.filter((book) => {
      const title = book.title.toLowerCase();
      const author = book.author.toLowerCase();
      const description = book.description.toLowerCase();
      const searchTermLower = searchTerm.toLowerCase();

      return (
        title.includes(searchTermLower) ||
        author.includes(searchTermLower) ||
        description.includes(searchTermLower)
      );
    });
    setFilteredBooks(filteredBooks);
  }, [searchTerm, books]);

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
