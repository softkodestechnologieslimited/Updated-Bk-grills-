import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import apiService from "../../context/apiService";
import { AppStateContext } from "../../context";
import { useToasts } from "react-toast-notifications";
import Fade from "react-reveal/Fade";

import FullScreenLoader from "../fullScreenLoader";

const OrderCard = () => {
  // const [orderDetails, setOrderDetails] = useState({  meals: [], payment_method: "", payment_status: "", prices: "", waiter_name: "", status: '' });
  const [orderDetails, setOrderDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const history = useHistory();
  const { id } = params;
  const { orderService } = useContext(AppStateContext);
  // const { orderService, authService } = useContext(AppStateContext)
  const { addToast } = useToasts();

  // const { currentUser } = authService;
  // console.log(currentUser)

  const getOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await apiService.getSingleOrder(id);
      console.log(data);
      // const {
      //   items,
      // ordered,
      //   quantity,
      //   payment_method,
      //   payment_status,
      //   prices,
      //   staff,
      //   status,
      // ref_code
      // } = data;
      setOrderDetails(data);
    } catch (error) {
      const message = apiService.getErrorMessage(error);
      addToast(message, {
        appearance: "error",
        autoDismiss: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!orderService.recentOrders.length) {
      return history.push("/dashboard/orders");
    }
    getOrder();

    // eslint-disable-next-line
  }, []);

  const {
    items,
    ordered,
    quantity,
    payment_method,
    payment_status,
    prices,
    staff,
    status,
    ref_code
  } = orderDetails;

  const updateOrder = async () => {
    if (payment_status === "complete" && !payment_method) {
      addToast("Select Payment Method!", {
        appearance: "error",
        autoDismiss: true,
      });
      return;
    }

    try {
      // const update = {
      //   id,
      //   ...orderDetails,
      // };

      const { data } = await apiService.updateOrder(id, orderDetails);
      const updatedOrder = data.data;

      orderService.updateOrder(updatedOrder);

      history.push("/dashboard/orders");
      addToast("Order Updated", {
        appearance: "success",
        autoDismiss: true,
      });
    } catch (error) {
      const message = apiService.getErrorMessage(error);
      addToast(message, {
        appearance: "error",
        autoDismiss: true,
      });

      if (message === "Not allowed") {
        history.push("/dashboard/orders");
      }
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;

    setOrderDetails({ ...orderDetails, [name]: value });
    console.log(payment_status, ordered);
  };

  const togglePaymentStatus = () => {
    const status = payment_status === false ?  true : false;
    const method = status === "pending" ? "" : payment_method;

    setOrderDetails({
      ...orderDetails,
      payment_status: status,
      payment_method: method,
    });
  };

  const toggleOrderStatus = () => {
    const orderStatus = ordered === false ? true : false;
    setOrderDetails({ ...orderDetails, ordered: orderStatus });
  };

  return (
    <>
      {isLoading ? <FullScreenLoader /> : <></>}
      <Fade left>
        <div className="relative flex flex-col xl:w-8/12 mx-auto min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
          <div className="rounded-t bg-white mb-0 px-6 py-6">
            <div className="text-center flex justify-between items-center">
              <h6 className="text-gray-800 text-xl font-bold">{`Order ID - ${id}`}</h6>
              <Link
                className="bg-blue-800 custom-btn text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ml-3 ease-linear transition-all duration-150"
                type="button"
                to="/dashboard/orders"
              >
                Back
              </Link>
            </div>
          </div>
          <div className="flex-auto px-2 lg:px-10 py-10 pt-0">
            <h6 className="text-gray-500 text-sm mt-3 mb-6 font-bold uppercase">
              Order Information
            </h6>

            <table className="items-center w-full bg-transparent border-collapse">
              <thead className="thead-light">
                <tr>
                  <th className="px-3 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                    Items
                  </th>
                  <th className="px-3 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                    Quantity
                  </th>
                  <th className="px-3 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                    Price
                  </th>
                </tr>
              </thead>

         
              <tbody className="text-gray-800">
                {/* {orderDetails &&
                  orderDetails.map((meal, idx) => (
                    <tr key={idx}>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left">
                        {meal.items}
                      </th>o
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                        {meal.quantity}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                        &#8358;{meal.prices}
                      </td>
                    </tr>
                  ))} */}

                {/* {meals &&
                  meals.map((meal, idx) => (    ))
                } */}
                <tr>
                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left">
                    {items}
                  </th>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                    {quantity}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                    &#8358;{prices}
                  </td>
                </tr>
                <p className="px-3 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                TOTAL: {ref_code}
              </p>

                {/* <tr>
                  <th className="border-t-0 font-semibold uppercase bg-gray-100 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left">
                    Total
              </th>
                  <td className="border-t-0 bg-gray-100 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">

                  </td>
                  <td className="border-t-0 font-semibold bg-gray-100 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                    &#8358;{prices}
                  </td>
                </tr> */}
              </tbody>
            </table>

            <hr className="mt-6 border-b-1 border-gray-400" />

            <div className="flex flex-wrap mt-3 mb-6">
              {/* <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <span
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                  >
                    Customer Name
                  </span>
                  <p
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150 text-capitalize">
                    name
                  </p>
                </div>
              </div> */}
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <span className="block uppercase text-gray-700 text-xs font-bold mb-2">
                    Staff Name
                  </span>
                  <input
                    value={staff}
                    name='staff'
                    onChange={handleChange}
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150 text-capitalize"
                  />
                  {/* </p> */}
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <span className="block uppercase text-gray-700 text-xs font-bold mb-2">
                    Payment Method
                  </span>
                  <select
                    className="form-select block w-full placeholder-gray-400 text-gray-700 bg-white rounded p-3"
                    onChange={handleChange}
                    name="payment_method"
                    value={payment_method}
                  >
                    <option value="">Select Payment Method</option>
                    <option value="cash">Cash</option>
                    <option value="pos">POS</option>
                  </select>
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full ">
                  <span className="block uppercase text-gray-700 text-xs font-bold mb-2">
                    Payment Status
                  </span>
                  {/* <p className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150 text-capitalize">
                    {payment_status}
                  </p> */}
                </div>
              </div>
            </div>

            <div className="flex mt-6 justify-between">
              <div className="w-full lg:w-6/12 px-4">
                <label className="flex items-center  text-gray-800">
                  <input
                    type="checkbox"
                    className="form-checkbox text-green-500"
                    checked={payment_status === true}
                    onChange={togglePaymentStatus}
                  />
                  <span className="ml-2 hidden md:block">Mark as</span>
                  <span className="ml-2">Paid</span>
                </label>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <label className="flex items-center  text-gray-800">
                  <input
                    type="checkbox"
                    className="form-checkbox text-green-500"
                    checked={ordered === true}
                    onChange={toggleOrderStatus}
                  />
                  <span className="ml-2 hidden md:block">Order</span>
                  <span className="ml-2">Completed</span>
                </label>
              </div>
            </div>
          </div>

          {/* {status === 'completed' && payment_status === 'complete' && currentUser.role !== 'waiter' ? (<></>) : (
          <div className="rounded-t bg-white mb-0 px-6 py-6">
            <div className="text-center flex justify-center items-center">
              <button
                className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 flex items-center"
                type="button"
                onClick={updateOrder}
              >
                <i className="fas fa-check-square mr-4"></i>
                 Update Order
                </button>
            </div>
          </div>
        )} */}

          <div className="rounded-t bg-white mb-0 px-6 py-6">
            <div className="text-center flex justify-center items-center">
              <button
                className="bg-blue-800 custom-btn text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 flex items-center"
                type="button"
                onClick={updateOrder}
              >
                <i className="fas fa-check-square mr-4"></i>
                Update Order
              </button>
            </div>
          </div>
        </div>
      </Fade>
    </>
  );
};

export default OrderCard;
