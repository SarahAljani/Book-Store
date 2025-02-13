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
import { useMediaQuery } from "@mui/material";
const CartTable = () => {
  const books = useSelector((state) => state.cart.books);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleIncrease = (book) => {
    console.log("handle inc");
    console.log(book.number);
    console.log(book.quantity);
    if (book.number < book.quantity) {
      dispatch(incrementBookQuantity(book.id));
      console.log("inc dispatched");
    }
  };
  const isScreenLarge = useMediaQuery("(min-width: 600px)");
  const handleDecrease = (book) => {
    console.log("handle dec");
    console.log(book.number);
    console.log(book.quantity);
    if (book.number > 1) {
      dispatch(decrementBookQuantity(book.id));
      console.log("dec dispatched");
    }
  };
  const handleDelete = (id) => {
    dispatch(deleteBook(id)); // Send book ID instead of index
  };

  const handleInputChange = (book, index, value) => {
    // Validate input as a number greater than or equal to 1
    let newValue = Math.max(1, parseInt(value) || 1);
    newValue = Math.min(newValue, book.quantity);
    dispatch({
      type: "UPDATE_BOOK_QUANTITY",
      payload: { id: book.id, number: newValue },
    });
  };

  return (
    <div style={{ width: "100%" }}>
      {isScreenLarge ? (
        <TableContainer style={{ width: "80%" }}>
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
                      <Button onClick={() => handleIncrease(book)}>
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
                      <Button onClick={() => handleDecrease(book)}>
                        <RemoveIcon />
                      </Button>
                    </ButtonGroup>
                  </TableCell>
                  <TableCell align="center">
                    <DeleteForeverIcon
                      sx={{ color: "#e63002", cursor: "pointer" }}
                      onClick={() => handleDelete(book.id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div className="mobile-card-container">
          {books.map((book, i) => (
            <div className="mobile-card">
              <img
                src={book.image}
                style={{
                  width: "70px",
                  height: "100px",
                  borderRadius: "10px",
                }}
                alt={book.title}
              />
              <div className="cart-card-details">
                <div className="card-header">
                  <h3 className="cart-card-title">{book.title}</h3>
                  <h4 className="cart-card-pages">
                    {book.pages}{" "}
                    <span style={{ fontSize: "11px", fontWeight: "600" }}>
                      pages
                    </span>
                  </h4>
                </div>
                <div className="card-middle">
                  <div className="card-author">{book.author}</div>
                </div>
                <div className="card-footer">
                  <ButtonGroup
                    variant="plain"
                    aria-label="plain button group"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      onClick={() => handleIncrease(book)}
                      sx={{
                        borderRadius: "50px",
                        backgroundColor: "#1e7ecc",
                        color: "white",
                        width: "25px",
                        minWidth: "15px",
                        padding: "0",
                        height: "25px",
                        minHeight: "20px",
                      }}
                    >
                      <AddIcon style={{ fontSize: "15px" }} />
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
                        border: "none", // Optional for rounded corners
                        borderRadius: "50px",
                        "--Input-focusedHighlight": "#e63002",
                      }}
                    />

                    <Button
                      onClick={() => handleDecrease(book)}
                      sx={{
                        borderRadius: "50px",
                        backgroundColor: "#1e7ecc",
                        color: "white",
                        width: "25px",
                        minWidth: "15px",
                        padding: "0",
                        height: "25px",
                        minHeight: "20px",
                      }}
                    >
                      <RemoveIcon style={{ fontSize: "15px" ,fontWeight:"800"}} />
                    </Button>
                  </ButtonGroup>
                  <DeleteForeverIcon
                    sx={{ color: "#e63002", cursor: "pointer" }}
                    onClick={() => handleDelete(book.id)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartTable;
