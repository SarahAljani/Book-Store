import React, { useState } from "react";
import { Nav, NavDropdown, Navbar, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";

import logo from "../assests/logo.png";
import "../assests/header.css";
import { Link, NavLink } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";
const Header = () => {
  const [dropdownActive, setDropdownActive] = useState(false);
  const location = useLocation();
  const isSmallScreen = useMediaQuery("(max-width: 900px)");
  // Check if any of the dropdown items are ac
  const isDropdownItemActive =
    location.pathname === "russian-books" ||
    location.pathname === "victorian-books" ||
    location.pathname === "kids-books";

  return (
    <header style={{ alignItems: isSmallScreen ? "start" : "center" }}>
      <img
        src={logo}
        alt="logo"
        style={{ width: isSmallScreen ? "80px" : "100px" }}
      />

      <Navbar expand="lg" className="">
        <Container
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to=""  >
                Home
              </Nav.Link>
              <NavDropdown
                  title="Library"
                id="basic-nav-dropdown"
                className={
                  dropdownActive || isDropdownItemActive ? "active" : ""
                }
                onClick={() => setDropdownActive(true)}
              >
                <NavDropdown.Item as={NavLink} to={`library`}>
                  All The Library
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to={`/category/Russian Novels`}>
                  Russian Novels
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={NavLink}
                  to={`/category/Victorian Novels`}
                >
                  Victorian Novels
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to={`/category/Kids Books`}>
                  Kids Books
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to={`/category/Series Novels`}>
                  Series Novels
                </NavDropdown.Item>
                <NavDropdown.Divider />
              </NavDropdown>
              <Nav.Link as={NavLink} to="history" activeClassName="active"  >
                History
              </Nav.Link>
              <Nav.Link as={NavLink} to="contact-us" activeClassName="active" >
                Contact Us
              </Nav.Link>
              <Nav.Link as={NavLink} to="cart" activeClassName="active">
                <FontAwesomeIcon
                  icon={faCartShopping}
                  style={{ color: "#d64000" }}
                />
              </Nav.Link>
              <Nav.Link as={NavLink} to="contact-us" activeClassName="active">
                <FontAwesomeIcon
                  icon={faRightToBracket}
                  style={{ color: "#d64000" }}
                />
              </Nav.Link>
              {/* <Nav.Link href="#sign-up">Sign Up</Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
