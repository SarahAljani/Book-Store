import React from "react";
import "../index.css";
import "../assests/Footer.css"; // Import the Footer CSS file
import logo from "../assests/logo.png";
import { NavLink } from "react-router-dom"; // Import NavLink directly
import { categories } from "../assests/categories";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  const styling = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "start",
  };
  return (
    <footer className="footer">
      <div className="divider"></div>
      <div className="footer-content">
        {/* Logo Block */}
        <div className="block">
          <img src={logo} alt="Logo" className="logo" />
        </div>

        {/* Pages Navigation Block */}
        <div className="block nav-column">
          <h3 className="column-title">Pages</h3>
          <nav style={styling}>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Home
            </NavLink>
            <NavLink
              to="/library"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Library
            </NavLink>
            <NavLink
              to="/history"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              History
            </NavLink>
            <NavLink
              to="/contact-us"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Contact Us
            </NavLink>
          </nav>
        </div>

        {/* Categories Navigation Block */}
        <div className="block nav-column">
          <h3 className="column-title">Categories</h3>
          <nav style={styling}>
            {categories.map((category, index) => (
              <NavLink
                key={category.title}
                to={`/category/${category.title}`}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {category.title}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Social Media Block */}
        <div className="block social-column">
          <h3 className="column-title">Follow Us</h3>
          <div className="social-icons">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="icon"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="icon"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="icon"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="icon"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>
      <div className="divider"></div>
      <div className="copyright">
        © {new Date().getFullYear()} Bla Bla Bla. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
