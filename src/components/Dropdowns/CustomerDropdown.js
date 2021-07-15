import React, { useState, createRef, useContext, useRef, useEffect } from "react";
import { createPopper } from "@popperjs/core";
import { Link } from "react-router-dom";
import apiService from "../../context/apiService";
import { AppStateContext } from "../../context";
import { useToasts } from 'react-toast-notifications'
import Jump from 'react-reveal/Jump';

<<<<<<< HEAD
const CustomerDropdown = ({ id, refresh, deleted }) => {
=======
const CustomerDropdown = ({ id, refresh }) => {
>>>>>>> 24b52f90c601d2036fd49e3f6c8671e0b2458928
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
<<<<<<< HEAD
 
  const undeleteItem = async () => {
    try {
      await apiService.unDeleteItem({ id, type: "customer" });
      closeDropdownPopover();
      await customerService.undeleteCustomer(id);
      addToast("Customer undeleted successfully", {
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
=======
>>>>>>> 24b52f90c601d2036fd49e3f6c8671e0b2458928


  return (
    <div ref={node}>
      <a
        className="text-gray-600 py-1 px-3"
        href="#!"
        ref={btnDropdownRef}
        onClick={toggleDropdown}
      >
<<<<<<< HEAD
        {/* <i className="fas fa-ellipsis-v"></i> */}
            <button
          className="bg-blue-800 text-white active:bg-blue-600 custom-btn font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150 "
          type="button"
        >
          More
            </button>
=======
        <i className="fas fa-ellipsis-v"></i>
>>>>>>> 24b52f90c601d2036fd49e3f6c8671e0b2458928
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 text-center flex-col py-2 list-none rounded shadow-lg min-w-48"
        }
      >
<<<<<<< HEAD
        {
          deleted ? (
            <>
              {
          currentUser.role !== 'waiter' && (
            <Jump>
              <button
                onClick={undeleteItem}
                className={
                  "text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-red-500"
                }

              >
                <i className="fas fa-trash-alt mr-2"></i>
          Undo Delete
              </button>
            </Jump>
          )
        }
            </>
          ) : (
            <>
               <Jump>
=======
        <Jump>
>>>>>>> 24b52f90c601d2036fd49e3f6c8671e0b2458928
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
<<<<<<< HEAD
            </>
          )
        }
       
=======
>>>>>>> 24b52f90c601d2036fd49e3f6c8671e0b2458928
      </div>
    </div>
  );
};

export default CustomerDropdown;
