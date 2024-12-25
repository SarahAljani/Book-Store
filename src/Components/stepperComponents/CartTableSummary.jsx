import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useSelector } from "react-redux";

const CartTableSummary = () => {
  const userData = useSelector((state) => state.users.userInfos);
  const books = userData.cart;

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
                Return Date
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
                  <TableCell align="center">{book.number}</TableCell>
                  <TableCell align="center">
                    {book.returnDate
                      ? book.returnDate.format("YYYY-MM-DD")
                      : "No return date"}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CartTableSummary;
