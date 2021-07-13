import React from 'react';
import Fade from 'react-reveal/Fade';

import CheckoutCard from "../../components/Cards/CheckoutCard.js";
import AdminNavbar from "../../components/Navbars/AdminNavbar.js";
import Sidebar from "../../components/Sidebar/Sidebar.js";
import FooterAdmin from "../../components/Footers/FooterAdmin.js";

const Checkout = () => {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-gray-900">
        <AdminNavbar />
        <div className="relative px-4 md:px-10 mx-auto w-full h-90 md:pt-32 pt-12 md:mt-0 mt-24">
          <div className="flex flex-wrap mt-12">
            <div className="w-full mb-12 px-4">
              <Fade left>
                <CheckoutCard />
              </Fade>
            </div>
          </div>
        </div>
        <FooterAdmin />
      </div>
    </>
  )
}

export default Checkout
