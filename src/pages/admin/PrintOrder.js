import React from 'react'
import Fade from 'react-reveal/Fade';

// components
import ReceiptCard from "../../components/Cards/ReceiptCard.js";
import AdminNavbar from "../.././components/Navbars/AdminNavbar.js";
import Sidebar from "../../components/Sidebar/Sidebar.js";
import FooterAdmin from "../.././components/Footers/FooterAdmin";

const PrintOrder = () => {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-gray-900">
        <AdminNavbar />
        <div className="relative px-4 md:px-10 mx-auto w-full md:pt-32 pt-12 md:mt-0 mt-24">
          <div className="flex flex-wrap mt-4">
            <div className="w-full mb-12 px-4">
              <Fade left>

                <ReceiptCard />
              </Fade>
            </div>
          </div>
        </div>
        <FooterAdmin />
      </div>
    </>
  )
}

export default PrintOrder
