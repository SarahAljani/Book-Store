import React from "react";
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
import { useEffect, useState } from "react";
import {
  incrementBookQuantity,
  decrementBookQuantity,
  deleteBook,
} from "../../redux/actions/actions";
import ReturnModal from "../modals/ReturnModale";
import { update_user_infos } from "../../redux/actions/actions";

const CartTable = () => {
  const books = useSelector((state) => state.cart.books);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [calculatedReturnDay, setCalculatedReturnDay] = useState(null);

  const handleContinue = () => {
    navigate(`stepper`);
  };

  const user = useSelector((state) => state.users.userInfos);
  useEffect(() => {
    user.cart = books;
    dispatch(update_user_infos(user));
    console.log(user);
  }, [books]);
  const handleIncrease = (index) => {
    dispatch(incrementBookQuantity(index));
  };

  const handleDecrease = (index) => {
    dispatch(decrementBookQuantity(index));
  };

  const handleDelete = (index) => {
    dispatch(deleteBook(index));
  };

  return (
    <div style={{ width: "80%" }}>
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
            {books &&
              books.map((book, i) => (
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
                    >
                      <Button onClick={() => handleIncrease(i)}>
                        <AddIcon />
                      </Button>
                      <span
                        style={{
                          width: "35px",
                          textAlign: "center",
                          verticalAlign: "center",
                        }}
                      >
                        {book.number}
                      </span>
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
      <Button
        onClick={() => handleOpen()}
        sx={{
          width: "100px",
          bottom: "0",
        }}
      >
        Continue
      </Button>
      <ReturnModal
        handleContinue={handleContinue}
        open={open}
        handleClose={handleClose}
        books={books}
        calculatedReturnDay={calculatedReturnDay}
        setCalculatedReturnDay={setCalculatedReturnDay}
      />
    </div>
  );
};

export default CartTable;
