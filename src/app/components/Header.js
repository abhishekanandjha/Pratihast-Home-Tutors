import React from "react";
import "./Header.css"; // Import the CSS file for styles

function Header(props) {
  return (
    <header>
      <div className="header-content">
        <a href="/signup" style={{ textDecoration: "none" }}>
          <div className="brand">Pratihast Home Tutors</div>
        </a>
        <nav>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/blog">Blog</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </nav>
        
      </div>
    </header>
  );
}

export default Header;
