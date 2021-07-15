import React from 'react'
import Fade from 'react-reveal/Fade';

// components
import StaffDetailsCard from "../../components/Cards/StaffDetailsCard.js";
import AdminNavbar from "../../components/Navbars/AdminNavbar.js";
import Sidebar from "../../components/Sidebar/Sidebar.js";
import FooterAdmin from "../../components/Footers/FooterAdmin.js";

const EditStaff = () => {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-gray-900">
        <AdminNavbar />
        <div className="relative px-4 md:px-10 mx-auto w-full md:pt-32 pt-12">
          <div className="flex flex-wrap md:mt-4 mt-20">
            <div className="w-full mb-12 px-4">
              <Fade left>

                <StaffDetailsCard />
              </Fade>
            </div>
          </div>
        </div>
        <FooterAdmin />
      </div>
    </>
  )
}

export default EditStaff
