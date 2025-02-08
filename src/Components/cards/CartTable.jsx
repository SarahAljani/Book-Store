import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/joy/Button";
import ButtonGroup from "@mui/joy/ButtonGroup";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  incrementBookQuantity,
  decrementBookQuantity,
  deleteBook,
} from "../../redux/actions/actions";
import { Input } from "@mui/joy";
import "../../assests/BookPage.css";
const CartTable = () => {
  const books = useSelector((state) => state.cart.books);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleIncrease = (index) => {
    const book = books[index];
    if (book.number < book.quantity) {
      dispatch(incrementBookQuantity(index));
    }
  };

  const handleDecrease = (index) => {
    const book = books[index];
    if (book.number > 1) {
      dispatch(decrementBookQuantity(index));
    }
  };

  const handleDelete = (index) => {
    dispatch(deleteBook(index));
  };

  const handleInputChange = (book, index, value) => {
    // Validate input as a number greater than or equal to 1
    let newValue = Math.max(1, parseInt(value) || 1);
    newValue = Math.min(newValue, book.quantity);
    dispatch({
      type: "UPDATE_BOOK_QUANTITY",
      payload: { index, number: newValue },
    });
  };

  return (
    <div style={{ width: "100%" }}>
      <TableContainer>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="left"></TableCell>
              <TableCell
                align="center"
                sx={{
                  fontFamily: "notosans",
                  fontWeight: "600",
                  fontSize: "20px",
                }}
              >
                Author
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontFamily: "notosans",
                  fontWeight: "600",
                  fontSize: "20px",
                }}
              >
                Pages
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontFamily: "notosans",
                  fontWeight: "600",
                  fontSize: "20px",
                }}
              >
                Number
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontFamily: "notosans",
                  fontWeight: "600",
                  fontSize: "20px",
                }}
              >
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book, i) => (
              <TableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell scope="row" align="right">
                  <img
                    src={book.image}
                    style={{
                      width: "80px",
                      height: "120px",
                      borderRadius: "10px",
                    }}
                    alt={book.title}
                  />
                </TableCell>
                <TableCell align="center">{book.author}</TableCell>
                <TableCell align="center">{book.pages}</TableCell>
                <TableCell align="center">
                  <ButtonGroup
                    variant="plain"
                    aria-label="plain button group"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Button onClick={() => handleIncrease(i)}>
                      <AddIcon />
                    </Button>
                    <Input
                      type="text"
                      value={book.number}
                      onChange={(e) =>
                        handleInputChange(book, i, e.target.value)
                      }
                      style={{
                        padding: "0",
                        width: "30px",
                        textAlign: "center !important",
                        borderRadius: "4px", // Optional for rounded corners
                        "--Input-focusedHighlight": "#e63002",
                      }}
                    />
                    <Button onClick={() => handleDecrease(i)}>
                      <RemoveIcon />
                    </Button>
                  </ButtonGroup>
                </TableCell>
                <TableCell align="center">
                  <DeleteForeverIcon
                    sx={{ color: "#e63002", cursor: "pointer" }}
                    onClick={() => handleDelete(i)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CartTable;
