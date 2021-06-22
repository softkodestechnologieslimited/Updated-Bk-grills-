import React from "react";
import { Link } from "react-router-dom";
import { format } from 'date-fns'
import { formatter } from "utils";

const ExpensesCard = ({ expenses }) => {
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-6 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-gray-800">Expenses</h3>
            </div>
            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
              <Link
                className="bg-blue-800 custom-btn text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                to="/dashboard/addexpense"
              >
                <i className="fas fa-plus mr-2"></i> New
              </Link>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {
            expenses.length !== 0 ? (
              <table className="items-center w-full bg-transparent border-collapse">
                <thead>
                  <tr>
                    <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                      Item Description
                </th>
                    <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                      Total Cost
                </th>
                    <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                      Date Purchased
                </th>
                    <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                      Staff Name
                </th>
                    {/* <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                      Quantity
                </th> */}
                    <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-800">
                  {
                    expenses.map((expense, idx) => (
                      <tr key={idx}>
                        <td className="border-t-0 px-6 text-capitalize align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                          <span className="font-bold">{expense.description}</span>
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                          {formatter.format(expense.cost)}
                        </td>
                        <td className="border-t-0 text-capitalize px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                          {format(new Date(expense.year, expense.month, expense.day), 'MM/dd/yyyy')}
                        </td>
                        <td className="border-t-0 text-capitalize px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                          {expense.staff_name}
                        </td>
                        {/* <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                          {expense.quantity || <span className="font-bold text-xl">
                            -
                          </span>}
                        </td> */}
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                          {/* <ExpensesDropdown /> */}
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            ) : (
              <div className="flex justify-center items-center flex-col">
                <p className="py-5 px-6 font-bold text-red-500">No expenses yet!</p>
              </div>
            )
          }

        </div>
      </div>
    </>
  );
};

export default ExpensesCard;
