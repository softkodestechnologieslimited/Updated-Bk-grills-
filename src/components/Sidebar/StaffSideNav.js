import React from 'react'
import { Link } from "react-router-dom";


const StaffSideNav = () => {
  return (
    <>
      {/* <li className="items-center">
        <Link
          className={
            "text-xs uppercase py-3 font-bold block " +
            (window.location.href.indexOf("/dashboard/menu") !== -1
              ? "text-blue-500 hover:text-blue-600"
              : "text-white hover:text-gray-600")
          }
          to="/dashboard/menu"
        >
          <i
            className={
              "fas fa-utensils mr-2 text-sm " +
              (window.location.href.indexOf("/dashboard/menu") !== -1
                ? "opacity-75"
                : "text-gray-400")
            }
          ></i>{" "}
              Menu
            </Link>
      </li> */}

      <li className="items-center">
        <Link
          className={
            "text-xs uppercase py-3 font-bold block " +
            (window.location.href.indexOf("/dashboard/cartmenu") !== -1
              ? "text-blue-500 hover:text-blue-600"
              : "text-white hover:text-gray-600")
          }
          to="/dashboard/cartmenu"
        >
          <i
            className={
              "fas fa-cart-plus mr-2 text-sm " +
              (window.location.href.indexOf("/dashboard/cartmenu") !== -1
                ? "opacity-75"
                : "text-gray-400")
            }
          ></i>{" "}
              Cart Menu
            </Link>
      </li>

      <li className="items-center">
        <Link
          className={
            "text-xs uppercase py-3 font-bold block " +
            (window.location.href.indexOf("/dashboard/orders") !== -1
              ? "text-blue-500 hover:text-blue-600"
              : "text-white hover:text-gray-600")
          }
          to="/dashboard/orders"
        >
          <i
            className={
              "fas fa-table mr-2 text-sm " +
              (window.location.href.indexOf("/dashboard/orders") !== -1
                ? "opacity-75"
                : "text-gray-400")
            }
          ></i>{" "}
              Orders
            </Link>
      </li>

      <li className="items-center">
        <Link
          className={
            "text-xs uppercase py-3 font-bold block " +
            (window.location.href.indexOf("/dashboard/customers") !== -1
              ? "text-blue-500 hover:text-blue-600"
              : "text-white hover:text-gray-600")
          }
          to="/dashboard/customers"
        >
          <i
            className={
              "fas fa-user-friends mr-2 text-sm " +
              (window.location.href.indexOf("/dashboard/customers") !== -1
                ? "opacity-75"
                : "text-gray-400")
            }
          ></i>{" "}
              Customers
            </Link>
      </li>
    </>
  )
}

export default StaffSideNav
