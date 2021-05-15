import React, { useState, useContext } from 'react'
import { Link, useHistory } from "react-router-dom";
import apiService from "../../context/apiService";
import { AppStateContext } from "../../context";
import Fade from 'react-reveal/Fade';

import { useToasts } from 'react-toast-notifications'

// components
import AdminNavbar from "../../components/Navbars/AdminNavbar.js";
import Sidebar from "../../components/Sidebar/Sidebar.js";
import FooterAdmin from "../../components/Footers/FooterAdmin.js";
import FullScreenLoader from "../../components/fullScreenLoader";


const AddCustomer = () => {
  const [itemDetails, setItemDetails] = useState({
    fullName: "",
    phoneNumber: "",
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { customerService } = useContext(AppStateContext)

  const { addToast } = useToasts()
  const history = useHistory();

  const { fullName, phoneNumber } = itemDetails;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!fullName || !phoneNumber) return; // further validations can be done on the input 
      setIsLoading(true)
      const response = await apiService.addCustomer({ fullName, phoneNumber });
      const { data } = response.data;
      customerService.addCustomer(data); // save customer to the app state
      addToast("Customer added successfully", {
        appearance: 'success',
        autoDismiss: true,
      })
      history.push('/dashboard/customers');  // Redirect to Customers on successful add
    } catch (error) {
      const message = apiService.getErrorMessage(error); // the getErrorMessage is a helper function to get the exact messages from the server
      addToast(message, {
        appearance: 'error',
        autoDismiss: true,
      })
      setIsLoading(false)
      setError(message)
      setTimeout(() => {
        setError('')
      }, 5000);
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;

    setItemDetails({ ...itemDetails, [name]: value });
  };

  return (
    <>
      {isLoading ? <FullScreenLoader /> : <></>}
      <Sidebar />
      <div className="relative md:ml-64 bg-gray-900">
        <AdminNavbar />
        <Fade left>

          <div className="relative px-4 md:px-10 mx-auto w-full h-screen md:pt-32 pt-12">
            <div className="flex flex-wrap md:mt-4 mt-32">
              <div className="lg:w-8/12 w-full px-4 mx-auto">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                  <div className="text-center flex justify-between">
                    <h6 className="text-gray-800 text-xl font-bold">Add Customer</h6>
                    <Link
                      className="bg-blue-800 custom-btn text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ml-3 ease-linear transition-all duration-150"
                      type="button"
                      to='/dashboard/customers'
                    >
                      Back
                   </Link>
                  </div>
                </div>

                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg bg-gray-300">
                  <form onSubmit={handleSubmit} className="flex-auto p-5 lg:p-10">
                    <div className="relative w-full mb-3">
                      <label className="block">
                        <span className="text-gray-700">Full Name</span>
                        <input type='text' className="form-input text-gray-700 mt-1 block w-full my-4 p-3" placeholder="Enter full name" name="fullName" value={fullName} onChange={handleChange}
                          required />
                      </label>
                    </div>
                    <div className="relative w-full mb-3">
                      <label className="block">
                        <span className="text-gray-700">Phone Number</span>
                        <input type='text' className="form-input text-gray-700 mt-1 block w-full my-4 p-3" placeholder="Enter phone number" name="phoneNumber" value={phoneNumber} onChange={handleChange} required
                        />
                      </label>
                    </div>

                    <small className="text-red-500 font-bold">
                      {error}
                    </small>

                    <div className="text-center mt-6">
                      <button
                        className="bg-gray-900 custom-btn text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="submit"
                      >
                        Add
                  </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Fade>
        <FooterAdmin />
      </div>
    </>
  )
}

export default AddCustomer
