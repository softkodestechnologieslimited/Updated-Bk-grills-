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


const EditProfile = () => {
  const { authService } = useContext(AppStateContext);
<<<<<<< HEAD
  // const { email } = authService.currentUser;

  const [profileDetails, setProfileDetails] = useState({
    name: authService.currentUser.name,
    email: authService.currentUser.email,
    phone: authService.currentUser.phone,
=======
  const { email } = authService.currentUser;

  const [profileDetails, setProfileDetails] = useState({
    name: "",
    phone: "",
>>>>>>> 24b52f90c601d2036fd49e3f6c8671e0b2458928
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const { addToast } = useToasts()

<<<<<<< HEAD
  const { name, phone, email } = profileDetails;
=======
  const { name, phone } = profileDetails;
>>>>>>> 24b52f90c601d2036fd49e3f6c8671e0b2458928


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // further validations can be done on the input 
      if (!email || !name || !phone) {
        addToast("Fill all fields please", {
          appearance: 'error',
          autoDismiss: true,
        })

        return
      }

      setIsLoading(true)

      await apiService.editUser({ email, name, phone });
      // const { data } = response.data;
      addToast("Profile update successful", {
        appearance: 'success',
        autoDismiss: true,
      })

      history.push('/dashboard/profile'); // Redirect to profile on success

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

    setProfileDetails({ ...profileDetails, [name]: value });
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
                    <h6 className="text-gray-800 text-xl font-bold">Update Profile</h6>
                    <Link
                      className="bg-blue-800 text-white active:bg-blue-600 custom-btn font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ml-3 ease-linear transition-all duration-150"
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
                        <span className="text-gray-700">Email Address</span>
                        <input type='email' className="form-input text-gray-700 mt-1 block w-full my-4 p-3 bg-white" placeholder="Email" name='email' value={email}
<<<<<<< HEAD
                        />
=======
                          disabled />
>>>>>>> 24b52f90c601d2036fd49e3f6c8671e0b2458928
                      </label>
                    </div>
                    <div className="relative w-full mb-3">
                      <label className="block">
                        <span className="text-gray-700">Full Name</span>
                        <input type='text' className="form-input text-gray-700 mt-1 block w-full my-4 p-3" placeholder="Full Name" name='name' value={name}
                          onChange={handleChange}
                          required />
                      </label>
                    </div>
                    <div className="relative w-full mb-3">
                      <label className="block">
                        <span className="text-gray-700">Phone</span>
                        <input type='number' className="form-input text-gray-700 mt-1 block w-full my-4 p-3" placeholder="Phone" name='phone' value={phone}
                          onChange={handleChange}
                          required />
                      </label>
                    </div>

                    <small className="text-red-500 font-bold">
                      {error}
                    </small>

                    <div className="text-center mt-6">
                      <button
                        className="bg-gray-900 text-white active:bg-gray-700 custom-btn text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="submit"
                      >
                        Update Profile
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

export default EditProfile
