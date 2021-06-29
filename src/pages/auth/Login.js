import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import apiService from "../../context/apiService";
import { AppStateContext } from "../../context";
import { useToasts } from 'react-toast-notifications'

// components
import FullScreenLoader from "../../components/fullScreenLoader";

import logo from "../../assets/img/logo.png";
import "./login.styles.scss";


const Login = () => {
  const { authService } = useContext(AppStateContext);

  const emptyCredentials = {
    email: "",
    password: ""
  }

  const [userCredentials, setCredentials] = useState(emptyCredentials);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const history = useHistory();
  const { addToast } = useToasts()


  const { email, password } = userCredentials;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!email || !password) return; // further validations can be done on the input 
      setIsLoading(true);
      const response = await apiService.login({ email, password });
      const { data } = response.data;
      authService.loginUser(data); // save user to the app state and to session storage using the authservice
      addToast('Login Successful', { appearance: 'success', autoDismiss: true, });

      if (data.role !== 'waiter') {
        history.push('/dashboard'); // Redirect to dashboard on successful login
      } else {
        history.push('/dashboard/cartmenu')
      }

    } catch (error) {
      const message = apiService.getErrorMessage(error); // the getErrorMessage is a helper function to get the exact messages from the server
      setError(message)
      addToast(message, { appearance: 'error', autoDismiss: true, });
      setIsLoading(false);
      setTimeout(() => {
        setError('')
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
      <form className="form-container">
        <div className="form-content">
          <img src={logo} alt="logo" className="form-logo mx-auto" />
          <p>Log in to your account to continue.</p>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-item">
              <label htmlFor="grid-password">Email</label>
              <i className="fas fa-user"></i>
              <input
                type="email"
                name="email"
                placeholder="e.g John@gmail.com"
                value={email}
                onChange={handleChange}
                required
                style={{ transition: "all .15s ease" }}
              />
            </div>

            <div className="form-item">
              <label htmlFor="grid-password">Password</label>
              <i className="fas fa-lock"></i>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={handleChange}
                required
                style={{ transition: "all .15s ease" }}
              />
            </div>

            <small className="text-red-500 font-bold">
              {error}
            </small>

            <div className="btn-wrapper">
              <button
                className="login-btn"
                type="submit"
                style={{ transition: "all .15s ease" }}
              >
                Login
            </button>
            </div>

            <div className="login-footer">
              <div className="footer-text">Not an admin?</div>
              <div className="footer-text">
                <Link to="/">Go back to homepage</Link>
              </div>
            </div>

          </form>

        </div>
      </form>
    </>
  );
};

export default Login;
