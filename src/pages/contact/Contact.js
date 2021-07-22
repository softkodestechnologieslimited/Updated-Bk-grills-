import React,  {useState} from "react";
// import {Link} from 'react-router-dom'
import Footer from "../../components/Footers/Footer";
import Header from "../../components/Headers/Header";
import Button from "../../components/Button"
import Input from '../../components/Input'

// import Contactmap from "../../components/Contactmap"

import GoogleMapReact from "google-map-react";

import "./contact.styles.scss";

const Contact = () => {

  const [inputValue, setInputValue] = useState('')

  const Contactmap = ({ text }) => <p>{text}</p>;

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('submitted contact');
  }

  const handleChange = (e) => {
    setInputValue(e.target.value)
    console.log(inputValue);
  }

  return (
    <>
      <Header active="contact" />
      <div className="contact-page-wrapper">
        <h2 className="contact-text">CONTACT</h2>

        <div className="contact-map">
          <h3>Chateau le roi</h3>
          <p>
            No. 8 Abaka St, end off lucky london street, osubi/ugolo. okpe L.G.A
            Delta State.
          </p>
          <div className="map">

         <GoogleMapReact>
         <Contactmap text="MAP"></Contactmap>
         </GoogleMapReact>
          </div>
          <p>
            Do you have any questions? Do not hesitate to contact us, and we
            will try to accommodate you.
          </p>
        </div>

        <div className="contact-bg-overlay">
          <div className="contact-form-wrapper">
            <h2>Contact Us</h2>
            {/* <p>
                Do you have any questions? Do not hesitate to contact us, and we
                will try to accommodate you.
              </p> */}
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group group-a">
                <div className="form-group-item">
                  <label htmlFor="fy_name">
                    {" "}
                    Name{" "}
                    <abbr title="Required" className="fy-required a-required">
                      *
                    </abbr>
                  </label>

                  <Input
                    type="text"
                    name="name"
                    className="contact-input"
                    placeholder="Name ..."
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group-item">
                  <label htmlFor="name">
                    {" "}
                    Email{" "}
                    <abbr title="Required" className="fy-required a-required">
                      *
                    </abbr>
                  </label>

                  <Input
                    type="email"
                    name="email"
                    className="contact-input"
                    placeholder="Email ..."
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group-item">
                  <label htmlFor="fy_name">
                    {" "}
                    Phone{" "}
                    <abbr title="Required" className="fy-required a-required">
                      *
                    </abbr>
                  </label>

                  <Input
                    type="text"
                    name="phone"
                    className="contact-input"
                    placeholder="Phone ..."
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-group group-b">
                <div className="form-group-item">
                  <label htmlFor="fy_name">
                    {" "}
                    Message{" "}
                    <abbr title="Required" className="fy-required a-required">
                      *
                    </abbr>
                  </label>
                  <textarea
                    name="message"
                    className="contact-textarea"
                    placeholder="Message ..."
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>

              <div className="btn-wrapper">
                <Button
                  className="btn-bordered form-btn"
                  type="submit"
                  style={{ transition: "all .15s ease" }}
                >
                  Send
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
      
    </>
  );
};

export default Contact;
