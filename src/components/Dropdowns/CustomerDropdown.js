import React, { useState, createRef, useContext, useRef, useEffect } from "react";
import { createPopper } from "@popperjs/core";
import { Link } from "react-router-dom";
import apiService from "../../context/apiService";
import { AppStateContext } from "../../context";
import { useToasts } from 'react-toast-notifications'
import Jump from 'react-reveal/Jump';

const CustomerDropdown = ({ id, refresh }) => {
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

  const { customerService, authService } = useContext(AppStateContext);
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
      await apiService.deleteCustomer({ id });
      closeDropdownPopover();
      await customerService.deleteCustomer(id);
      addToast("Customer deleted successfully", {
        appearance: 'success',
        autoDismiss: true,
      })

      refresh(); // use this to refresh the customers
    } catch (error) {
      const message = apiService.getErrorMessage(error);
      addToast(message, {
        appearance: 'error',
        autoDismiss: true,
      })
    }
  }


  return (
    <div ref={node}>
      <a
        className="text-gray-600 py-1 px-3"
        href="#!"
        ref={btnDropdownRef}
        onClick={toggleDropdown}
      >
        <i className="fas fa-ellipsis-v"></i>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 text-center flex-col py-2 list-none rounded shadow-lg min-w-48"
        }
      >
        <Jump>
          <Link
            to={`/dashboard/customers/${id}`}
            className={
              "text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800"
            }

          >
            <i className="fas fa-edit mr-4"></i>
          Edit
        </Link>
        </Jump>
        {
          currentUser.role !== 'waiter' && (
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
      </div>
    </div>
  );
};

export default CustomerDropdown;
