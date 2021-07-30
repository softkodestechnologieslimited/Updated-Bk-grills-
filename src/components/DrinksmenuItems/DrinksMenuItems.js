import React from "react";
import "./drinksmenuitems.styles.scss";
import img from "../../assets/img/team-3-800x800.jpg";
// import { Link } from "react-router-dom";


const DrinksMenuItems = ({ menuItems }) => {
  return (
    <div className="menu-wrap">
      {/* <h1 className="menu-title">drinks menu</h1> */}

      <div className="menu-items-wrapper">
        {/* <h1 className="menu-sub-title">cigarettes & shisha</h1> */}
        <div className="menu-items-flex">
          {menuItems.map((menuItems, idx) => (
            <div className="menu-item-con" key={idx}>
              <div className="menu-items">
                <div className="menu-items-pad">
                  <div className="menu">
                    <div className="menu-img">
                      <img src={img} alt="menu item" title="menu-item" />
                    </div>

                    <div className="menu-text">
                      <span>
                        <h1>{menuItems.title}</h1>

                        <p>{menuItems.price}</p>
                      </span>

                      <span>
                        <p>
                         {menuItems.desc}
                        </p>

                        {/* <p>garlic, vegetable, bread</p> */}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DrinksMenuItems;
