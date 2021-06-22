import React from "react";
import { Link } from "react-router-dom";
import Fade from 'react-reveal/Fade';


// components
import CustomerDropdown from "../Dropdowns/CustomerDropdown.js";

const CustomersCard = ({ customers, refresh }) => {
  return (
    <>
      <Fade left>

        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center py-2">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 className="font-semibold text-base text-gray-800">
                  Customers
            </h3>
              </div>
              <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                <Link
                  className="bg-blue-800 custom-btn text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  to="/dashboard/addcustomer"
                >
                  <i className="fas fa-plus mr-2"></i> New
            </Link>
              </div>
            </div>
          </div>
          <div className="block w-full overflow-x-auto">
            {
              customers.length !== 0 ? (
                <table className="items-center w-full bg-transparent border-collapse">
                  <thead>
                    <tr>
                      <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                        Full Name
              </th>
                      <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                        Phone
              </th>
                      <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-800">
                    {
                      customers.map((customer, idx) => (
                        <tr key={idx}>
                          <td className="border-t-0 text-capitalize px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                            {customer.fullName}
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                            {customer.phoneNumber}
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-right">
                            <CustomerDropdown id={customer.id} refresh={refresh} />
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              ) : (
                (
                  <div className="flex justify-center items-center flex-col">
                    <p className="py-5 px-6 font-bold text-red-500">No customers available!</p>

                    {/* <img src={cartSvg} alt="empty cart" className='w-1/2 object-fit' /> */}

                  </div>
                )
              )
            }

          </div>
        </div>
      </Fade>
    </>
  )
}

export default CustomersCard
