import React from "react";
import Footer from "../../components/Footers/Footer";
import Header from "../../components/Headers/Header";

import img1 from "../../assets/img/gallery-img (1).jpg";
import img2 from "../../assets/img/gallery-img (2).jpg";
import img3 from "../../assets/img/gallery-img (3).jpg";
import img4 from "../../assets/img/gallery-img (4).jpg";
import img5 from "../../assets/img/gallery-img (5).jpg";
import img6 from "../../assets/img/gallery-img (6).jpg";
import img7 from "../../assets/img/gallery-img (7).jpg";
import img8 from "../../assets/img/gallery-img (8).jpg";
import img9 from "../../assets/img/gallery-img (9).jpg";

import "./gallery.styles.scss";

const imagesArray = [img1, img2, img3, img7, img5, img6, img4, img8, img9]

const Gallery = () => {
  return (
    <>
      <div className="gallery-wrapper">
        <Header active="gallery" />
        <div className="container gallery-content">
          <div className="gallery-header">
            <h1>Gallery</h1>
          </div>

          <div className="gallery-images">
            {
              imagesArray.map((image, index)=>(
                <div className="img-wrapper" key={index}>
                  <figure className="post-image">
                    <img className="gallery-image" alt={`gallery pic${index+1}`} src={image} />
                  </figure>
                </div>
              ))
            }
            {/* <div className="img-wrapper">
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
            </div> */}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Gallery;
