// import React, { useContext } from "react";
// import { AppStateContext } from "../../context";
import React from "react"

// components
import UserDropdown from "../Dropdowns/UserDropdown.js";
import CartDropdown from "../Dropdowns/CartDropdown.js";

const AdminNavbar = () => {
  // const { authService } = useContext(AppStateContext)

  // const { currentUser } = authService;


  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-no-wrap md:justify-start flex items-center p-4">
        <div className="w-full mx-auto items-center flex justify-end md:flex-no-wrap flex-wrap md:px-10 px-4">
          {/* Brand */}
          {/* <a
          className="text-white text-sm uppercase hidden lg:inline-block font-semibold"
          href="#pablo"
          onClick={(e) => e.preventDefault()}
        >
          Dashboard
        </a> */}


          {/* User */}
          <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
            <div className='text-white mr-4 font-bold text-base text-capitalize'>
              Hello Admin
              {/* Hello {currentUser.name.split(' ')[0]} */}
            </div>
            <UserDropdown />
           
     <CartDropdown />
          </ul>
        </div>
      </nav>
      {/* End Navbar */}
    </>
  )
}

export default AdminNavbar

