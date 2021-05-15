import React from "react";
import "./menu-item.styles.scss";

const MenuItem = () => {
  return (
    <div className="menu-item">
      <div className="menu-item-card">
        <img
          src="http://restaurant.sourceforces-host.com/uploads/item_images/item_856766.jpg"
          alt="Margherita "
          className="img-responsive"
          title="Margherita"
        />

        <div className="card-content">
          <div className="card-text">
            <h4 title="Margherita ">Margherita </h4>
            <p>$200.00</p>
          </div>

          <a href="!#" className="btn card-btn">
            Add to cart
          </a>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
