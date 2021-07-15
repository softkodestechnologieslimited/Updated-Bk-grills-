import React from "react";
import Footer from "../../components/Footers/Footer";
import Header from "../../components/Headers/Header";
import DrinksMenuItems from "../../components/DrinksmenuItems/DrinksMenuItems";

import "./menu.styles.scss";

const Menu = () => {
  return (
    <>
      <div className="menu-wrapper">
        <Header active="menu" />

        <div className=" lg-menu-img">
          <div className="menu-img-text">
            <h2>menu</h2>
          </div>
        </div>

        <DrinksMenuItems />
      </div>

      <Footer />
    </>
  );
};

export default Menu;
