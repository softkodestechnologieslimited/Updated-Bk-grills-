import React, { CSSProperties } from "react";
import HomepageCards from "../../components/Cards/HomepageCards";
import Subscribe from "../../components/Cards/Subscribe";
import Button from "../../components/Button";

// import Search from "../../components/search/Search";
// import MenuItem from "../../components/MenuItem/MenuItem";
import { Link } from "react-router-dom";

import Footer from "../../components/Footers/Footer";
import Header from "../../components/Headers/Header";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import "./homepage.styles.scss";

const Homepage = () => {
  const arrowStyles: CSSProperties = {
    position: "absolute",
    zIndex: 2,
    top: "calc(50% - 15px)",
    width: 30,
    height: 30,
    cursor: "pointer",
    transition: "all 1s ease",
  };

  // const [hover, setHover] = useState(false)

  // const toggleHover = () => {
  //   this.setState({hover: !this.state.hover})
  //   console.log('working')
  // }
  // const [stylehover, setHover ] = useState(false)

  return (
    <>
      <Header active="home" />
      <div className="header-wrapper">
        <Carousel
          autoPlay
          infiniteLoop
          interval={2800}
          transitionTime={600}
          showStatus={false}
          emulateTouch
          showIndicators={false}
          showThumbs={false}
          dynamicHeight={true}
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
          <div className="header-content header-background-one">
            <div className="header-text">
              <h1>The Best Quality and Tasty Food </h1>
              <p>
                At Chateau le roi we provide an exquisite and healthy <br />{" "}
                dining experience with for customers of all ages at affordable
                prices.
              </p>

              <Link to="/menu">
                <Button className="btn-bordered btn-underline">
                  view more
                </Button>
              </Link>
            </div>
          </div>

          <div className="header-content header-background-two">
            <div className="header-text">
              <h1>The Best Quality and Tasty Food </h1>
              <p>
                At Chateau le roi we provide an exquisite and healthy <br />{" "}
                dining experience with for customers of all ages at affordable
                prices.
              </p>
              <Link to="/menu">
                <Button className="btn-bordered btn-underline">
                  {" "}
                  view more
                </Button>
              </Link>{" "}
            </div>
          </div>

          <div className="header-content header-background-three">
            <div className="header-text">
              <h1>The Best Quality and Tasty Food </h1>
              <p>
                At Chateau le roi we provide an exquisite and healthy <br />{" "}
                dining experience with for customers of all ages at affordable
                prices.
              </p>
              <Link to="/menu">
                <Button className="btn-bordered btn-underline">
                  {" "}
                  view more
                </Button>
              </Link>
            </div>
          </div>
        </Carousel>
        {/* <Search /> */}
      </div>

      <HomepageCards />

      <Subscribe />

      <Footer />
    </>
  );
};

export default Homepage;
