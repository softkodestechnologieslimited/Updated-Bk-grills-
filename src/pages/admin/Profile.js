import React from 'react'

// components
import ProfileCard from "../../components/Cards/ProfileCard.js";
import AdminNavbar from "../../components/Navbars/AdminNavbar.js";
import Sidebar from "../../components/Sidebar/Sidebar.js";
import FooterAdmin from "../../components/Footers/FooterAdmin.js";


const Profile = () => {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-gray-900">
        <AdminNavbar />
        <div className="relative px-4 md:px-10 mx-auto w-full min-h-screen md:pt-32 pt-12 md:mt-0 mt-24">
          <div className="flex flex-wrap mt-12">
            <div className="lg:w-8/12 w-full px-4 mx-auto">
              <ProfileCard />
            </div>
          </div>
        </div>
        <FooterAdmin />
      </div>
    </>
  )
}

export default Profile
