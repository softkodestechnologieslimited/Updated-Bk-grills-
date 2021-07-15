import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import apiService from "../../context/apiService";
import { AppStateContext } from "../../context";
import { useToasts } from 'react-toast-notifications'

import FullScreenLoader from "../fullScreenLoader";

const CustomerDetailsCard = () => {
  const [itemDetails, setItemDetails] = useState({
    fullName: "",
    phoneNumber: "",
  });

  const { addToast } = useToasts()
  const [isLoading, setIsLoading] = useState(false);

  const params = useParams();
  const history = useHistory();
  const { id } = params
  const { customerService } = useContext(AppStateContext)

  const getCustomer = async () => {
    const customer = await customerService.getSingleCustomer(id);
    setItemDetails(customer)
  }

  useEffect(() => {
    getCustomer()

    // eslint-disable-next-line
  }, []);


  const { fullName, phoneNumber } = itemDetails;


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!fullName || !phoneNumber) return; // further validations can be done on the input 
      setIsLoading(true)

      const response = await apiService.editCustomer({ id, fullName, phoneNumber });
      const { status } = response.data;
      addToast(status, {
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
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;

    setItemDetails(prevDetails => {
      return {
        ...prevDetails,
        [name]: value
      }
    })
  };

  return (
    <>
      {isLoading ? <FullScreenLoader /> : <></>}
      <div className="relative flex flex-col xl:w-8/12 mx-auto min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-gray-800 text-xl font-bold">Edit Customer details</h6>
            <Link
              className="bg-blue-800 custom-btn text-white active:bg-blue-600 
              font-bold uppercase text-xs px-4 py-2 rounded shadow 
              hover:shadow-md outline-none focus:outline-none mr-1 
              ease-linear transition-all duration-150"
              type="button"
              to='/dashboard/customers'
            >
              Back
          </Link>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pb-4 pt-0">
          <form onSubmit={handleSubmit} className="flex-auto p-5 lg:p-10">
            <div className="relative w-full mb-3">
              <label className="block">
                <span className="text-gray-700">Full name</span>
                <input className="form-input text-gray-700 mt-1 block w-full my-4 p-3" placeholder="Full name" name='fullName' value={fullName}
                  onChange={handleChange}
                  required />
              </label>
            </div>
            <div className="relative w-full mb-3">
              <label className="block">
                <span className="text-gray-700">Phone</span>
                <input className="form-input text-gray-700 mt-1 block w-full my-4 p-3" placeholder="Phone Number" name='phoneNumber' value={phoneNumber}
                  onChange={handleChange}
                  required />
              </label>
            </div>
            <div className="text-center mt-8">
              <button
                className="bg-gray-900 custom-btn text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="submit"
              >
                Save
                  </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default CustomerDetailsCard;
