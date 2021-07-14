import React, { useState, useEffect } from "react";
import Footer from "../../components/Footers/Footer";
import Header from "../../components/Headers/Header";

import { Gallery, PhotoSwipe } from "react-pswp";

// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";

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
import "react-pswp/dist/index.css";

const GalleryPage = () => {
  const [index, setIndex] = useState(null);
  const [open, setOpen] = useState(false);

  const images = [
    { image: img1 },
    { image: img2 },
    { image: img3 },
    { image: img4 },
    { image: img5 },
    { image: img6 },
    { image: img7 },
    { image: img8 },
    { image: img9 },
  ];

  const container = images.map((img, i) => ({
    uid: i,
    src: img["image"],
    msrc: img["image"],
    w: 1000,
    h: 1000,
    title: "gallery image",
  }));

  // const container = images.map((e => e.index) {
  //   uid
  // })

  useEffect(() => {
    if (!open && index !== null) setOpen(true);
    // eslint-disable-next-line
  }, [index]);

  return (
    <div className="gallery-body">
      <div className="gallery-wrapper">
        <Header active="gallery" />
        <div className="gallery-content">
          <div className="gallery-header">
            <h1>Gallery</h1>
          </div>

          <p className="gallery-text">
            The reason chateau has an edge over most places is that you don't
            only enjoy the luxury of eating and drinking because we also have a
            swimming pool where everyone can have a deep to take the impact of
            stress of your body.
          </p>
        </div>
      </div>

      <div className="center-images">
        <Gallery
          container={container}
          onClick={setIndex}
          wrapperClass="gallery-images"
          itemClass="img-wrapper"
          imgClass="gallery-image"
        />
      </div>

      <PhotoSwipe
        container={container}
        onIndexChange={setIndex}
        onOpenChange={setOpen}
        index={index}
        open={open}
        theme={{
          // foreground: "#1A202C",
          background: "#262328",
        }}
      />
      {/* <div className="gallery-images">
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
        </div> */}

      {/* <div className="gallery-images-wrapper">
        <div className="gallery-images">
          <Carousel
            autoPlay
            infiniteLoop
            interval={3000}
            transitionTime={2000}
            showStatus={false}
            emulateTouch
            showIndicators={false}
            showThumbs={false}
            dynamicHeight={true}
            centerMode={true}
            showArrows={false}
          >
            <div className="img-wrapper ">
              <figure className="post-image">
                <img className="gallery-image" alt="gallery pic" src={img1} />
              </figure>
            </div>
            <div className="img-wrapper img-wrapper-pad">
              <figure className="post-image">
                <img className="gallery-image" alt="gallery pic" src={img2} />
              </figure>
            </div>
            <div className="img-wrapper img-wrapper-pad">
              <figure className="post-image">
                <img className="gallery-image" alt="gallery pic" src={img3} />
              </figure>
            </div>
          </Carousel>
        </div>

        <div className="gallery-images">
          <Carousel
            autoPlay
            infiniteLoop
            interval={3500}
            transitionTime={2500}
            showStatus={false}
            emulateTouch
            showIndicators={false}
            showThumbs={false}
            dynamicHeight={true}
            centerMode={true}
            showArrows={false}
          >
            <div className="img-wrapper">
              <figure className="post-image">
                <img className="gallery-image" alt="gallery pic" src={img7} />
              </figure>
            </div>
            <div className="img-wrapper img-wrapper-pad">
              <figure className="post-image">
                <img className="gallery-image" alt="gallery pic" src={img5} />
              </figure>
            </div>
            <div className="img-wrapper img-wrapper-pad">
              <figure className="post-image">
                <img className="gallery-image" alt="gallery pic" src={img6} />
              </figure>
            </div>
          </Carousel>
        </div>

        <div className="gallery-images">
          <Carousel
            autoPlay
            infiniteLoop
            interval={4000}
            transitionTime={3000}
            showStatus={false}
            emulateTouch
            showIndicators={false}
            showThumbs={false}
            dynamicHeight={true}
            centerMode={true}
            showArrows={false}
          >
            
              <div className="img-wrapper">
                <figure className="post-image">
                  <img className="gallery-image" alt="gallery pic" src={img4} />
                </figure>
              </div>
              <div className="img-wrapper img-wrapper-pad">
                <figure className="post-image">
                  <img className="gallery-image" alt="gallery pic" src={img8} />
                </figure>
              </div>
              <div className="img-wrapper img-wrapper-pad">
                <figure className="post-image">
                  <img className="gallery-image" alt="gallery pic" src={img9} />
                </figure>
              </div>
          </Carousel>
        </div>
      </div> */}

      <Footer />
    </div>
  );
};

export default GalleryPage;
