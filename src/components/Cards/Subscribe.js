import React, { useState, useEffect } from "react";
import apiService from "../../context/apiService";
import { useToasts } from "react-toast-notifications";
import Button from "../Button";
import Input from "../../components/Input";
import "./subscribe.styles.scss";

const Subscribe = () => {
  const {addToast} = useToasts();
  const [inputValue, setInputValue] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      if (!inputValue) {
        addToast("Please enter a valid email address", {
          appearance: "error",
          autoDismiss: true,
        });
        return;
      }
      const response = apiService.addSubscriber(inputValue)
      console.log(response.data);
      addToast("Subscribed", {
        appearance: 'success',
        autoDismiss: true,
      })
      setInputValue('')

    } catch (error) {
      console.log(error);
      const message = apiService.getErrorMessage(error);
      addToast(message, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };
  useEffect(() => {
    setInputValue(inputValue);
  }, [inputValue]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setInputValue({ ...inputValue, [name]: value });
    // console.log(inputValue);
  };

  return (
    <div className="sub-wrapper">
      <div className="form-wrapper">
        <span>
          <svg
            class="icon"
            fill="#1E1E2A"
            width="24"
            height="24"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              class="addshape"
              d="M21,4H3C2.4,4,2,4.4,2,5v14c0,0.6,0.4,1,1,1h18c0.6,0,1-0.4,1-1
 V5C22,4.4,21.6,4,21,4z M18.7,6L12,12.7L5.3,6H18.7z M20,18H4V7.6l7.3,7.3c0.4,0.4,1,0.4,1.4,0L20,7.6V18z"
            ></path>
          </svg>
        </span>

        <div className="sub-text">
          <h3>subscribe</h3>

          <p>
            Subscribe to our newsletter to get the latest scoop right to your
            inbox.
          </p>

          <i>No spam, ever. That's a promise.</i>
        </div>

        <form onSubmit={handleSubmit} className="form-actions">
          <Input
            type="email"
            name="email"
            value={inputValue}
            placeholder="Your email address"
            onChange={handleChange}
          ></Input>

          <Button className="btn-bordered">subscribe</Button>
        </form>
      </div>
    </div>
  );
};

export default Subscribe;
