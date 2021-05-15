import React, { useState, useContext } from 'react'
import { useHistory, Link } from "react-router-dom";
import apiService from "../../context/apiService";
import { useToasts } from 'react-toast-notifications'
import { AppStateContext } from "../../context";
import Fade from 'react-reveal/Fade';

// components
import AdminNavbar from "../../components/Navbars/AdminNavbar.js";
import Sidebar from "../../components/Sidebar/Sidebar.js";
import FooterAdmin from "../../components/Footers/FooterAdmin.js";
import FullScreenLoader from "../../components/fullScreenLoader";

const Password = () => {
  const { authService } = useContext(AppStateContext);
  const { email } = authService.currentUser;

  const [passwordDetails, setPasswordDetails] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const { addToast } = useToasts()


  const { currentPassword, newPassword, confirmPassword } = passwordDetails;


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // further validations can be done on the input 
      if (!email || !currentPassword || !newPassword || !confirmPassword) {
        addToast("Fill all fields please", {
          appearance: 'error',
          autoDismiss: true,
        })

        return
      }

      if (newPassword !== confirmPassword) {
        addToast("Passwords Don't Match", {
          appearance: 'error',
          autoDismiss: true,
        })

        return
      }


      setIsLoading(true)

      await apiService.changePassword({ email, currentPassword, newPassword });
      // const { data } = response.data;
      addToast("Password updated successfully", {
        appearance: 'success',
        autoDismiss: true,
      })

      history.push('/dashboard/profile'); // Redirect to profile on success

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

    setPasswordDetails({ ...passwordDetails, [name]: value });
  };

  return (
    <>
      {isLoading ? <FullScreenLoader /> : <></>}
      <Sidebar />
      <div className="relative md:ml-64 bg-gray-900">
        <AdminNavbar />
        <Fade left>
          <div className="relative px-4 md:px-10 mx-auto w-full h-screen md:pt-32 pt-12 md:mt-0 mt-24">
            <div className="flex flex-wrap mt-12">
              <div className="lg:w-8/12 w-full px-4 mx-auto">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                  <div className="text-center flex justify-between">
                    <h6 className="text-gray-800 text-xl font-bold">Change Password</h6>
                    <Link
                      className="bg-blue-800 custom-btn text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ml-3 ease-linear transition-all duration-150"
                      type="button"
                      to='/dashboard/profile'
                    >
                      Back
                   </Link>
                  </div>
                </div>

                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg bg-gray-300">
                  <form onSubmit={handleSubmit} className="flex-auto p-5 lg:p-10">
                    <div className="relative w-full mb-3">
                      <label className="block">
                        <span className="text-gray-700">Email</span>
                        <input type='email' className="form-input text-gray-700 bg-white mt-1 block w-full my-4 p-3" placeholder="Email" name='email' value={email}
                          disabled />
                      </label>
                    </div>
                    <div className="relative w-full mb-3">
                      <label className="block">
                        <span className="text-gray-700">Current Password</span>
                        <input type='password' className="form-input text-gray-700 mt-1 block w-full my-4 p-3" placeholder="Current Password" name='currentPassword' value={currentPassword}
                          onChange={handleChange}
                          required />
                      </label>
                    </div>
                    <div className="relative w-full mb-3">
                      <label className="block">
                        <span className="text-gray-700">New Password</span>
                        <input type='password' className="form-input text-gray-700 mt-1 block w-full my-4 p-3" placeholder="New Password" name='newPassword' value={newPassword}
                          onChange={handleChange}
                          required />
                      </label>
                    </div>
                    <div className="relative w-full mb-3">
                      <label className="block">
                        <span className="text-gray-700">Confirm Password</span>
                        <input type='password' className="form-input text-gray-700 mt-1 block w-full my-4 p-3" placeholder="New Password" name='confirmPassword' value={confirmPassword}
                          onChange={handleChange}
                          required />
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
                        Update Password
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

export default Password
