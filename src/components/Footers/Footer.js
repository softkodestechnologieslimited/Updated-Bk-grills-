import React from "react";
import { Link } from "react-router-dom";

import "./footer.styles.scss";

const Footer = () => {
  return (
    <div className="footer-wrapper container">
      <div className="footer-widget-container">
        <div className="footer-widget bg-overlay visit-us">
          <div className="visit-us-content">
            <h3 className="title">
              <span>
                <Link to="/gallery">
                  <span>Visit Us</span>
                </Link>
              </span>
            </h3>
            <div className="widget-content">
              <p>
                Add salt, turning into the middle of butter and stir well, a
                very liquid. Peel them to form of the backbone.
              </p>
            </div>
            <div className="btn-wrapper">
              <Link to="/gallery" className="widget-btn">
                {" "}
                View more{" "}
              </Link>
            </div>
          </div>
        </div>

        <div className="footer-widget opening-hrs">
          <h3 className="widget-title">
            <span>opening Hours</span>
          </h3>
          <div className="widget-content">
            <p>
              Get some tomatoes, and, if they were eaten with the great
              extravagance to season with butter.
            </p>
          </div>
          <div className="fy-day" content="Monday 12:00 PM - 11:00 PM">
            {" "}
            <strong className="fy-float-left">Monday</strong>{" "}
            <span className="fy-float-right">12:00 PM - 11:00 PM</span>
          </div>
          <div className="fy-day" content="Tuesday 12:00 PM - 11:00 PM">
            {" "}
            <strong className="fy-float-left">Tuesday</strong>{" "}
            <span className="fy-float-right">12:00 PM - 11:00 PM</span>
          </div>
          <div className="fy-day" content="Wednesday 12:00 PM - 11:00 PM">
            {" "}
            <strong className="fy-float-left">Wednesday</strong>{" "}
            <span className="fy-float-right">12:00 PM - 11:00 PM</span>
          </div>
          <div className="fy-day" content="Thursday 12:00 PM - 11:00 PM">
            {" "}
            <strong className="fy-float-left">Thursday</strong>{" "}
            <span className="fy-float-right">12:00 PM - 11:00 PM</span>
          </div>
          <div className="fy-day" content="Friday 12:00 PM - 11:00 PM">
            {" "}
            <strong className="fy-float-left">Friday</strong>{" "}
            <span className="fy-float-right">12:00 PM - 11:00 PM</span>
          </div>
          <div className="fy-day" content="Saturday 12:00 PM - 11:00 PM">
            {" "}
            <strong className="fy-float-left">Saturday</strong>{" "}
            <span className="fy-float-right">12:00 PM - 11:00 PM</span>
          </div>
          <div className="fy-day" content="Sunday Closed">
            {" "}
            <strong className="fy-float-left">Sunday</strong>{" "}
            <span className="fy-float-right">Closed</span>
          </div>
        </div>

        <div className="footer-widget footer-about-us">
          <h3 className="widget-title">
            <span>About Us</span>
          </h3>
          <div className="widget-content">
            <p>
              Take your sauce with breadcrumbs, and pour in salted water, and
              put one-quarter the fire. The unique recipes for seven or fold up
              again for five potatoes, turn brownish and serve it an hour.
            </p>
            <p>
              Put on slowly, in salted water and, if you wish; sprinkle into
              slices. Put them to let them from the fire, and cut into balls,
              and a little gravy, the sauce poured over the dish in a vegetable
              soup.
            </p>
          </div>
          <Link to="/about" className="widget-btn">
            {" "}
            About us{" "}
          </Link>
        </div>
      </div>

      <div className="footer-contact-info">
        <div className="footer-address">
          <div className="fy-directions">
            <div className="fy-address">
              <div className="fy-icon">
                {" "}
                <svg
                  className="icon"
                  fill="#212335"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="shape"
                    d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                  ></path>
                </svg>
              </div>{" "}
              <a
                href="https://goo.gl/maps/UoU6KBwXYFS2"
                target="_blank"
                rel="noreferrer"
              >
                {" "}
                No. 8 Abaka St, end o lucky london street, osubi/ugolo. okpe L.G.A Delta State.{" "}
              </a>
            </div>
            <div className="fy-phone">
              <div className="fy-icon">
                {" "}
                <svg
                  className="icon"
                  fill="#212335"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="shape"
                    d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
                  ></path>
                </svg>
              </div>{" "}
              <a href="tel:+2348163899415"> +234(0) 0123456789 </a>
            </div>
            <div className="fy-email">
              <div className="fy-icon">
                {" "}
                <svg
                  className="icon"
                  fill="#1E1E2A"
                  width="24"
                  height="24"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    className="shape"
                    d="M21,4H3C2.4,4,2,4.4,2,5v14c0,0.6,0.4,1,1,1h18c0.6,0,1-0.4,1-1
 V5C22,4.4,21.6,4,21,4z M18.7,6L12,12.7L5.3,6H18.7z M20,18H4V7.6l7.3,7.3c0.4,0.4,1,0.4,1.4,0L20,7.6V18z"
                  ></path>
                </svg>
              </div>{" "}
              <a href="mailto:enquiries@bigkgrills.com">
                {" "}
                enquiries@example.com
              </a>
            </div>
            <div className="fy-hours">
              <div className="fy-icon">
                {" "}
                <svg
                  className="icon"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="shape"
                    d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
                  ></path>
                  <path
                    className="shape"
                    d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"
                  ></path>
                </svg>
              </div>{" "}
              <strong>Mon - Sat: </strong> 12:00 p.m. - 9:00 p.m.
            </div>
          </div>
        </div>
        <div className="footer-socials">
          <nav className="footer-socials-nav">
            <ul>
              <li>
                <a href="!#" target="_blank">
                  <i className="fab fa-twitter"></i>
                </a>
              </li>
              <li>
                <a href="!#" target="_blank">
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
              <li>
                <a href="!#" target="_blank">
                  <i className="fab fa-facebook-square"></i>
                </a>
              </li>
              <li>
                <a href="!#" target="_blank">
                  <i className="fab fa-tripadvisor"></i>
                </a>
              </li>
              <li>
                <a href="!#" target="_blank">
                  <i className="fab fa-yelp"></i>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="footer-copyright">
        <div className="copyright-nav">
          <nav id="navigation-footer" className="fy-navigation-footer">
            <ul id="navigation_footer" className="fy-navigation-footer">
              <li className="menu-item">
                <Link to="/">Home</Link>
              </li>
              <li className="menu-item ">
                <Link to="/menu">Menu</Link>
              </li>
              <li className="menu-item ">
                <Link to="/gallery">Gallery</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="copyright">
          <span>
            Copyright © {new Date().getFullYear()} <a href="#!">Chateau le roi</a>
          </span>
          <span>
            by <a href="https://soft-kode.com">Softkodes Technologies</a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
