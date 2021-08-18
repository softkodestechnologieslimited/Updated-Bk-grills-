import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { AppStateContext } from "../../context";
import { useToasts } from "react-toast-notifications";

import UserDropdown from "../Dropdowns/UserDropdown.js";
import CartDropdown from "../Dropdowns/CartDropdown.js";
import AdminSideNav from "./AdminSideNav";
import StaffSideNav from "./StaffSideNav";

// import logo from "../../assets/img/logo.png";

import logo from '../../assets/img/logos/NewLogo.JPG'



const Sidebar = () => {
  const [collapseShow, setCollapseShow] = useState("hidden");

  const { authService, cartService } = useContext(AppStateContext);

  const { currentUser } = authService;

  const { addToast } = useToasts();

  const history = useHistory();

  const logout = () => {
    cartService.resetCart(); // resets the cart
    authService.logoutUser(); // log user out

    addToast("Logout successful", {
      appearance: "success",
      autoDismiss: true,
    });
    history.push("/login");
  };
  

  return (
    <>
      <nav className="md:left-0 md:block md:fixed fixed top-0 md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-no-wrap md:overflow-hidden shadow-xl bg-gray-800 flex flex-wrap items-center justify-between md:w-64 w-full z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-no-wrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-white opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-gray-900 m-2 py-3 px-6")}
          >
            <i className="fas fa-bars"></i>
          </button>

          {/* Brand */}
          {currentUser.user_type !== 'waiter' ? (<Link
            className="md:block text-left md:pb-2 text-white mr-0 inline-block whitespace-no-wrap text-sm uppercase font-bold p-0 px-0"
            to="/dashboard"
          >
            <img src={logo} style={{maxWidth: '98px', borderRadius: '50%'}} alt="" className='h-3 w-3 block mx-auto' />
          </Link>) : (<Link
            className="md:block text-left md:pb-2 text-white mr-0 inline-block whitespace-no-wrap text-sm uppercase font-bold p-4 px-0"
            to="/dashboard/cartmenu"
          >
            <img src={logo} style={{maxWidth: '98px', borderRadius: '50%'}} alt="" className='h-3 w-3 block mx-auto' />
          </Link>)}


          {/* User */}
          <ul className="md:hidden items-center flex flex-wrap list-none">
            <li className="inline-block relative">
              {currentUser.user_type !== "waiter" ? (
                <UserDropdown />
              ) : (
                <CartDropdown />
              )}
            </li>
          </ul>
          {/* Collapse */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-gray-300">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  {currentUser.user_type !== "waiter" ? (
                    <Link
                      className="md:block text-left md:pb-2 text-white mr-0 inline-block whitespace-no-wrap text-sm uppercase font-bold p-4 px-0"
                      to="/dashboard"
                    >
                      Chateau le roi
                    </Link>
                  ) : (
                    <Link
                      className="md:block text-left md:pb-2 text-white mr-0 inline-block whitespace-no-wrap text-sm uppercase font-bold p-4 px-0"
                      to="/dashboard/menu"
                    >
                      Chateau le roi
                    </Link>
                  )}
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-white opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Heading */}
            {/* <h6 className="md:min-w-full text-white text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              Welcome
            </h6> */}

            {/* Navigation */}
            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              {currentUser.user_type !== "waiter" ? (
                <AdminSideNav />
              ) : (
                <StaffSideNav />
              )}

              {currentUser.user_type === "superAdmin" && (
                <li className="items-center">
                  <Link
                    className={
                      "text-xs uppercase py-3 font-bold block " +
                      (window.location.href.indexOf("/dashboard/log") !== -1
                        ? "text-blue-500 hover:text-blue-600"
                        : "text-white hover:text-gray-600")
                    }
                    to="/dashboard/log"
                  >
                    <i
                      className={
                        "fas fa-clipboard-list mr-2 text-sm " +
                        (window.location.href.indexOf("/dashboard/log") !== -1
                          ? "opacity-75"
                          : "text-gray-400")
                      }
                    ></i>{" "}
                    Log
                  </Link>
                </li>
              )}

              {/* Divider */}
              <hr className="my-4 md:min-w-full" />
{/* 
              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/dashboard/profile") !== -1
                      ? "text-blue-500 hover:text-blue-600"
                      : "text-white hover:text-gray-600")
                  }
                  to="/dashboard/profile"
                >
                  <i
                    className={
                      "fas fa-user mr-2 text-sm " +
                      (window.location.href.indexOf("/dashboard/profile") !== -1
                        ? "opacity-75"
                        : "text-white")
                    }
                  ></i>{" "}
                  Profile
                </Link>
              </li> */}

              <li className="items-center">
                <button
                  className="text-xs uppercase py-3 font-bold block text-white hover:text-gray-600"
                  onClick={logout}
                >
                  <i className="fas fa-sign-out-alt mr-2 text-sm text-white"></i>{" "}
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
