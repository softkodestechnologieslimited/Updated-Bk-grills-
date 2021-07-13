import React from "react";
import "./menu-item.styles.scss";
<<<<<<< HEAD
import pholder from "../../assets/img/magarita-placeholder.JPG";
=======
>>>>>>> 7aeb4abdbc93ca0d5cc1d9347251658af119fcf3

const MenuItem = () => {
  return (
    <div className="menu-item">
      <div className="menu-item-card">
        <img
<<<<<<< HEAD
          src={pholder}
          alt="Magarita "
          className="img-responsive"
          title="Magarita"
=======
          src="http://restaurant.sourceforces-host.com/uploads/item_images/item_856766.jpg"
          alt="Margherita "
          className="img-responsive"
          title="Margherita"
>>>>>>> 7aeb4abdbc93ca0d5cc1d9347251658af119fcf3
        />

        <div className="card-content">
          <div className="card-text">
<<<<<<< HEAD
            <h4 title="Magarita ">Magarita </h4>
=======
            <h4 title="Margherita ">Margherita </h4>
>>>>>>> 7aeb4abdbc93ca0d5cc1d9347251658af119fcf3
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
