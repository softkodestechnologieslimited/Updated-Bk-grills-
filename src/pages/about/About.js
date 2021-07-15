import React from "react";
import Footer from "../../components/Footers/Footer";
import Header from "../../components/Headers/Header";

import "./about.styles.scss";
import aboutplaceholder from '../../assets/img/about-us.jpg'

const About = () => {
  return (
    <div>
      <Header active="about" />
      <section className="about-wrapper">
        <div className="container about-us">
          <div className="about-image">
            <img
              src={aboutplaceholder}
              alt="About Us"
              className="about-img"
            />
          </div>
          <div className="about-content">
            <h1>Who we are</h1>
            <p>
              Chateau le roi gotten from a French word which means "Castle" and
              "le roi" also a French word meaning "the king" is indeed a king's
              castle for all kinds of customers ranging from kids, to young
              adults and families. The goal of chateau le roi is to provide high
              quality, healthy food at an affordable price. We pledge to provide
              seating areas that are neat with a location where the ambience is
              pleasing to the senses overall. Customers can be sure that food
              will be good and service, friendly and fast.
              <br /> <br />
              At chateau le roi we also care about the kids, developing their
              social and cognitive skills with games like playstation 5 and
              adults also have immense benefits from participating in games like
              snooker, chess, scrabble and more. All available at our game
              house.
            </p>
            <h2>What we do</h2>
            <p>
              We serve a wide variety of food from chicken and chips , to fried
              jollof rice, chicken sauce, goat meat sauce, snail sauce, special
              noodles, and more. Also we have beverages of all kinds.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
