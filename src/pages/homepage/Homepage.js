import React from "react";
import Header from "../../components/Headers/Header";
import Search from "../../components/search/Search";
import MenuItem from "../../components/MenuItem/MenuItem";
import Footer from "../../components/Footers/Footer";

import "./homepage.styles.scss";

const Homepage = () => {
  return (
    <>
      <Header active="home" />
      <div className="header-wrapper">
        <section className="header-content container">
          <h1>Best Quality and Tasty Food </h1>
          <p>
            BKGrills is an original, modern and exclusive restaurant business.
            We sells: Turkey, Fish, Barbecue, Drinks, Shawarma.
            <br />
            Located at Ikoyo Avenue, off shell road, Sapele, Delta state.
            {/* We are passionate about producing fresh, original, and above all
            tasty food. That's why we've kept our menu, simple yet full of the
            finest ingredients. */}
          </p>
        </section>
        <Search />
      </div>

      <section className="menu-content container">
        <div className="menu-content-header">
          <h1>Special food items</h1>
          <p>We have the glory beginning in restaurant business</p>
        </div>

        <div className="menu-categories">
          <ul className="featured-list">
            <li className="list-item active">
              <a href="#!">Food (Grill)</a>
            </li>

            <li className="list-item">
              <a href="#!">Soft Drinks</a>
            </li>

            <li className="list-item">
              <a href="#!">Beer</a>
            </li>

            <li className="list-item">
              <a href="#!">Energy Drinks</a>
            </li>

            <li className="list-item">
              <a href="#!">Wine</a>
            </li>

            <li className="list-item">
              <a href="#!">Creme</a>
            </li>

            <li className="list-item">
              <a href="#!">Whiskey</a>
            </li>

            <li className="list-item">
              <a href="#!">Tequila</a>
            </li>
          </ul>
        </div>

        <div className="menu-items-wrapper">
          <MenuItem />
          <MenuItem />
          <MenuItem />
          <MenuItem />
          <MenuItem />
          <MenuItem />
          <MenuItem />
          <MenuItem />
        </div>

        {/* <button onClick={downloadReport}>Download Report</button> */}
      </section>

      <Footer />
    </>
  );
};

export default Homepage;
