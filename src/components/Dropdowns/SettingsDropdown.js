import React, { useState, createRef, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPopper } from "@popperjs/core";
import Jump from 'react-reveal/Jump';

const SettingsDropdown = () => {
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

  return (
    <div ref={node}>
      <a
        className="text-gray-600 block"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={toggleDropdown}
      // onBlur={toggleDropdown}
      >
        <div className="items-center flex">
          <button
            className="bg-blue-800 text-white active:bg-blue-600 custom-btn font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
            type="button"
          >
            Settings
            </button>
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <Jump>
          <Link
            href="#pablo"
            className={
              "text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800"
            }
            to="/dashboard/editprofile"
          >
            <i className="fas fa-edit mr-4"></i>
          Edit Profile
        </Link>
          {/* <Link
            href="#pablo"
            className={
              "text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800"
            }
            to="/dashboard/password"
          >
            <i className="fas fa-edit mr-4"></i>
          Change Password
        </Link> */}
        </Jump>
      </div>
    </div>
  );
};

export default SettingsDropdown;
