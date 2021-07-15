import React, { useState, createRef, useRef, useEffect } from "react";
import { createPopper } from "@popperjs/core";
import { Link } from "react-router-dom";
import Jump from 'react-reveal/Jump';

const ModifyStaffDropdown = ({ openModal, setType }) => {
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
        className="text-gray-600 py-1 px-3"
        href="#!"
        ref={btnDropdownRef}
        onClick={toggleDropdown}
      >
        {/* <i className="fas fa-ellipsis-v"></i> */}
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
          "bg-white text-base z-50 text-center flex-col py-2 list-none rounded shadow-lg min-w-48"
        }
      >
        <Jump>

          <Link
            to="/dashboard/staff"
            className={
              "text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800"
            }

          >
            <i className="fas fa-arrow-alt-circle-left mr-4"></i>
          Back
        </Link>
          <button
            onClick={() => {
              setType('reset');
              openModal();
            }
            }
            className={
              "text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800"
            }

          >
            <i className="fas fa-user-cog mr-2"></i>
          Reset Password
        </button>
          <button
            onClick={() => {
              setType('delete');
              openModal();
            }
            }
            className={
              "text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-red-500"
            }

          >
            <i className="fas fa-trash-alt mr-2"></i>
          Delete
            </button>

        </Jump>
      </div>
    </div>
  );
};

export default ModifyStaffDropdown;
