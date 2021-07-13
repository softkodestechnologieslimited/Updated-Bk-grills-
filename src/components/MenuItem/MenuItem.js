import React from "react";
import "./menu-item.styles.scss";
import pholder from "../../assets/img/magarita-placeholder.JPG";

const MenuItem = () => {
  return (
    <div className="menu-item">
      <div className="menu-item-card">
        <img
          src={pholder}
          alt="Magarita "
          className="img-responsive"
          title="Magarita"
        />

        <div className="card-content">
          <div className="card-text">
            <h4 title="Magarita ">Magarita </h4>
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
