import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { AppStateContext } from "../../context";

import FullScreenLoader from "../fullScreenLoader";
import ModifyStaffDropdown from "../Dropdowns/ModifyStaffDropdown";
import StaffModal from "../Modals/StaffModal";

const StaffDetailsCard = () => {
  const [staffDetails, setStaffDetails] = useState({
    fullname: '',
    email: '',
    phone: '',
    role: '',
  });

  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState('')

  const params = useParams();
  const history = useHistory();
  const { id } = params

  const { staffService } = useContext(AppStateContext)

  const getStaffDetails = async () => {
    if (!staffService.allStaff.length) {
      return history.push('/dashboard/staff');
    };

    const staff = await staffService.getSingleStaff(id);
    setStaffDetails(staff)
  }

  useEffect(() => {
    getStaffDetails()

    // eslint-disable-next-line
  }, []);


  const { name, role, email, phone } = staffDetails;

  const handleChange = (e) => {
    const { value, name } = e.target;

    setStaffDetails(prevDetails => {
      return {
        ...prevDetails,
        [name]: value
      }
    })
  };

  const closeModal = () => setShowModal(false);

  const openModal = () => setShowModal(true);

  return (
    <>
      {isLoading ? <FullScreenLoader /> : <></>}
      {showModal ? (
        <StaffModal onClose={closeModal} setIsLoading={(x) => setIsLoading(x)} email={email} role={role} type={type} />
      ) : null}

      <div className="relative flex flex-col xl:w-8/12 mx-auto min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-gray-800 text-xl font-bold">Staff Information</h6>
            <ModifyStaffDropdown openModal={openModal} setType={(x) => setType(x)} />
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form className="flex-auto p-5 lg:p-10">
            <div className="relative w-full mb-3">
              <span className="text-gray-700">Full Name</span>
              <p
                className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150 text-capitalize">
                {name}
              </p>
            </div>
            <div className="relative w-full mb-3">
              <span className="text-gray-700">Email</span>
              <p
                className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150">
                {email}
              </p>
            </div>
            <div className="relative w-full mb-3">
              <span className="text-gray-700">Phone</span>
              <p
                className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150">
                {phone || "-"}
              </p>
            </div>
            <div className="relative w-full mb-3">
              <div className="mt-4">
                <span className="text-gray-700">Role</span>
                <div className="mt-2">
                  <label className="block items-center">
                    <input type="radio" className="form-radio" name="role" value="superAdmin" checked={role === "superAdmin"} onChange={handleChange} />
                    <span className="ml-2 text-gray-700">Super Admin</span>
                  </label>
                  <label className="block items-center">
                    <input type="radio" className="form-radio" name="role" value="admin" checked={role === "admin"} onChange={handleChange} />
                    <span className="ml-2 text-gray-700">Admin</span>
                  </label>
                  <label className="block items-center">
                    <input type="radio" className="form-radio" name="role" value="waiter" checked={role === "waiter"} onChange={handleChange} />
                    <span className="ml-2 text-gray-700">Waiter</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="text-center mt-8">
              <button
                className="bg-gray-900 custom-btn text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => {
                  setType('role');
                  openModal();
                }
                }
              >
                Update Role
                  </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default StaffDetailsCard;
