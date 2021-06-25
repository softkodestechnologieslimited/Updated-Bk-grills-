import React from "react";
import Footer from "../../components/Footers/Footer";
import Header from "../../components/Headers/Header";

import img1 from "../../assets/img/gallery-img1.jpg";
import img2 from "../../assets/img/gallery-img2.jpg";
import img3 from "../../assets/img/gallery-img3.jpg";
import img4 from "../../assets/img/gallery-img4.jpg";
import img5 from "../../assets/img/gallery-img5.jpg";
import img6 from "../../assets/img/gallery-img6.jpg";
import img7 from "../../assets/img/gallery-img7.jpg";
import img8 from "../../assets/img/gallery-img8.jpg";
import img9 from "../../assets/img/gallery-img9.jpg";

import "./gallery.styles.scss";

const Gallery = () => {
  return (
    <>
      <div className="gallery-wrapper">
        <Header active="gallery" />
        <div className="container gallery-content">
          <div className="gallery-header">
            <h1>Gallery</h1>
          </div>

          <p className="gallery-text">
          The reason chateau has an edge over most places is that you don't only enjoy the luxury of eating and
             drinking because we also have a swimming pool where everyone can have a deep to
              take the impact of stress of your body.
          </p>

          <div className="gallery-images">
            <div className="img-wrapper">
              <figure className="post-image">
                <img className="gallery-image" alt="gallery pic" src={img1} />
              </figure>
            </div>
            <div className="img-wrapper">
              <figure className="post-image">
                <img className="gallery-image" alt="gallery pic" src={img2} />
              </figure>
            </div>
            <div className="img-wrapper">
              <figure className="post-image">
                <img className="gallery-image" alt="gallery pic" src={img3} />
              </figure>
            </div>
            <div className="img-wrapper">
              <figure className="post-image">
                <img className="gallery-image" alt="gallery pic" src={img7} />
              </figure>
            </div>
            <div className="img-wrapper">
              <figure className="post-image">
                <img className="gallery-image" alt="gallery pic" src={img5} />
              </figure>
            </div>
            <div className="img-wrapper">
              <figure className="post-image">
                <img className="gallery-image" alt="gallery pic" src={img6} />
              </figure>
            </div>
            <div className="img-wrapper">
              <figure className="post-image">
                <img className="gallery-image" alt="gallery pic" src={img4} />
              </figure>
            </div>
            <div className="img-wrapper">
              <figure className="post-image">
                <img className="gallery-image" alt="gallery pic" src={img8} />
              </figure>
            </div>
            <div className="img-wrapper">
              <figure className="post-image">
                <img className="gallery-image" alt="gallery pic" src={img9} />
              </figure>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Gallery;
