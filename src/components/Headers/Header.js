import React, { useRef, useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/img/logo.png";

import "./header.styles.scss";

const Header = ({ active }) => {
  const navRef = useRef();

  const navToggle = () => {
    navRef.current.classList.toggle("open");
  };

  //detect scroll snippet https://codesandbox.io/s/detect-scroll-direction-with-memoization-lhwnd?file=/src/App.js

  const [y, setY] = useState(window.scrollY);

  const handleScroll = useCallback(
    (e) => {
      const window = e.currentTarget;
      if (y > window.scrollY) {
        console.log(y, window.scrollY, "scroll up");
        let nav = document.querySelector(".nav-wrapper");
        // nav.style.backgroundColor = "rgba(48, 45, 50, 0.7)";
        nav.className =
        "nav-wrapper nav-scroll";
      } else if (y < window.scrollY) {
        console.log(y, "scroll down");
        document.querySelector(".nav-wrapper").className =
          "nav-wrapper nav-height";
      }
      
      if (y > window.scrollY && window.scrollY === 0) {
        console.log('stop');
        document.querySelector(".nav-wrapper").className = "nav-wrapper";
      }

      // while (window.scrollY === 0) {
      //   document.querySelector(".nav-scroll").style.backgroundcolor = "none";
      // }
      setY(window.scrollY);
    },
    [y]
  );

  useEffect(() => {
    setY(window.scrollY);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className="nav-wrapper">
      <div className="nav-logo">
        <Link to="/">
          <img src={logo} alt="Chateau-le-roi" className="logo" />
        </Link>
      </div>

      {/* <div className="hamburger" onClick={navToggle}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div> */}

      <svg
        onClick={navToggle}
        className="hamburger"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          className="addshape"
          d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
        ></path>
      </svg>

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

          {/*   <li className="nav-list-item hidden-xs">
            <Link className="nav-cart" to="/menu">
              <span>
                <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                 <span id="items_count" className="cart-count">
                  0
                </span> 
              </span>{" "}
            </Link>
          </li>*/}
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
