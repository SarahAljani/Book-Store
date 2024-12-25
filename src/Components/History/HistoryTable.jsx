import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ButtonGroup from "@mui/joy/ButtonGroup";
import { useDispatch, useSelector } from "react-redux";
const HistoryTable = () => {
  const matchingUser = useSelector((state) => state.users.currentUser);
  return (
    <div style={{ width: "80%", margin: "0 auto" }}>
      <TableContainer>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                sx={{
                  fontFamily: "notosans",
                  fontWeight: "600",
                  fontSize: "20px",
                }}
              >
                First Name
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontFamily: "notosans",
                  fontWeight: "600",
                  fontSize: "20px",
                }}
              >
                Last Name
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontFamily: "notosans",
                  fontWeight: "600",
                  fontSize: "20px",
                }}
              >
                Image
              </TableCell>
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
            </TableRow>
          </TableHead>
          <TableBody>
            {matchingUser &&
              matchingUser.cart.map((item, i) => (
                <TableRow
                  key={i}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center" style={{ fontSize: "17px" }}>
                    {matchingUser.firstName}
                  </TableCell>
                  <TableCell align="center" style={{ fontSize: "17px" }}>
                    {matchingUser.lastName}
                  </TableCell>
                  <TableCell
                    scope="row"
                    align="center"
                    style={{ fontSize: "17px" }}
                  >
                    <img
                      src={item.image}
                      style={{
                        width: "80px",
                        height: "120px",
                        borderRadius: "10px",
                      }}
                      alt={item.title}
                    />
                  </TableCell>
                  <TableCell style={{ fontSize: "17px" }} align="center">
                    {item.author}
                  </TableCell>
                  <TableCell style={{ fontSize: "17px" }} align="center">
                    {item.pages}
                  </TableCell>
                  <TableCell style={{ fontSize: "17px" }} align="center">
                    {item.number}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default HistoryTable;
