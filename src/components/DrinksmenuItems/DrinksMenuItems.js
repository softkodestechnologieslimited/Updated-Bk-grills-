import React, { CSSProperties } from "react";
import "./drinksmenuitems.styles.scss";
import img from "../../assets/img/team-3-800x800.jpg";
// import { Link } from "react-router-dom";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const DrinksMenuItems = () => {
  const arrowStyles: CSSProperties = {
    position: "absolute",
    zIndex: 2,
    top: "calc(50% - 15px)",
    width: 30,
    height: 30,
    cursor: "pointer",
    transition: "all 1s ease",
  };

  return (
    <div className="menu-wrap">
      <h1 className="menu-title">drinks menu</h1>
      <Carousel
        // autoPlay
        infiniteLoop
        // interval={2800}
        // transitionTime={600}
        showStatus={false}
        emulateTouch
        showIndicators={false}
        showThumbs={false}
        dynamicHeight={false}
        // centerMode={true}
        // centerSlidePercentage={50}
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <svg
              className="arrows prev"
              onClick={onClickHandler}
              title={label}
              style={{ ...arrowStyles, left: 15 }}
              // width="24"
              // height="24"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <polygon
                className="shape"
                fill="rgba(38, 35, 40, 0.6)"
                points="16.4,3.5 15,2.1 6.5,10.6 5.1,12 6.5,13.4 15,21.9 16.4,20.5 7.9,12"
              ></polygon>
            </svg>
          )
        }
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <svg
              className="arrows next"
              onClick={onClickHandler}
              title={label}
              style={{ ...arrowStyles, right: 15 }}
              // width="24"
              // height="24"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <style type="text/css">
                {`.shape { animation: arr 3s ease 1s infinite; transition: all .5s ease; }`}
                {`.arrows:hover  .shape{ fill: white; transition: all .5s ease;}`}
                {`@keyframes arr {
                from {fill: rgba(38, 35, 40, 0.6)}
                to { fill: white;}
              }`}
              </style>

              <polygon
                className="shape"
                fill="rgba(38, 35, 40, 0.6)"
                points="9,2.1 7.6,3.5 16.1,12 7.6,20.5 9,21.9 18.9,12"
              ></polygon>
            </svg>
          )
        }
      >
        <div className="menu-items-wrapper">
          <h1 className="menu-sub-title">beers & coolers</h1>
          <div className="menu-items-flex">
            <div className="menu-item-con">
              <div className="menu-items">
                <div className="menu-items-pad">
                  <div className="menu">
                    <div className="menu-img">
                      <img src={img} alt="menu item" title="menu-item" />
                    </div>

                    <div className="menu-text">
                      <span>
                        <h1>Heineken</h1>

                        <p>₦ 800</p>
                      </span>

                      <span>
                        <p>
                          Lorem ipsum is a dummy text generated as a placeholder
                          text
                        </p>

                        {/* <p>garlic, vegetable, bread</p> */}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>{" "}
            <div className="menu-item-con">
              <div className="menu-items">
                <div className="menu-items-pad">
                  <div className="menu">
                    <div className="menu-img">
                      <img src={img} alt="menu item" title="menu-item" />
                    </div>

                    <div className="menu-text">
                      <span>
                        <h1>Guiness</h1>

                        <p>₦ 800</p>
                      </span>

                      <span>
                        <p>
                          Lorem ipsum is a dummy text generated as a placeholder
                          text
                        </p>

                        {/* <p>garlic, vegetable, bread</p> */}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>{" "}
            <div className="menu-item-con">
              <div className="menu-items">
                <div className="menu-items-pad">
                  <div className="menu">
                    <div className="menu-img">
                      <img src={img} alt="menu item" title="menu-item" />
                    </div>

                    <div className="menu-text">
                      <span>
                        <h1>Legend</h1>

                        <p>₦ 600</p>
                      </span>

                      <span>
                        <p>
                          Lorem ipsum is a dummy text generated as a placeholder
                          text
                        </p>

                        {/* <p>garlic, vegetable, bread</p> */}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>{" "}
            <div className="menu-item-con">
              <div className="menu-items">
                <div className="menu-items-pad">
                  <div className="menu">
                    <div className="menu-img">
                      <img src={img} alt="menu item" title="menu-item" />
                    </div>

                    <div className="menu-text">
                      <span>
                        <h1>Star</h1>

                        <p>₦ 600</p>
                      </span>

                      <span>
                        <p>
                          Lorem ipsum is a dummy text generated as a placeholder
                          text
                        </p>

                        {/* <p>garlic, vegetable, bread</p> */}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>{" "}
            <div className="menu-item-con">
              <div className="menu-items">
                <div className="menu-items-pad">
                  <div className="menu">
                    <div className="menu-img">
                      <img src={img} alt="menu item" title="menu-item" />
                    </div>

                    <div className="menu-text">
                      <span>
                        <h1>Goldberg</h1>

                        <p>₦ 800</p>
                      </span>

                      <span>
                        <p>Lorem ipsum is a dummy text</p>

                        {/* <p>garlic, vegetable, bread</p> */}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>{" "}
            <div className="menu-item-con">
              <div className="menu-items">
                <div className="menu-items-pad">
                  <div className="menu">
                    <div className="menu-img">
                      <img src={img} alt="menu item" title="menu-item" />
                    </div>

                    <div className="menu-text">
                      <span>
                        <h1>Gulderg</h1>

                        <p>₦ 600</p>
                      </span>

                      <span>
                        <p>Lorem ipsum is a dummy text</p>

                        {/* <p>garlic, vegetable, bread</p> */}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="menu-item-con">
              <div className="menu-items">
                <div className="menu-items-pad">
                  <div className="menu">
                    <div className="menu-img">
                      <img src={img} alt="menu item" title="menu-item" />
                    </div>

                    <div className="menu-text">
                      <span>
                        <h1>Smirnoff Ice Black</h1>

                        <p>₦ 800</p>
                      </span>

                      <span>
                        <p>Lorem ipsum is a dummy text</p>

                        {/* <p>garlic, vegetable, bread</p> */}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="menu-item-con">
              <div className="menu-items">
                <div className="menu-items-pad">
                  <div className="menu">
                    <div className="menu-img">
                      <img src={img} alt="menu item" title="menu-item" />
                    </div>

                    <div className="menu-text">
                      <span>
                        <h1>Smirnoff Ice Red</h1>

                        <p>₦ 800</p>
                      </span>

                      <span>
                        <p>Lorem ipsum is a dummy text</p>

                        {/* <p>garlic, vegetable, bread</p> */}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="menu-item-con">
              <div className="menu-items">
                <div className="menu-items-pad">
                  <div className="menu">
                    <div className="menu-img">
                      <img src={img} alt="menu item" title="menu-item" />
                    </div>

                    <div className="menu-text">
                      <span>
                        <h1>Star Radler</h1>

                        <p>₦ 600</p>
                      </span>

                      <span>
                        <p>Lorem ipsum is a dummy text</p>

                        {/* <p>garlic, vegetable, bread</p> */}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="menu-item-con">
              <div className="menu-items">
                <div className="menu-items-pad">
                  <div className="menu">
                    <div className="menu-img">
                      <img src={img} alt="menu item" title="menu-item" />
                    </div>

                    <div className="menu-text">
                      <span>
                        <h1>Snapp</h1>

                        <p>₦ 600</p>
                      </span>

                      <span>
                        <p>Lorem ipsum is a dummy text</p>

                        {/* <p>garlic, vegetable, bread</p> */}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="menu-item-con">
              <div className="menu-items">
                <div className="menu-items-pad">
                  <div className="menu">
                    <div className="menu-img">
                      <img src={img} alt="menu item" title="menu-item" />
                    </div>

                    <div className="menu-text">
                      <span>
                        <h1>Hunter's Gold</h1>

                        <p>₦ 1,500</p>
                      </span>

                      <span>
                        <p>Lorem ipsum is a dummy text</p>

                        {/* <p>garlic, vegetable, bread</p> */}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="menu-item-con">
              <div className="menu-items">
                <div className="menu-items-pad">
                  <div className="menu">
                    <div className="menu-img">
                      <img src={img} alt="menu item" title="menu-item" />
                    </div>

                    <div className="menu-text">
                      <span>
                        <h1>Hunter's Dry</h1>

                        <p>₦ 1,500</p>
                      </span>

                      <span>
                        <p>Lorem ipsum is a dummy text</p>

                        {/* <p>garlic, vegetable, bread</p> */}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="menu-item-con">
              <div className="menu-items">
                <div className="menu-items-pad">
                  <div className="menu">
                    <div className="menu-img">
                      <img src={img} alt="menu item" title="menu-item" />
                    </div>

                    <div className="menu-text">
                      <span>
                        <h1>Savanna Dry</h1>

                        <p>₦ 1,500</p>
                      </span>

                      <span>
                        <p>Lorem ipsum is a dummy text</p>

                        {/* <p>garlic, vegetable, bread</p> */}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="menu-item-con">
              <div className="menu-items">
                <div className="menu-items-pad">
                  <div className="menu">
                    <div className="menu-img">
                      <img src={img} alt="menu item" title="menu-item" />
                    </div>

                    <div className="menu-text">
                      <span>
                        <h1>Origin Bitters (L)</h1>

                        <p>₦ 3,500</p>
                      </span>

                      <span>
                        <p>Lorem ipsum is a dummy text</p>

                        {/* <p>garlic, vegetable, bread</p> */}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="menu-item-con">
              <div className="menu-items">
                <div className="menu-items-pad">
                  <div className="menu">
                    <div className="menu-img">
                      <img src={img} alt="menu item" title="menu-item" />
                    </div>

                    <div className="menu-text">
                      <span>
                        <h1>Origin Bitters (S)</h1>

                        <p>₦ 1000</p>
                      </span>

                      <span>
                        <p>Lorem ipsum is a dummy text</p>

                        {/* <p>garlic, vegetable, bread</p> */}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="menu-item-con">
              <div className="menu-items">
                <div className="menu-items-pad">
                  <div className="menu">
                    <div className="menu-img">
                      <img src={img} alt="menu item" title="menu-item" />
                    </div>

                    <div className="menu-text">
                      <span>
                        <h1>Action Bitters (L)</h1>

                        <p>₦ 3,000</p>
                      </span>

                      <span>
                        <p>Lorem ipsum is a dummy text</p>

                        {/* <p>garlic, vegetable, bread</p> */}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="menu-item-con">
              <div className="menu-items">
                <div className="menu-items-pad">
                  <div className="menu">
                    <div className="menu-img">
                      <img src={img} alt="menu item" title="menu-item" />
                    </div>

                    <div className="menu-text">
                      <span>
                        <h1>Action Bitters (S)</h1>

                        <p>₦ 800</p>
                      </span>

                      <span>
                        <p>Lorem ipsum is a dummy text</p>

                        {/* <p>garlic, vegetable, bread</p> */}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="menu-item-con">
              <div className="menu-items">
                <div className="menu-items-pad">
                  <div className="menu">
                    <div className="menu-img">
                      <img src={img} alt="menu item" title="menu-item" />
                    </div>

                    <div className="menu-text">
                      <span>
                        <h1>Black Bullet</h1>

                        <p>₦ 1000</p>
                      </span>

                      <span>
                        <p>Lorem ipsum is a dummy text</p>

                        {/* <p>garlic, vegetable, bread</p> */}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="menu-item-con">
              <div className="menu-items">
                <div className="menu-items-pad">
                  <div className="menu">
                    <div className="menu-img">
                      <img src={img} alt="menu item" title="menu-item" />
                    </div>

                    <div className="menu-text">
                      <span>
                        <h1>Chapman</h1>

                        <p>₦ 1,200</p>
                      </span>

                      <span>
                        <p>Lorem ipsum is a dummy text</p>

                        {/* <p>garlic, vegetable, bread</p> */}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="menu-item-con">
              <div className="menu-items">
                <div className="menu-items-pad">
                  <div className="menu">
                    <div className="menu-img">
                      <img src={img} alt="menu item" title="menu-item" />
                    </div>

                    <div className="menu-text">
                      <span>
                        <h1>Chapman & Alcohol</h1>

                        <p>₦ 1,500</p>
                      </span>

                      <span>
                        <p>Lorem ipsum is a dummy text</p>

                        {/* <p>garlic, vegetable, bread</p> */}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="menu-item-con">
              <div className="menu-items">
                <div className="menu-items-pad">
                  <div className="menu">
                    <div className="menu-img">
                      <img src={img} alt="menu item" title="menu-item" />
                    </div>

                    <div className="menu-text">
                      <span>
                        <h1>Captain Jack</h1>

                        <p>₦ 800</p>
                      </span>

                      <span>
                        <p>Lorem ipsum is a dummy text</p>

                        {/* <p>garlic, vegetable, bread</p> */}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="menu-item-con">
              <div className="menu-items">
                <div className="menu-items-pad">
                  <div className="menu">
                    <div className="menu-img">
                      <img src={img} alt="menu item" title="menu-item" />
                    </div>

                    <div className="menu-text">
                      <span>
                        <h1>Kuemmerling (L)</h1>

                        <p>₦ 5,000</p>
                      </span>

                      <span>
                        <p>Lorem ipsum is a dummy text</p>

                        {/* <p>garlic, vegetable, bread</p> */}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="menu-item-con">
              <div className="menu-items">
                <div className="menu-items-pad">
                  <div className="menu">
                    <div className="menu-img">
                      <img src={img} alt="menu item" title="menu-item" />
                    </div>

                    <div className="menu-text">
                      <span>
                        <h1>Kuemmerling (S)</h1>

                        <p>₦ 1,500</p>
                      </span>

                      <span>
                        <p>Lorem ipsum is a dummy text</p>

                        {/* <p>garlic, vegetable, bread</p> */}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="menu-items-wrapper">
          <h1 className="menu-sub-title">wine</h1>
          <div className="menu-items-flex">
            <div className="menu-item-con">
              <div className="menu-items">
                <div className="menu-items-pad">
                  <div className="menu">
                    <div className="menu-img">
                      <img src={img} alt="menu item" title="menu-item" />
                    </div>

                    <div className="menu-text">
                      <span>
                        <h1>Chicken and chips</h1>

                        <p>₦ 3000</p>
                      </span>

                      <span>
                        <p>
                          Lorem ipsum is a dummy text generated as a placeholder
                          text
                        </p>

                        <p>garlic, vegetable, bread</p>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>{" "}
            <div className="menu-item-con">
              <div className="menu-items">
                <div className="menu-items-pad">
                  <div className="menu">
                    <div className="menu-img">
                      <img src={img} alt="menu item" title="menu-item" />
                    </div>

                    <div className="menu-text">
                      <span>
                        <h1>Chicken and chips</h1>

                        <p>₦ 3000</p>
                      </span>

                      <span>
                        <p>Lorem ipsum is a dummy text</p>

                        <p>garlic, vegetable, bread</p>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="menu-items-wrapper">
          <h1 className="menu-sub-title">vodka</h1>
          <div className="menu-items-flex">
            <div className="menu-item-con">
              <div className="menu-items">
                <div className="menu-items-pad">
                  <div className="menu">
                    <div className="menu-img">
                      <img src={img} alt="menu item" title="menu-item" />
                    </div>

                    <div className="menu-text">
                      <span>
                        <h1>Chicken and chips</h1>

                        <p>₦ 3000</p>
                      </span>

                      <span>
                        <p>
                          Lorem ipsum is a dummy text generated as a placeholder
                          text
                        </p>

                        <p>garlic, vegetable, bread</p>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>{" "}
            <div className="menu-item-con">
              <div className="menu-items">
                <div className="menu-items-pad">
                  <div className="menu">
                    <div className="menu-img">
                      <img src={img} alt="menu item" title="menu-item" />
                    </div>

                    <div className="menu-text">
                      <span>
                        <h1>Chicken and chips</h1>

                        <p>₦ 3000</p>
                      </span>

                      <span>
                        <p>Lorem ipsum is a dummy text</p>

                        <p>garlic, vegetable, bread</p>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="menu-items-wrapper">
          <h1 className="menu-sub-title">whiskey & cognac</h1>
          <div className="menu-items-flex">
            <div className="menu-item-con">
              <div className="menu-items">
                <div className="menu-items-pad">
                  <div className="menu">
                    <div className="menu-img">
                      <img src={img} alt="menu item" title="menu-item" />
                    </div>

                    <div className="menu-text">
                      <span>
                        <h1>Chicken and chips</h1>

                        <p>₦ 3000</p>
                      </span>

                      <span>
                        <p>
                          Lorem ipsum is a dummy text generated as a placeholder
                          text
                        </p>

                        <p>garlic, vegetable, bread</p>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>{" "}
            <div className="menu-item-con">
              <div className="menu-items">
                <div className="menu-items-pad">
                  <div className="menu">
                    <div className="menu-img">
                      <img src={img} alt="menu item" title="menu-item" />
                    </div>

                    <div className="menu-text">
                      <span>
                        <h1>Chicken and chips</h1>

                        <p>₦ 3000</p>
                      </span>

                      <span>
                        <p>Lorem ipsum is a dummy text</p>

                        <p>garlic, vegetable, bread</p>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="menu-items-wrapper">
          <h1 className="menu-sub-title">rum</h1>
          <div className="menu-items-flex">
            <div className="menu-item-con">
              <div className="menu-items">
                <div className="menu-items-pad">
                  <div className="menu">
                    <div className="menu-img">
                      <img src={img} alt="menu item" title="menu-item" />
                    </div>

                    <div className="menu-text">
                      <span>
                        <h1>Chicken and chips</h1>

                        <p>₦ 3000</p>
                      </span>

                      <span>
                        <p>
                          Lorem ipsum is a dummy text generated as a placeholder
                          text
                        </p>

                        <p>garlic, vegetable, bread</p>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>{" "}
            <div className="menu-item-con">
              <div className="menu-items">
                <div className="menu-items-pad">
                  <div className="menu">
                    <div className="menu-img">
                      <img src={img} alt="menu item" title="menu-item" />
                    </div>

                    <div className="menu-text">
                      <span>
                        <h1>Chicken and chips</h1>

                        <p>₦ 3000</p>
                      </span>

                      <span>
                        <p>Lorem ipsum is a dummy text</p>

                        <p>garlic, vegetable, bread</p>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="menu-items-wrapper">
          <h1 className="menu-sub-title">liqueur</h1>
          <div className="menu-items-flex">
            <div className="menu-item-con">
              <div className="menu-items">
                <div className="menu-items-pad">
                  <div className="menu">
                    <div className="menu-img">
                      <img src={img} alt="menu item" title="menu-item" />
                    </div>

                    <div className="menu-text">
                      <span>
                        <h1>Chicken and chips</h1>

                        <p>₦ 3000</p>
                      </span>

                      <span>
                        <p>
                          Lorem ipsum is a dummy text generated as a placeholder
                          text
                        </p>

                        <p>garlic, vegetable, bread</p>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>{" "}
            <div className="menu-item-con">
              <div className="menu-items">
                <div className="menu-items-pad">
                  <div className="menu">
                    <div className="menu-img">
                      <img src={img} alt="menu item" title="menu-item" />
                    </div>

                    <div className="menu-text">
                      <span>
                        <h1>Chicken and chips</h1>

                        <p>₦ 3000</p>
                      </span>

                      <span>
                        <p>Lorem ipsum is a dummy text</p>

                        <p>garlic, vegetable, bread</p>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="menu-items-wrapper">
          <h1 className="menu-sub-title">gin</h1>
          <div className="menu-items-flex">
            <div className="menu-item-con">
              <div className="menu-items">
                <div className="menu-items-pad">
                  <div className="menu">
                    <div className="menu-img">
                      <img src={img} alt="menu item" title="menu-item" />
                    </div>

                    <div className="menu-text">
                      <span>
                        <h1>Chicken and chips</h1>

                        <p>₦ 3000</p>
                      </span>

                      <span>
                        <p>
                          Lorem ipsum is a dummy text generated as a placeholder
                          text
                        </p>

                        <p>garlic, vegetable, bread</p>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>{" "}
            <div className="menu-item-con">
              <div className="menu-items">
                <div className="menu-items-pad">
                  <div className="menu">
                    <div className="menu-img">
                      <img src={img} alt="menu item" title="menu-item" />
                    </div>

                    <div className="menu-text">
                      <span>
                        <h1>Chicken and chips</h1>

                        <p>₦ 3000</p>
                      </span>

                      <span>
                        <p>Lorem ipsum is a dummy text</p>

                        <p>garlic, vegetable, bread</p>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="menu-items-wrapper">
          <h1 className="menu-sub-title">cocktails</h1>
          <div className="menu-items-flex">
            <div className="menu-item-con">
              <div className="menu-items">
                <div className="menu-items-pad">
                  <div className="menu">
                    <div className="menu-img">
                      <img src={img} alt="menu item" title="menu-item" />
                    </div>

                    <div className="menu-text">
                      <span>
                        <h1>Chicken and chips</h1>

                        <p>₦ 3000</p>
                      </span>

                      <span>
                        <p>
                          Lorem ipsum is a dummy text generated as a placeholder
                          text
                        </p>

                        <p>garlic, vegetable, bread</p>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>{" "}
            <div className="menu-item-con">
              <div className="menu-items">
                <div className="menu-items-pad">
                  <div className="menu">
                    <div className="menu-img">
                      <img src={img} alt="menu item" title="menu-item" />
                    </div>

                    <div className="menu-text">
                      <span>
                        <h1>Chicken and chips</h1>

                        <p>₦ 3000</p>
                      </span>

                      <span>
                        <p>Lorem ipsum is a dummy text</p>

                        <p>garlic, vegetable, bread</p>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="menu-items-wrapper">
          <h1 className="menu-sub-title">chateau cocktail specials</h1>
          <div className="menu-items-flex">
            <div className="menu-item-con">
              <div className="menu-items">
                <div className="menu-items-pad">
                  <div className="menu">
                    <div className="menu-img">
                      <img src={img} alt="menu item" title="menu-item" />
                    </div>

                    <div className="menu-text">
                      <span>
                        <h1>Chicken and chips</h1>

                        <p>₦ 3000</p>
                      </span>

                      <span>
                        <p>
                          Lorem ipsum is a dummy text generated as a placeholder
                          text
                        </p>

                        <p>garlic, vegetable, bread</p>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>{" "}
            <div className="menu-item-con">
              <div className="menu-items">
                <div className="menu-items-pad">
                  <div className="menu">
                    <div className="menu-img">
                      <img src={img} alt="menu item" title="menu-item" />
                    </div>

                    <div className="menu-text">
                      <span>
                        <h1>Chicken and chips</h1>

                        <p>₦ 3000</p>
                      </span>

                      <span>
                        <p>Lorem ipsum is a dummy text</p>

                        <p>garlic, vegetable, bread</p>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="menu-items-wrapper">
          <h1 className="menu-sub-title">champagne</h1>
          <div className="menu-items-flex">
            <div className="menu-item-con">
              <div className="menu-items">
                <div className="menu-items-pad">
                  <div className="menu">
                    <div className="menu-img">
                      <img src={img} alt="menu item" title="menu-item" />
                    </div>

                    <div className="menu-text">
                      <span>
                        <h1>Chicken and chips</h1>

                        <p>₦ 3000</p>
                      </span>

                      <span>
                        <p>
                          Lorem ipsum is a dummy text generated as a placeholder
                          text
                        </p>

                        <p>garlic, vegetable, bread</p>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>{" "}
            <div className="menu-item-con">
              <div className="menu-items">
                <div className="menu-items-pad">
                  <div className="menu">
                    <div className="menu-img">
                      <img src={img} alt="menu item" title="menu-item" />
                    </div>

                    <div className="menu-text">
                      <span>
                        <h1>Chicken and chips</h1>

                        <p>₦ 3000</p>
                      </span>

                      <span>
                        <p>Lorem ipsum is a dummy text</p>

                        <p>garlic, vegetable, bread</p>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="menu-items-wrapper">
          <h1 className="menu-sub-title">soft drinks</h1>
          <div className="menu-items-flex">
            <div className="menu-item-con">
              <div className="menu-items">
                <div className="menu-items-pad">
                  <div className="menu">
                    <div className="menu-img">
                      <img src={img} alt="menu item" title="menu-item" />
                    </div>

                    <div className="menu-text">
                      <span>
                        <h1>Chicken and chips</h1>

                        <p>₦ 3000</p>
                      </span>

                      <span>
                        <p>
                          Lorem ipsum is a dummy text generated as a placeholder
                          text
                        </p>

                        <p>garlic, vegetable, bread</p>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>{" "}
            <div className="menu-item-con">
              <div className="menu-items">
                <div className="menu-items-pad">
                  <div className="menu">
                    <div className="menu-img">
                      <img src={img} alt="menu item" title="menu-item" />
                    </div>

                    <div className="menu-text">
                      <span>
                        <h1>Chicken and chips</h1>

                        <p>₦ 3000</p>
                      </span>

                      <span>
                        <p>Lorem ipsum is a dummy text</p>

                        <p>garlic, vegetable, bread</p>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Carousel>

      {/* <Link to="/gallery"> */}
      <h1 className="menu-title food-menu">food menu</h1>
      {/* </Link> */}

      <Carousel
        // autoPlay
        infiniteLoop
        // interval={2800}
        // transitionTime={600}
        showStatus={false}
        emulateTouch
        showIndicators={false}
        showThumbs={false}
        dynamicHeight={false}
        // centerMode={true}
        // centerSlidePercentage={50}
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <svg
              className="arrows prev"
              onClick={onClickHandler}
              title={label}
              style={{ ...arrowStyles, left: 15 }}
              // width="24"
              // height="24"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <polygon
                className="shape"
                fill="rgba(38, 35, 40, 0.6)"
                points="16.4,3.5 15,2.1 6.5,10.6 5.1,12 6.5,13.4 15,21.9 16.4,20.5 7.9,12"
              ></polygon>
            </svg>
          )
        }
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <svg
              className="arrows next"
              onClick={onClickHandler}
              title={label}
              style={{ ...arrowStyles, right: 15 }}
              // width="24"
              // height="24"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <style type="text/css">
                {`.shape { animation: arr 3s ease 1s infinite; transition: all .5s ease; }`}
                {`.arrows:hover  .shape{ fill: white; transition: all .5s ease;}`}
                {`@keyframes arr {
                from {fill: rgba(38, 35, 40, 0.6)}
                to { fill: white;}
              }`}
              </style>

              <polygon
                className="shape"
                fill="rgba(38, 35, 40, 0.6)"
                points="9,2.1 7.6,3.5 16.1,12 7.6,20.5 9,21.9 18.9,12"
              ></polygon>
            </svg>
          )
        }
      >
        <div className="menu-items-wrapper">
          <h1 className="menu-sub-title">kitchen specials</h1>
          <div className="menu-items-flex">
            <div className="menu-item-con">
              <div className="menu-items">
                <div className="menu-items-pad">
                  <div className="menu">
                    <div className="menu-img">
                      <img src={img} alt="menu item" title="menu-item" />
                    </div>

                    <div className="menu-text">
                      <span>
                        <h1>Chicken and chips</h1>

                        <p>₦ 3000</p>
                      </span>

                      <span>
                        <p>
                          Lorem ipsum is a dummy text generated as a placeholder
                          text
                        </p>

                        <p>garlic, vegetable, bread</p>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>{" "}
            <div className="menu-item-con">
              <div className="menu-items">
                <div className="menu-items-pad">
                  <div className="menu">
                    <div className="menu-img">
                      <img src={img} alt="menu item" title="menu-item" />
                    </div>

                    <div className="menu-text">
                      <span>
                        <h1>Chicken and chips</h1>

                        <p>₦ 3000</p>
                      </span>

                      <span>
                        <p>
                          Lorem ipsum is a dummy text generated as a placeholder
                          text
                        </p>

                        <p>garlic, vegetable, bread</p>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>{" "}
            <div className="menu-item-con">
              <div className="menu-items">
                <div className="menu-items-pad">
                  <div className="menu">
                    <div className="menu-img">
                      <img src={img} alt="menu item" title="menu-item" />
                    </div>

                    <div className="menu-text">
                      <span>
                        <h1>Chicken and chips</h1>

                        <p>₦ 3000</p>
                      </span>

                      <span>
                        <p>
                          Lorem ipsum is a dummy text generated as a placeholder
                          text
                        </p>

                        <p>garlic, vegetable, bread</p>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>{" "}
            <div className="menu-item-con">
              <div className="menu-items">
                <div className="menu-items-pad">
                  <div className="menu">
                    <div className="menu-img">
                      <img src={img} alt="menu item" title="menu-item" />
                    </div>

                    <div className="menu-text">
                      <span>
                        <h1>Chicken and chips</h1>

                        <p>₦ 3000</p>
                      </span>

                      <span>
                        <p>
                          Lorem ipsum is a dummy text generated as a placeholder
                          text
                        </p>

                        <p>garlic, vegetable, bread</p>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>{" "}
            <div className="menu-item-con">
              <div className="menu-items">
                <div className="menu-items-pad">
                  <div className="menu">
                    <div className="menu-img">
                      <img src={img} alt="menu item" title="menu-item" />
                    </div>

                    <div className="menu-text">
                      <span>
                        <h1>Chicken and chips</h1>

                        <p>₦ 3000</p>
                      </span>

                      <span>
                        <p>Lorem ipsum is a dummy text</p>

                        <p>garlic, vegetable, bread</p>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="menu-items-wrapper">
          <h1 className="menu-sub-title">rice specials</h1>
          <div className="menu-items-flex">
            <div className="menu-item-con">
              <div className="menu-items">
                <div className="menu-items-pad">
                  <div className="menu">
                    <div className="menu-img">
                      <img src={img} alt="menu item" title="menu-item" />
                    </div>

                    <div className="menu-text">
                      <span>
                        <h1>Chicken and chips</h1>

                        <p>₦ 3000</p>
                      </span>

                      <span>
                        <p>
                          Lorem ipsum is a dummy text generated as a placeholder
                          text
                        </p>

                        <p>garlic, vegetable, bread</p>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>{" "}
            <div className="menu-item-con">
              <div className="menu-items">
                <div className="menu-items-pad">
                  <div className="menu">
                    <div className="menu-img">
                      <img src={img} alt="menu item" title="menu-item" />
                    </div>

                    <div className="menu-text">
                      <span>
                        <h1>Chicken and chips</h1>

                        <p>₦ 3000</p>
                      </span>

                      <span>
                        <p>Lorem ipsum is a dummy text</p>

                        <p>garlic, vegetable, bread</p>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="menu-items-wrapper">
          <h1 className="menu-sub-title">indomie specials</h1>
          <div className="menu-items-flex">
            <div className="menu-item-con">
              <div className="menu-items">
                <div className="menu-items-pad">
                  <div className="menu">
                    <div className="menu-img">
                      <img src={img} alt="menu item" title="menu-item" />
                    </div>

                    <div className="menu-text">
                      <span>
                        <h1>Chicken and chips</h1>

                        <p>₦ 3000</p>
                      </span>

                      <span>
                        <p>
                          Lorem ipsum is a dummy text generated as a placeholder
                          text
                        </p>

                        <p>garlic, vegetable, bread</p>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>{" "}
            <div className="menu-item-con">
              <div className="menu-items">
                <div className="menu-items-pad">
                  <div className="menu">
                    <div className="menu-img">
                      <img src={img} alt="menu item" title="menu-item" />
                    </div>

                    <div className="menu-text">
                      <span>
                        <h1>Chicken and chips</h1>

                        <p>₦ 3000</p>
                      </span>

                      <span>
                        <p>Lorem ipsum is a dummy text</p>

                        <p>garlic, vegetable, bread</p>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Carousel>

      <h1 className="menu-title">cigarettes and shisha</h1>

      <div className="menu-items-wrapper">
        {/* <h1 className="menu-sub-title">cigarettes & shisha</h1> */}
        <div className="menu-items-flex">
          <div className="menu-item-con">
            <div className="menu-items">
              <div className="menu-items-pad">
                <div className="menu">
                  <div className="menu-img">
                    <img src={img} alt="menu item" title="menu-item" />
                  </div>

                  <div className="menu-text">
                    <span>
                      <h1>Chicken and chips</h1>

                      <p>₦ 3000</p>
                    </span>

                    <span>
                      <p>
                        Lorem ipsum is a dummy text generated as a placeholder
                        text
                      </p>

                      <p>garlic, vegetable, bread</p>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>{" "}
          <div className="menu-item-con">
            <div className="menu-items">
              <div className="menu-items-pad">
                <div className="menu">
                  <div className="menu-img">
                    <img src={img} alt="menu item" title="menu-item" />
                  </div>

                  <div className="menu-text">
                    <span>
                      <h1>Chicken and chips</h1>

                      <p>₦ 3000</p>
                    </span>

                    <span>
                      <p>Lorem ipsum is a dummy text</p>

                      <p>garlic, vegetable, bread</p>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrinksMenuItems;
