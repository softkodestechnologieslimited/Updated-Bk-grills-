import React, { useState, useContext } from 'react'
import { useHistory, Link } from "react-router-dom";
import apiService from "../../context/apiService";
import { AppStateContext } from "../../context";
import { useToasts } from 'react-toast-notifications'
import Fade from 'react-reveal/Fade';


// components
import AdminNavbar from "../../components/Navbars/AdminNavbar.js";
import Sidebar from "../../components/Sidebar/Sidebar.js";
import FooterAdmin from "../../components/Footers/FooterAdmin.js";
import FullScreenLoader from "../../components/fullScreenLoader";
import Input from "components/Input"


const AddStaff = () => {
  const emptyData = {
    first_name: "",
    last_name: '',
    email: "",
    phone: "",
    address: "",
    role: "",
  }

  const [itemDetails, setItemDetails] = useState(emptyData);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { staffService } = useContext(AppStateContext)
  const history = useHistory();
  const { addToast } = useToasts()


  const { first_name, last_name, email, phone, address, role } = itemDetails;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // further validations can be done on the input 
      if (!first_name || !last_name || !email || !phone || !address) {
        addToast("Fill all fields please", {
          appearance: 'error',
          autoDismiss: true,
        })

        return
      }
      // console.log('adding new staff');
      setIsLoading(true)

      const response = await apiService.addStaff({ first_name, last_name, email, phone, address, role });
      // const { data } = response.data;

      staffService.addStaff(response.data); // save staff to the app state
      addToast("Staff added successfully", {
        appearance: 'success',
        autoDismiss: true,
      })
      history.push('/dashboard/staff'); // Redirect to staff on successful add

    } catch (error) {
      const message = apiService.getErrorMessage(error); // the getErrorMessage is a helper function to get the exact messages from the server
      setIsLoading(false)
      addToast(message, {
        appearance: 'error',
        autoDismiss: true,
      })
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

          <div className="relative px-4 md:px-10 mx-auto w-full md:pt-32 pt-12">
            <div className="flex flex-wrap md:mt-4 mt-32">
              <div className="lg:w-8/12 w-full px-4 mx-auto">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                  <div className="text-center flex justify-between">
                    <h6 className="text-gray-800 text-xl font-bold">Add Staff</h6>
                    <Link
                      className="bg-blue-800 custom-btn text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ml-3 ease-linear transition-all duration-150"
                      type="button"
                      to='/dashboard/staff'
                    >
                      Back
                   </Link>
                  </div>
                </div>

                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg bg-gray-300">
                  <form onSubmit={handleSubmit} className="flex-auto p-5 lg:p-10">
                  <div className="relative w-full mb-3">
                      <label className="block">
                        <span className="text-gray-700">First Name</span>
                        <Input type='text' className="form-input text-gray-700 mt-1 block w-full my-4 p-3" placeholder="Enter first name" name="first_name" value={first_name} onChange={handleChange}
                          required />
                      </label>
                    </div>    <div className="relative w-full mb-3">
                      <label className="block">
                        <span className="text-gray-700">Last Name</span>
                        <Input type='text' className="form-input text-gray-700 mt-1 block w-full my-4 p-3" placeholder="Enter last name" name="last_name" value={last_name} onChange={handleChange}
                          required />
                      </label>
                    </div>
                    <div className="relative w-full mb-3">
                      <label className="block">
                        <span className="text-gray-700">Email</span>
                        <Input type="email" className="form-input text-gray-700 mt-1 block w-full my-4 p-3" placeholder="Enter email" name="email" value={email} onChange={handleChange}
                          required />
                      </label>
                    </div>
                    <div className="relative w-full mb-3">
                      <label className="block">
                        <span className="text-gray-700">Phone Number</span>
                        <input type='text' className="form-input text-gray-700 mt-1 block w-full my-4 p-3" placeholder="Enter phone number" name="phone" value={phone} onChange={handleChange}
                          required />
                      </label>
                    </div>

                    <div className="relative w-full mb-3">
                      <label className="block">
                        <span className="text-gray-700">Address</span>
                        <Input type="text" className="form-input text-gray-700 mt-1 block w-full my-4 p-3" placeholder="Enter Password" value={address} name='address' onChange={handleChange}
                          required />
                      </label>
                    </div>
                    <div className="relative w-full mb-3">
                      <div className="mt-4">
                        <span className="text-gray-700">Role</span>
                        <div className="mt-2">
                          {/* <label className="block items-center">
                            <Input type="radio" className="form-radio" name="role" value="superAdmin" checked={role === "superAdmin"} onChange={handleChange} />
                            <span className="ml-2 text-gray-700">Super Admin</span>
                          </label> 
                          <label className="block items-center">
                            <input type="radio" className="form-radio" name="role"  value="admin" checked={role === "admin"} onChange={handleChange} />
                            <span className="ml-2 text-gray-700">Admin</span>
                          </label>*/}
                          <label className="block items-center">
                            <input type="radio" className="form-radio" name="role" value="waiter" checked={role === "waiter"} onChange={handleChange} />
                            <span className="ml-2 text-gray-700">Waiter</span>
                          </label>
                        </div>
                      </div>
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

export default AddStaff
