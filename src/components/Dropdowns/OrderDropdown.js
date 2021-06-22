import React, { useState, createRef, useContext, useRef, useEffect } from "react";
import { createPopper } from "@popperjs/core";
import { Link } from "react-router-dom";
import apiService from "../../context/apiService";
import { AppStateContext } from "../../context";
import { useToasts } from 'react-toast-notifications'
import Jump from 'react-reveal/Jump';


const OrderDropdown = ({ id, refresh, orderStatus, deleted }) => {
  const node = useRef();

  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
  const btnDropdownRef = createRef();
  const popoverDropdownRef = createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "left-start",
    });
    setDropdownPopoverShow(true);
  };

  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  const { orderService, authService } = useContext(AppStateContext);
  const { currentUser } = authService;
  const { addToast } = useToasts()

  const toggleDropdown = (e) => {
    e.preventDefault();
    dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
  }

  const handleClick = e => {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    closeDropdownPopover()
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };

    // eslint-disable-next-line
  }, []);

  const deleteItem = async () => {
    try {
      await apiService.deleteOrder({ id });
      closeDropdownPopover();
      await orderService.deleteOrder(id);
      addToast("Order deleted successfully", {
        appearance: 'success',
        autoDismiss: true,
      })

      refresh(); // use this to refresh the Orders
    } catch (error) {
      const message = apiService.getErrorMessage(error);
      addToast(message, {
        appearance: 'error',
        autoDismiss: true,
      })
    }
  }

  const undeleteItem = async () => {
    // try {
    //   await apiService.deleteCustomer({ id });
    //   closeDropdownPopover();
    //   await customerService.deleteCustomer(id);
    //   addToast("Customer deleted successfully", {
    //     appearance: 'success',
    //     autoDismiss: true,
    //   })

    //   refresh(); // use this to refresh the customers
    // } catch (error) {
    //   const message = apiService.getErrorMessage(error);
    //   addToast(message, {
    //     appearance: 'error',
    //     autoDismiss: true,
    //   })
    // }
  }

  return (
    <div ref={node}>
      <a
        className="text-gray-600 py-1 px-3"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={toggleDropdown}
      >
        <button
          className="bg-blue-800 text-white active:bg-blue-600 custom-btn font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150 "
          type="button"
        >
          More
            </button>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        {
          deleted ? (
            <>
            <button
                onClick={undeleteItem}
                className={
                  "text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-red-500"
                }

              >
                <i className="fas fa-trash-alt mr-2"></i>
          Undo Delete
              </button>
            </>
          ) : (
            <>
              <Jump>
          <Link
            to={`/dashboard/orders/${id}`}
            className={
              "text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800 text-center"
            }

          >
            <i className="fas fa-edit mr-2"></i>
          Process Order
        </Link>
        </Jump>
        {
          orderStatus === "completed" &&
          <Jump>

            <Link
              to={`/dashboard/orders/print/${id}`}
              className={
                "text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800 text-center"
              }

            >
              <i className="fas fa-print mr-2"></i>
          Print Receipt
        </Link>
          </Jump>
        }

        {
          currentUser.role === 'superAdmin' && (
            <Jump>
              <button
                onClick={deleteItem}
                className={
                  "text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-red-500"
                }

              >
                <i className="fas fa-trash-alt mr-2"></i>
              Delete
            </button>
            </Jump>
          )
        }
            </>
          )
        }
        

      </div>
    </div>
  );
};

export default OrderDropdown;
