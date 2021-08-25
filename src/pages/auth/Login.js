import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import apiService from "../../context/apiService";
import { AppStateContext } from "../../context";
import { useToasts } from "react-toast-notifications";
import Button from "../../components/Button";
import Input from "../../components/Input";
// import { StorageKeys } from '../../constants'

// components
import FullScreenLoader from "../../components/fullScreenLoader";

import logo from "../../assets/img/logo.png";
import "./login.styles.scss";

const Login = () => {
  const { authService } = useContext(AppStateContext);

  const emptyCredentials = {
    email: "",
    password: "",
  };
  
  // const savedToken = sessionStorage.getItem(StorageKeys.TOKEN);

  const [userCredentials, setCredentials] = useState(emptyCredentials);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const history = useHistory();
  const { addToast } = useToasts();

  const { email, password } = userCredentials;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!email || !password) return; // further validations can be done on the input
      setIsLoading(true);
      const response = await apiService.login({ email, password });
      // const { data } = response.data;
      authService.loginUser(response.data); // save user token to the app state and to session storage using the authservice
      // authService.saveUsertype(response)
      addToast("Login Successful", {
        appearance: "success",
        autoDismiss: true,
      });

      if (response.status === 200 ) {
        const response = await apiService.getUserDetails()
        authService.getUserData(response.data)
         console.log(response.data);
       }
      // console.log(response.data);

      // if (data.role !== "waiter") {
      //   history.push("/dashboard"); // Redirect to dashboard on successful login
      // } else {
      //   history.push("/dashboard/cartmenu");
      // }
      // if (response.status === 200) {
        history.push("/dashboard")
      // }
    } catch (error) {
      const message = apiService.getErrorMessage(error); // the getErrorMessage is a helper function to get the exact messages from the server
      setError(message);
      addToast(message, { appearance: "error", autoDismiss: true });
      setIsLoading(false);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;

    setCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <>
      {isLoading ? <FullScreenLoader /> : <></>}
      <div className="form-container">
        <div className="form-content">
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-logo">
              <img src={logo} alt="logo" className="logo mx-auto" />
              <p>Log in to your account to continue.</p>
            </div>

            <div className="form-item">
              <label htmlFor="grid-password">Email</label>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-user"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <Input
                type="email"
                name="email"
                placeholder="e.g John@gmail.com"
                value={email}
                onChange={handleChange}
                required
                // style={{ transition: "all .15s ease" }}
              />
            </div>

            <div className="form-item">
              <label htmlFor="grid-password">Password</label>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-lock"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>{" "}
              <Input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={handleChange}
                // style={{ transition: "all .15s ease" }}
              />
            </div>

            <small className="text-red-500 font-bold">{error}</small>

            <div className="btn-wrapper">
              <Button className="btn login-btn" type="submit">
                Login
              </Button>
            </div>

            <div className="login-footer">
              <div className="footer-text">Not an admin?</div>
              <div className="footer-text">
                <Link to="/">Go back to homepage</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
