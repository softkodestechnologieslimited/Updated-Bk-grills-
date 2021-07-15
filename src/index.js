import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter, useLocation, withRouter } from "react-router-dom";


import "./assets/styles/tailwind.css";
import "./assets/styles/custom.css";
import "./index.css";

function _ScrollToTop(props) {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return props.children;
}
const ScrollToTop = withRouter(_ScrollToTop);

ReactDOM.render(
  <BrowserRouter>
    <React.Fragment>
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </React.Fragment>
  </BrowserRouter>,
  document.getElementById("root")
);
