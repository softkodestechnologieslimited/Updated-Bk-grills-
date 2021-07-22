import React from "react";
import { Link } from "react-router-dom";
import Button from '../Button'
import "./homepagecards.styles.scss";

const HomepageCards = () => {
  return (
    <div className="cards">
      <div className="sm-cards-con">
        <div className="cards-buff">
          <div className="sm-cards">
            <h3>the best charcoal</h3>

            <p>
              {" "}
              Take off the lid in the risk of mince it well, cook for 5 minutes
              and serve while hot.
            </p>
            <Button className="btn">view more</Button>
          </div>
        </div>

        <div className="cards-buff">
          <div className="sm-cards">
            <h3>the best charcoal</h3>

            <p>
              {" "}
              Take off the lid in the risk of mince it well, cook for 5 minutes
              and serve while hot.
            </p>

            <Button className="btn">view more</Button>
          </div>
        </div>

        <div className="cards-buff">
          <div className="sm-cards">
            <h3>the best charcoal</h3>

            <p>
              {" "}
              Take off the lid in the risk of mince it well, cook for 5 minutes
              and serve while hot.
            </p>

            <Button className="btn">view more</Button>
          </div>
        </div>
      </div>

      <div className="lg-card-con">
        <div className="lg-img">
          <div className="lg-img-text">
            <h2>our services</h2>
            <p>
              At chateau-le-roi we provide an original, modern and exclusive
              service. We sell: Turkey, Fish, Barbecue, Drinks, Shawarma.
              Located at No. 8 Abaka St, end off lucky london street,
              osubi/ugolo. okpe L.G.A Delta State.
            </p>
            <div className="lg-img-address">
              <div className="address-flex">
                <div className="svg">
                  <svg
                    className="icon"
                    fill="#212335"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      className="addshape"
                      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                    ></path>
                  </svg>
                </div>

                <div className="span">
                  <span>
                    No. 8 Abaka St, end off lucky london street, osubi/ugolo.
                    okpe L.G.A Delta State.
                  </span>
                </div>
              </div>

              <div className="address-flex">
                <div className="svg">
                  <svg
                    className="icon"
                    fill="#212335"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      className="addshape"
                      d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
                    ></path>
                  </svg>
                </div>

                <div className="span">
                  <span>+234(0) 0123456789 </span>
                </div>
              </div>

              <div className="address-flex">
                <div className="svg">
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
                      className="addshape"
                      d="M21,4H3C2.4,4,2,4.4,2,5v14c0,0.6,0.4,1,1,1h18c0.6,0,1-0.4,1-1
 V5C22,4.4,21.6,4,21,4z M18.7,6L12,12.7L5.3,6H18.7z M20,18H4V7.6l7.3,7.3c0.4,0.4,1,0.4,1.4,0L20,7.6V18z"
                    ></path>
                  </svg>
                </div>

                <div className="span">
                  {" "}
                  <span>enquiries@example.com</span>
                </div>
              </div>

              <div className="address-flex">
                <div className="svg">
                  <svg
                    className="icon"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      className="addshape"
                      d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
                    ></path>
                    <path
                      className="addshape"
                      d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"
                    ></path>
                  </svg>
                </div>

                <div className="span">
                  {" "}
                  <span>
                    {" "}
                    <strong>Mon - Sat: </strong> 12:00 p.m. - 9:00 p.m.{" "}
                  </span>
                </div>
              </div>
            </div>

            <div className="lg-img-btns">
              <Link to="/about">
              <Button className="btn-bordered">about</Button>
              </Link>{" "}
              <Link to="/menu">
                <Button className="btn-bordered btn-pad">menu</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomepageCards;
