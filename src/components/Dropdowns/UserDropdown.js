import React, { useState, createRef, useContext, useRef, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { createPopper } from "@popperjs/core";
import { AppStateContext } from "../../context";
import { useToasts } from 'react-toast-notifications'

import userImg from "../../assets/img/team-1-800x800.jpg";


const UserDropdown = () => {
  const node = useRef();

  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
  const btnDropdownRef = createRef();
  const popoverDropdownRef = createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  const { authService, cartService } = useContext(AppStateContext)
  const history = useHistory();
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


  const logout = () => {
    cartService.resetCart(); // resets the cart
    authService.logoutUser(); // log user out
    addToast("Logout successful", {
      appearance: 'success',
      autoDismiss: true,
    })
    history.push('/login');
  }

  return (
    <div ref={node}>
      <a
        className="text-gray-600 block mr-4"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={toggleDropdown}
      >
        <div className="items-center flex">
          <span className="w-12 h-12 text-sm text-white bg-gray-300 inline-flex items-center justify-center rounded-full">
            <img
              alt="..."
              className="w-full rounded-full align-middle border-none shadow-lg"
              src={userImg}
            />
          </span>
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <Link
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800"
          }
          to="/dashboard/profile"
        >
          Profile
        </Link>
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800"
          }
          onClick={logout}
        >
          Logout
        </a>

      </div>
    </div>
  );
};

export default UserDropdown;
