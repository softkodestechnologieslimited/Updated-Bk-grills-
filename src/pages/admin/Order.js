import React from 'react'

// components
import OrderCard from "../../components/Cards/OrderCard.js";
import AdminNavbar from "../.././components/Navbars/AdminNavbar.js";
import Sidebar from "../../components/Sidebar/Sidebar.js";
import FooterAdmin from "../.././components/Footers/FooterAdmin";

const Order = () => {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-gray-900">
        <AdminNavbar />
        <div className="relative px-4 md:px-10 mx-auto w-full md:pt-32 pt-12 md:mt-0 mt-24">
          <div className="flex flex-wrap mt-4">
            <div className="w-full mb-12 px-4">
              <OrderCard />
            </div>
          </div>
        </div>
        <FooterAdmin />
      </div>
    </>
  )
}

export default Order
