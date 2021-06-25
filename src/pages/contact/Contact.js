import React from "react";
import Footer from "../../components/Footers/Footer";
import Header from "../../components/Headers/Header";

import "./contact.styles.scss";

const Contact = () => {
  return (
    <>
      <Header active="contact" />
      <section className="contact-page-wrapper">
        <div className="container">
          <div className="contact-bg-overlay">
            <div className="contact-form-wrapper">
              <h2>Contact Us</h2>
              {/* <p>
                Do you have any questions? Do not hesitate to contact us, and we
                will try to accommodate you.
              </p> */}
              <form className="contact-form">
                <div className="form-group group-a">
                  <div className="form-group-item">
                    <label htmlFor="fy_name">
                      {" "}
                      Name{" "}
                      <abbr title="Required" className="fy-required a-required">
                        *
                      </abbr>
                    </label>

                    <input
                      type="text"
                      name="name"
                      className="contact-input"
                      placeholder="Name ..."
                    ></input>
                  </div>
                  <div className="form-group-item">
                    <label htmlFor="name">
                      {" "}
                      Email{" "}
                      <abbr title="Required" className="fy-required a-required">
                        *
                      </abbr>
                    </label>

                    <input
                      type="email"
                      name="email"
                      className="contact-input"
                      placeholder="Email ..."
                    ></input>
                  </div>
                  <div className="form-group-item">
                    <label htmlFor="fy_name">
                      {" "}
                      Phone{" "}
                      <abbr title="Required" className="fy-required a-required">
                        *
                      </abbr>
                    </label>

                    <input
                      type="text"
                      name="phone"
                      className="contact-input"
                      placeholder="Phone ..."
                    ></input>
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
                    ></textarea>
                  </div>
                </div>

                <div className="btn-wrapper">
                  <button
                    className="form-btn"
                    type="submit"
                    style={{ transition: "all .15s ease" }}
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>

            <div className="contact-map">
              <h3>Chateau le roi</h3>
              <p>No. 8 Abaka St, end off lucky london street, osubi/ugolo. okpe L.G.A Delta State.</p>

              <div>Map will be here!</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Contact;
