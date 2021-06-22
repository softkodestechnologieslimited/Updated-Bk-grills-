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
            Chateau le roi gotten from a French word which means "Castle" and "le roi" also a French word
             meaning "the king" is indeed a king's castle for all kinds of customers ranging from kids, 
             to young adults and families. The goal of chateau le roi is to provide high quality, 
             healthy food at a responsible price. We pledge to provide seating areas that are neat with a 
             location where the ambience is pleasing to the senses overall. Customers can be sure that food
              will be good and service, friendly and fast.
            <br /> <br />
            We serve a wide variety of food from chicken and chips , to fried jollof rice, chicken sauce, 
            goat meat sauce, snail sauce, special noodles, and more. Also we have beverages of all kinds.
            <br /> <br />
            The reason chateau has an edge over most places is that you don't only enjoy the luxury of eating and
             drinking because we also have a swimming pool where everyone can have a deep to
              take the impact of stress of your body.
            <br /> <br />
            At chateau le roi we also care about the kids, developing their social and cognitive skills with games
            like playstation 5 and adults also have immense benefits from participating in games like snooker, chess, scrabble and more. All available at our game house.
            <br /> <br />
            Chateau le roi is located at Ogolo in lucky london street warri.
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
