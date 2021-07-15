import React from "react";

import "./subscribe.styles.scss";

const Subscribe = () => {
  return (
    <div className="sub-wrapper">
      <form>
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

        <div className="btn input form-actions">
          <input type="text" required placeholder="Your email address"></input>

          <button>subscribe</button>
        </div>
      </form>
    </div>
  );
};

export default Subscribe;
