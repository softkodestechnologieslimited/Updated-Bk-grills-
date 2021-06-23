import React, { useRef } from "react";
import { Link } from "react-router-dom";

// import logo from "../../assets/img/logo.png";
import logo from "../../assets/img/new-logo.jpeg";

import "./header.styles.scss";

const Header = ({ active }) => {
  const navRef = useRef();

  const navToggle = () => {
    navRef.current.classList.toggle("open");
  };

  return (
    <div className="container nav-wrapper">
      <div className="nav-logo">
        <Link to="/">
          <img src={logo} alt="Bigk Grill" className="logo" />
        </Link>
      </div>

      <div className="hamburger" onClick={navToggle}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      <div className="nav-menu">
        <ul className="nav-list" ref={navRef}>
          {active === "home" ? (
            <li className="nav-list-item active">
              <Link to="/" className="btn">
                Home
              </Link>
            </li>
          ) : (
            <li className="nav-list-item">
              <Link to="/" className="btn">
                Home
              </Link>
            </li>
          )}
          {active === "menu" ? (
            <li className="nav-list-item active">
              <Link to="/menu" className="btn">
                Menu
              </Link>
            </li>
          ) : (
            <li className="nav-list-item">
              <Link to="/menu" className="btn">
                Menu
              </Link>
            </li>
          )}
          {active === "gallery" ? (
            <li className="nav-list-item active">
              <Link to="/gallery" className="btn">
                Gallery
              </Link>
            </li>
          ) : (
            <li className="nav-list-item">
              <Link to="/gallery" className="btn">
                Gallery
              </Link>
            </li>
          )}
          {active === "about" ? (
            <li className="nav-list-item active">
              <Link to="/about" className="btn">
                About Us
              </Link>
            </li>
          ) : (
            <li className="nav-list-item">
              <Link to="/about" className="btn">
                About Us
              </Link>
            </li>
          )}
          {active === "contact" ? (
            <li className="nav-list-item active">
              <Link to="/contact" className="btn">
                Contact
              </Link>
            </li>
          ) : (
            <li className="nav-list-item">
              <Link to="/contact" className="btn">
                Contact
              </Link>
            </li>
          )}

          <li className="nav-list-item">
            <Link to="/login" className="btn nav-btn">
              Login
            </Link>
          </li>

          <li className="nav-list-item hidden-xs">
            <Link className="nav-cart" to="/menu">
              <span>
                <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                {/* <span id="items_count" className="cart-count">
                  0
                </span> */}
              </span>{" "}
            </Link>
          </li>
        </ul>
      </div>

      {/* <nav id="nav-wrapper">
        <a href="#header" id="logo">
          <img src="images/logo-min.png" alt="logo" />
          <h1>tajam</h1>
        </a>

        <div class="hamburger">
          <div class="line"></div>
          <div class="line"></div>
          <div class="line"></div>
        </div>

        <ul class="nav-links">
          <li>
            <a href="#about">about</a>
          </li>
          <li>
            <a href="#expertise">expertise</a>
          </li>
          <li>
            <a href="#team">teams</a>
          </li>
          <li>
            <a href="#works">works</a>
          </li>
          <li>
            <a href="#testimonial">Testimonials</a>
          </li>
          <li>
            <a href="#contact">contact</a>
          </li>
        </ul>
      </nav> */}
    </div>
  );
};

export default Header;
