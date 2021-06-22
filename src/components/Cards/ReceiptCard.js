import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import apiService from "../../context/apiService";
import { AppStateContext } from "../../context";
import { useToasts } from 'react-toast-notifications'
import ReactToPrint from 'react-to-print';
import { format } from 'date-fns'

import FullScreenLoader from "../fullScreenLoader";

import logo from "../../assets/img/logo.png";


const ReceiptCard = () => {
  const [orderDetails, setOrderDetails] = useState({ customer_name: "", meals: [], payment_method: "", payment_status: "", total: "", waiter_name: "", status: '', day: '', month: "", year: "" });
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const history = useHistory();
  const { id } = params
  const { orderService } = useContext(AppStateContext)
  const { addToast } = useToasts()

  const receiptRef = useRef();

  const getOrder = async () => {
    try {
      setIsLoading(true)
      const order = await orderService.getSingleOrder(id)
      const { customer_name, meals, payment_method, payment_status, total, waiter_name, status, day, month, year } = order
      setOrderDetails({ customer_name, meals, payment_method, payment_status, total, waiter_name, status, day, month, year })
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

  useEffect(() => {
    if (!orderService.recentOrders.length) {
      return history.push('/dashboard/orders');
    };
    getOrder()

    // eslint-disable-next-line
  }, []);

  const { customer_name, meals, payment_method, payment_status, total, waiter_name, day, month, year } = orderDetails

  return (
    <>
      {isLoading ? <FullScreenLoader /> : <></>}
      <div className="relative flex flex-col xl:w-8/12 mx-auto min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between items-center">
            <h6 className="text-gray-800 text-xl font-bold">{`Order ID - ${id}`}</h6>
            <Link
              className="bg-blue-800 custom-btn text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ml-3 ease-linear transition-all duration-150"
              type="button"
              to='/dashboard/orders'
            >
              Back
          </Link>
          </div>
        </div>
        <div className="flex-auto px-2 lg:px-10 py-10 pt-0" ref={receiptRef}>

          <div className='my-6 w-full'>
            <img src={logo} alt="logo" className="mx-auto" />
          </div>

          <h6 className="text-gray-500 text-sm mt-3 mb-6 font-bold uppercase">
            Order Information
          </h6>

          <table className="items-center w-full bg-transparent border-collapse">
            <thead className="thead-light">
              <tr>
                <th className="px-3 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                  Item
              </th>
                <th className="px-3 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                  Quantity
              </th>
                <th className="px-3 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">Price</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {meals &&
                meals.map((meal, idx) => (
                  <tr key={idx}>
                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left">
                      {meal.title}
                    </th>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                      {meal.quantity}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                      &#8358;{meal.price}
                    </td>
                  </tr>
                ))
              }

              <tr>
                <th className="border-t-0 font-semibold uppercase bg-gray-100 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left">
                  Total
              </th>
                <td className="border-t-0 bg-gray-100 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">

                </td>
                <td className="border-t-0 font-semibold bg-gray-100 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                  &#8358;{total}
                </td>
              </tr>
            </tbody>
          </table>

          <hr className="mt-6 border-b-1 border-gray-400" />

          <div className="flex flex-wrap mt-3 mb-6">
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <span
                  className="block uppercase text-gray-700 text-xs font-bold mb-2"
                >
                  Customer Name
                  </span>
                <p
                  className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150 text-capitalize">
                  {customer_name}
                </p>
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <span
                  className="block uppercase text-gray-700 text-xs font-bold mb-2"
                >
                  Waiter Name
                  </span>
                <p
                  className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150 text-capitalize">
                  {waiter_name}
                </p>
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <span
                  className="block uppercase text-gray-700 text-xs font-bold mb-2"
                >
                  Payment Method
                </span>
                <p
                  className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150 text-capitalize">
                  {payment_method}
                </p>
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <span
                  className="block uppercase text-gray-700 text-xs font-bold mb-2"
                >
                  Payment Status
                  </span>
                <p
                  className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150 text-capitalize">
                  {payment_status}
                </p>
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <span
                  className="block uppercase text-gray-700 text-xs font-bold mb-2"
                >
                  Date
                  </span>
                <p
                  className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150 text-capitalize">
                  {format(new Date(year, month, day), 'MM/dd/yyyy')}
                </p>
              </div>
            </div>
          </div>

          <p className='px-3 py-3 text-gray-800 font-bold text-center'>
            Thanks for patronizing us.
          </p>
        </div>

        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-center items-center">
            <ReactToPrint
              trigger={() => <button
                className="bg-blue-800 custom-btn text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 flex items-center"
                type="button"
              >
                <i className="fas fa-print mr-4"></i>
                   Print
              </button>}
              content={() => receiptRef.current}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default ReceiptCard
