import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppStateContext } from "../../context";

const AdminSideNav = () => {
  const { authService } = useContext(AppStateContext);

  const { currentUser } = authService;

  return (
    <>
      <li className="items-center">
        <Link
          className={
            "text-xs uppercase py-3 font-bold block " +
            (window.location.href.indexOf("/dashboard") !== -1
              ? "text-blue-500 hover:text-blue-600"
              : "text-white hover:text-gray-600")
          }
          to="/dashboard"
        >
          <i
            className={
              "fas fa-tv mr-2 text-sm " +
              (window.location.href.indexOf("/dashboard") !== -1
                ? "opacity-75"
                : "text-gray-400")
            }
          ></i>{" "}
          Dashboard
        </Link>
      </li>

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

      {/* <li className="items-center">
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
      </li> */}

      {/* <li className="items-center">
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
      </li> */}

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
              "fas fa-book-open mr-2 text-sm " +
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
            (window.location.href.indexOf("/dashboard/attendance") !== -1
              ? "text-blue-500 hover:text-blue-600"
              : "text-white hover:text-gray-600")
          }
          to="/dashboard/attendance"
        >
          <i
            className={
              "fas fa-address-book mr-2 text-sm " +
              (window.location.href.indexOf("/dashboard/attendance") !== -1
                ? "opacity-75"
                : "text-gray-400")
            }
          ></i>{" "}
          Attendance
        </Link>
      </li>

      <li className="items-center">
        <Link
          className={
            "text-xs uppercase py-3 font-bold block " +
            (window.location.href.indexOf("/dashboard/swimming-ticket") !== -1
              ? "text-blue-500 hover:text-blue-600"
              : "text-white hover:text-gray-600")
          }
          to="/dashboard/swimming-ticket"
        >
          <i
            className={
              "fas fa-ticket-alt mr-2 text-sm " +
              (window.location.href.indexOf("/dashboard/swimming-ticket") !== -1
                ? "opacity-75"
                : "text-gray-400")
            }
          ></i>{" "}
          Swimming Ticket
        </Link>
      </li>

      {/* <li className="items-center">
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

      <li className="items-center">
        <Link
          className={
            "text-xs uppercase py-3 font-bold block " +
            (window.location.href.indexOf("/dashboard/subscribers") !== -1
              ? "text-blue-500 hover:text-blue-600"
              : "text-white hover:text-gray-600")
          }
          to="/dashboard/subscribers"
        >
          <i
            className={
              "fas fa-user-friends mr-2 text-sm " +
              (window.location.href.indexOf("/dashboard/subscribers") !== -1
                ? "opacity-75"
                : "text-gray-400")
            }
          ></i>{" "}
              Subscribers
            </Link>
      </li>*/}
      {/* <li className="items-center">
        <Link
          className={
            "text-xs uppercase py-3 font-bold block " +
            (window.location.href.indexOf("/dashboard/staff") !== -1
              ? "text-blue-500 hover:text-blue-600"
              : "text-white hover:text-gray-600")
          }
          to="/dashboard/staff"
        >
          <i
            className={
              "fas fa-user-tag mr-2 text-sm " +
              (window.location.href.indexOf("/dashboard/staff") !== -1
                ? "opacity-75"
                : "text-gray-400")
            }
          ></i>{" "}
              Staff
            </Link>
      </li> */}

      {/* Divider */}
      <hr className="my-4 md:min-w-full" />

      <li className="items-center">
        <Link
          className={
            "text-xs uppercase py-3 font-bold block " +
            (window.location.href.indexOf("/dashboard/stock") !== -1
              ? "text-blue-500 hover:text-blue-600"
              : "text-white hover:text-gray-600")
          }
          to="/dashboard/stock"
        >
          <i
            className={
              "fas fa-table mr-2 text-sm " +
              (window.location.href.indexOf("/dashboard/stock") !== -1
                ? "opacity-75"
                : "text-gray-400")
            }
          ></i>
          Stock
        </Link>
      </li>

      {currentUser.user_type === "admin" ? (
        <li className="items-center">
          <Link
            className={
              "text-xs uppercase py-3 font-bold block " +
              (window.location.href.indexOf("/dashboard/expenses") !== -1
                ? "text-blue-500 hover:text-blue-600"
                : "text-white hover:text-gray-600")
            }
            to="/dashboard/expenses"
          >
            <i
              className={
                "fas fa-comments-dollar mr-2 text-sm " +
                (window.location.href.indexOf("/dashboard/expenses") !== -1
                  ? "opacity-75"
                  : "text-gray-400")
              }
            ></i>
            Expenses
          </Link>
        </li>
      ) : (
        ""
      )}

      {currentUser.user_type === "admin" ? (
        <li className="items-center">
          <Link
            className={
              "text-xs uppercase py-3 font-bold block " +
              (window.location.href.indexOf("/dashboard/sales") !== -1
                ? "text-blue-500 hover:text-blue-600"
                : "text-white hover:text-gray-600")
            }
            to="/dashboard/sales"
          >
            <i
              className={
                "fas fa-balance-scale mr-2 text-sm " +
                (window.location.href.indexOf("/dashboard/sales") !== -1
                  ? "opacity-75"
                  : "text-gray-400")
              }
            ></i>
            Sales Report
          </Link>
        </li>
      ) : (
        ""
      )}
    </>
  );
};

export default AdminSideNav;
