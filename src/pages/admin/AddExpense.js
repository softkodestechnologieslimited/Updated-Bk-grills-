import React, { useState, useEffect, useContext } from 'react'
import { Link, useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import moment from 'moment';
import apiService from "../../context/apiService";
import { AppStateContext } from "../../context";
import { useToasts } from 'react-toast-notifications'
import Fade from 'react-reveal/Fade';



// components
import AdminNavbar from "../../components/Navbars/AdminNavbar.js";
import Sidebar from "../../components/Sidebar/Sidebar.js";
import FooterAdmin from "../../components/Footers/FooterAdmin.js";
import FullScreenLoader from "../../components/fullScreenLoader";


const AddExpense = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [itemDetails, setItemDetails] = useState({
    cost: "",
    description: "",
    quantity: "",
    staff_id: "",
    staff_name: "",
  });

  const { expenseService, authService } = useContext(AppStateContext)
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const history = useHistory();
  const { addToast } = useToasts()


  const { description, cost, quantity, staff_id, staff_name } = itemDetails;

  const date = moment(startDate).format("MMMM DD YYYY");

  // sets staff when component mounts
  const setStaff = () => {
    const user = authService.currentUser;
    const { id, name } = user;

    setItemDetails({ ...itemDetails, staff_name: name, staff_id: id })
  };

  useEffect(() => {
    setStaff();
    // eslint-disable-next-line
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // further validations can be done on the input 
      if (!cost || !description || !date) {
        addToast("Fill all required fields please", {
          appearance: 'error',
          autoDismiss: true,
        })

        return
      }

      setIsLoading(true)

      const response = await apiService.addExpense({ cost, description, date, quantity, staff_id, staff_name });
      const { data } = response.data;

      console.log(data)

      expenseService.addExpense(data); // save expense to the app state
      addToast("Expense added successfully", {
        appearance: 'success',
        autoDismiss: true,
      })
      history.push('/dashboard/expenses'); // Redirect to expenses on successful add

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
          <div className="relative px-4 md:px-10 mx-auto w-full h-90 md:pt-32 pt-12">
            <div className="flex flex-wrap md:mt-4 mt-32">
              <div className="lg:w-8/12 w-full px-4 mx-auto">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                  <div className="text-center flex justify-between">
                    <h6 className="text-gray-800 text-xl font-bold">Add Expense</h6>
                    <Link
                      className="bg-blue-800 custom-btn text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ml-3 ease-linear transition-all duration-150"
                      type="button"
                      to='/dashboard/expenses'
                    >
                      Back
                   </Link>
                  </div>
                </div>

                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg bg-gray-300">
                  <form onSubmit={handleSubmit} className="flex-auto p-5 lg:p-10">
                    <div className="relative w-full mb-3">
                      <label className="block">
                        <span className="text-gray-700">Description</span>
                        <input className="form-input text-gray-700 mt-1 block w-full my-4 p-3" placeholder="Description" name='description' value={description}
                          onChange={handleChange}
                          required />
                      </label>
                    </div>
                    <div className="relative w-full mb-3">
                      <label className="block">
                        <span className="text-gray-700">Cost</span>
                        <input type="number" className="form-input text-gray-700 mt-1 block w-full my-4 p-3" placeholder="Enter cost" name="cost" value={cost} onChange={handleChange}
                          required />
                      </label>
                    </div>

                    <div className="relative w-full mb-3">
                      <label className="block">
                        <span className="text-gray-700">Date Purchased</span>
                      </label>
                      <DatePicker selected={startDate} onChange={date => setStartDate(date)} className='text-gray-600 mt-2 p-3' required />
                    </div>

                    <div className="relative w-full mb-3">
                      <label className="block">
                        <span className="text-gray-700">Quantity</span>
                        <input type='number' className="form-input text-gray-700 mt-1 block w-full my-4 p-3" placeholder="Enter quantity" name="quantity" value={quantity} onChange={handleChange}
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

export default AddExpense
