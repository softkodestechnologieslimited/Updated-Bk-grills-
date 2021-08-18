import React, { useContext } from "react";
import SettingsDropdown from "../../components/Dropdowns/SettingsDropdown";
import { AppStateContext } from "../../context";
import Fade from 'react-reveal/Fade';


const ProfileCard = () => {
  const { authService } = useContext(AppStateContext);
  const { first_name, last_name, user_type, email, phone_number } = authService.currentUser

  return (
    <>
      <Fade left>

        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
          <div className="rounded-t bg-white mb-0 px-6 py-6">
            <div className="text-center flex justify-between">
              <h6 className="text-gray-800 text-xl font-bold">My account</h6>
              <SettingsDropdown />
            </div>
          </div>
          <div className="flex-auto px-4  py-10 pt-0">

            <h6 className="text-gray-500 text-sm mt-3 mb-6 font-bold uppercase">
              User Information
            </h6>
            <div className="flex flex-col">
              <div className="w-full px-4">
                <div className="relative w-full mb-3">
                  <span
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                  >
                    Full Name
                  </span>
                  <p
                    className="px-3 py-3 text-capitalize placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150">
                    {first_name} {last_name}
                  </p>
                </div>
              </div>
              <div className="w-full px-4">
                <div className="relative w-full mb-3">
                  <span
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                  >
                    Email Address
                  </span>
                  <p
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150">
                    {email}
                  </p>
                </div>
              </div>
              <div className="w-full px-4">
                <div className="relative w-full mb-3">
                  <span
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                  >
                    Role
                  </span>
                  <p
                    className="px-3 py-3 text-capitalize placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150">
                    {user_type}
                  </p>
                </div>
              </div>
              <div className="w-full px-4">
                <div className="relative w-full mb-3">
                  <span
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                  >
                    Phone Number
                  </span>
                  <p
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150">
                    {phone_number || <span className="font-bold text-xl">-</span>}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fade>
    </>
  )
}

export default ProfileCard
