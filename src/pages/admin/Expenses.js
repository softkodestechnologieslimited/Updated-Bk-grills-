import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import DatePicker from "react-datepicker";
import moment from 'moment';
import { AppStateContext } from "../../context";
import apiService from "../../context/apiService";
import { useToasts } from 'react-toast-notifications'
import Fade from 'react-reveal/Fade';


import "react-datepicker/dist/react-datepicker.css";

// components
import ExpensesCard from "../../components/Cards/ExpensesCard.js";
import AdminNavbar from "../../components/Navbars/AdminNavbar.js";
import Sidebar from "../../components/Sidebar/Sidebar.js";
import FooterAdmin from "../../components/Footers/FooterAdmin.js";
import FullScreenLoader from "../../components/fullScreenLoader";
import Pagination from "../../components/Pagination/Pagination";

const Expenses = observer(() => {
  const [startDate, setStartDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [expensesPerPage] = useState(10);

  const { expenseService } = useContext(AppStateContext);
  const { addToast } = useToasts()

  const formattedDate = moment(startDate).format("MMMM DD YYYY");

  useEffect(() => {
    if (expenseService.expenses.length) return;
    getExpenses();

    // eslint-disable-next-line
  }, []);

  const getExpenses = async () => {
    try {
      setIsLoading(true);
      const response = await apiService.getExpenses();
      const { data } = response.data;
      expenseService.setExpenses([...data]);
    } catch (error) {
      const message = apiService.getErrorMessage(error);
      addToast(message, {
        appearance: 'error',
        autoDismiss: true,
      })
    } finally {
      setIsLoading(false);
    }
  }

  const getExpensesByDate = async (date) => {
    setStartDate(date)

    try {
      setIsLoading(true);
      const response = await apiService.getExpensesByDay({ formattedDate });
      const { data } = response.data;
      expenseService.setExpenses([...data]);

      if (data.length === 0) {
        setTimeout(() => {
          getExpenses()
        }, 3000);
      }

    } catch (error) {
      const message = apiService.getErrorMessage(error);
      addToast(message, {
        appearance: 'error',
        autoDismiss: true,
      })
    } finally {
      setIsLoading(false);
    }
  }

  // Get current expenses
  const indexOfLastExpense = currentPage * expensesPerPage;
  const indexOfFirstExpense = indexOfLastExpense - expensesPerPage;
  const currentExpenses = expenseService.expenses.slice(indexOfFirstExpense, indexOfLastExpense);
  const isLastPage = indexOfLastExpense >= expenseService.expenses.length;

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  return (
    <>
      {isLoading ? <FullScreenLoader /> : <></>}
      <Sidebar />
      <div className="relative md:ml-64 bg-gray-900">
        <AdminNavbar />
        <div className="relative px-4 md:px-10 mx-auto w-full h-90 md:pt-32 pt-12 md:mt-0 mt-24">
          <div className="px-4 mt-6 w-full lg:w-8/12 mx-auto mb-12 flex flex-wrap items-center">
            <label className="block">
              <span className="text-white font-bold mr-4">Filter by Date Purchased</span>
            </label>
            <DatePicker selected={startDate} onChange={(date) => getExpensesByDate(date)} className='text-gray-600 mt-2 p-3' required />
          </div>
          <div className="flex flex-wrap mt-4">
            <div className="w-full lg:w-8/12 mx-auto mb-12 px-4">
              {
                expenseService.expenses.length !== 0 ? (
                  <Fade left>
                    <ExpensesCard expenses={expenseService.expenses} />
                  </Fade>
                ) : (
                  <div className="w-full flex justify-center">
                    <p className="py-5 px-6 font-bold text-xl text-red-500">No Expenses found!</p>
                  </div>
                )
              }
            </div>
          </div>

          <>
            {currentExpenses.length ? (
              <div className="flex justify-center w-full">
                <p className="my-4 text-white font-bold">
                  Showing{" "}
                  {`${indexOfFirstExpense + 1} - ${isLastPage ? expenseService.expenses.length : indexOfLastExpense
                    }`}{" "}
               of {expenseService.expenses.length}
                </p>
              </div>
            ) : (
              ""
            )}
          </>

          {
            currentExpenses.length !== 0 ? (
              <div className="flex justify-center w-full">
                <Pagination
                  itemsPerPage={expensesPerPage}
                  totalItems={expenseService.expenses.length}
                  paginate={paginate}
                  currentPage={currentPage}
                />
              </div>
            ) : (
              ""
            )
          }
        </div>
        <FooterAdmin />
      </div>
    </>
  )
}
)

export default Expenses
