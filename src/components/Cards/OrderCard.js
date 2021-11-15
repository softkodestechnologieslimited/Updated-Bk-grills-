import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import apiService from "../../context/apiService";
import { AppStateContext } from "../../context";
import { useToasts } from "react-toast-notifications";
import Fade from "react-reveal/Fade";

import FullScreenLoader from "../fullScreenLoader";

const OrderCard = () => {
  // const newDate = (date) => date.toISOString().slice(0, 10);
  const params = useParams();
  const { id } = params;

  const { orderService, mealService } = useContext(AppStateContext);
  const [meals, setMeals] = useState([]);
  let [editOrder, setEditOrder] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    items: "",
    ordered: null,
    quantity: null,
    payment_method: "",
    payment_status: null,
    prices: "",
    ordered_date: null,
    staff: "",
    status: null,
    ref_code: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const [disableCheckbox, setDisableCheckbox] = useState(false);
  // const { orderService, authService } = useContext(AppStateContext)
  const { addToast } = useToasts();

  // const { currentUser } = authService;
  // console.log(currentUser)

  const getOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await apiService.getSingleOrder(id);
      console.log(data);
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
    if (!meals.length) {
      getItems();
    }
    console.log(meals);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    disable();
  });

  const {
    // items,
    // quantity,
    // prices,
    ordered,
    ordered_date,
    payment_method,
    payment_status,
    staff,
    ref_code,
    // item_ids,
  } = orderDetails;

  const updateOrder = async (e) => {
    e.preventDefault();

    try {
      await apiService.updateOrder(id, orderDetails);
      // const updatedOrder = data.data;
      // orderService.updateOrder(updatedOrder);

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
    console.log(orderDetails);
  };

  const togglePaymentStatus = () => {
    const status = payment_status === false ? true : false;
    const method = status === "pending" ? "" : payment_method;

    setOrderDetails({
      ...orderDetails,
      payment_status: status,
      payment_method: method,
    });

    console.log(status);
  };
  // const orderedDate = () => {
  //   // setOrderDetails({ ...orderDetails, ordered_date: date });
  //   console.log(orderDetails.ordered_date);
  // };
  // let disabled = false;

  const disable = () => {
    if (ordered_date !== null) {
      setDisableCheckbox(true);
      console.log(disableCheckbox);
    }
  };

  const toggleOrderStatus = () => {
    const orderStatus = ordered === false ? true : false;

    // const date = orderStatus ? newDate(new Date()) : null;

    setOrderDetails({ ...orderDetails, ordered: orderStatus });
    console.log(disableCheckbox, orderDetails);
  };

  const getItems = async () => {
    try {
      const response = await apiService.getMeals();
      const { data } = response;

      mealService.setMeals([...data]);
      console.log(data);

      setMeals(data.filter((meal) => meal.status === true && meal.desc >= 1));
    } catch (error) {
      console.log(error);
    }
  };

  const toggleEditOrder = () => {
    setEditOrder(!editOrder);
    itemsTotal();
    setMeals(
      mealService.meals.filter((meal) => meal.status === true && meal.desc >= 1)
    );
    console.log(meals);
  };

  const handleRemoveItem = (idx) => {
    const items = [orderDetails.items].join().split(",");
    const quantity = [orderDetails.quantity].join().split(",");
    const prices = [orderDetails.prices].join().split(",");
    const item_ids = [orderDetails.item_ids].join().split(",");
    if (idx > -1) {
      items.splice(idx, 1);
      quantity.splice(idx, 1);
      prices.splice(idx, 1);
      item_ids.splice(idx, 1);
    }
    setOrderDetails({
      ...orderDetails,
      items: items.toString(),
      quantity: quantity.toString(),
      prices: prices.toString(),
      item_ids: item_ids.toString(),
    });
    console.log(orderDetails);
  };

  const handleAddItem = (e) => {
    const items = [orderDetails.items].join().split(",");
    const item_ids = [orderDetails.item_ids].join().split(",");
    const prices = [orderDetails.prices].join().split(",");
    const quantity = [orderDetails.quantity].join().split(",");
    const value = [e.target.value].join().split("-");

    let id = parseInt(item_ids[item_ids.length - 1]);
    id += 1
    items.push(value[0]);
    item_ids.push(id);
    quantity.push(value[1]);
    prices.push(parseInt(value[2].replace(/,/g, "")));

    setOrderDetails({
      ...orderDetails,
      items: items.toString(),
      item_ids: item_ids.toString(),
      prices: prices.toString(),
      quantity: quantity.toString(),
    });
    console.log(item_ids,id);
  };

  const increase = (idx) => {
    let quantity = [orderDetails.quantity].join().split(",");
    if ([orderDetails.items].join().split(",").length > 1) {
      ++quantity[idx];
    }
    console.log([orderDetails.items].join().split(","));
    setOrderDetails({
      ...orderDetails,
      quantity: quantity.toString(),
    });
  };

  const decrease = (idx) => {
    let quantity = [orderDetails.quantity].join().split(",");
    if (parseInt(quantity[idx]) > 1) --quantity[idx];
    setOrderDetails({
      ...orderDetails,
      quantity: quantity.toString(),
    });
  };

  const itemsTotal = () => {
    let total = 0;
    const quantity = orderDetails.quantity.split(",");

    quantity.forEach((quantity, index) => {
      const prices = orderDetails.prices.split(",")[index];
      console.log((total += quantity * prices));
    });
    // console.log(total);
    setOrderDetails({ ...orderDetails, ref_code: total });
    return total;
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
            <div className=" flex justify-between items-center   text-sm mt-3 mb-6 font-bold uppercase">
              <h6 className="text-black">Order Information</h6>
              {editOrder ? (
                <span className="px-3 text-lg align-middle  py-3 text-xs text-green-500 uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                  <i
                    onClick={() => toggleEditOrder()}
                    className="fas fa-check cursor-pointer text-green"
                  ></i>
                </span>
              ) : (
                <span className="px-3 text-sm align-middle text-black  py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                  <i
                    onClick={toggleEditOrder}
                    className="fas fa-pencil-alt cursor-pointer"
                  ></i>
                </span>
              )}
            </div>

            <table className=" w-full items-center w-full bg-transparent border-collapse">
              <thead className="w-full thead-light">
                <tr className="w-full">
                  <th className="w-1/4 px-3 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                    Items
                  </th>
                  <th className="w-1/4 px-3 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                    Quantity
                  </th>
                  <th className="w-1/4 px-3 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                    Price &#8358;
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr className="" valign="top">
                  <td className="flex-auto text-center text-black">
                    <>
                      {[orderDetails.items]
                        .join()
                        .split(",")
                        .map((items, idx) => (
                          <ul className="flex-1" key={idx}>
                            <li className=" border-t-0 px-6 align-middle border-l-0 border-r-0 text-s whitespace-no-wrap p-4 text-left">
                              {items}
                              {editOrder && (
                                <button
                                  className="text-red-500 bg-transparent border border-solid border-red-500 hover:bg-red-500 hover:text-white active:bg-red-600 font-bold uppercase text-xs ml-2 rounded-full outline-none focus:outline-none ease-linear transition-all duration-150"
                                  type="button"
                                  onClick={() => handleRemoveItem(idx)}
                                >
                                  <i className="fas fa-trash"></i>
                                </button>
                              )}
                            </li>
                          </ul>
                        ))}
                    </>
                  </td>
                  <td className="text-black flex-auto text-center">
                    <>
                      {[orderDetails.quantity]
                        .join()
                        .split(",")
                        .map((quantity, idx) => (
                          <ul className="flex-1" key={idx}>
                            <li className=" border-t-0 px-6 align-middle border-l-0 border-r-0 text-s whitespace-no-wrap p-4 text-left">
                              {editOrder && (
                                <button
                                  className="text-red-500 bg-transparent border border-solid border-red-500 hover:bg-red-500 hover:text-white active:bg-red-600 font-bold uppercase text-xs mr-2 rounded-full outline-none focus:outline-none ease-linear transition-all duration-150"
                                  type="button"
                                  onClick={() => decrease(idx)}
                                >
                                  <i className="fas fa-minus"></i>
                                </button>
                              )}
                              {quantity}
                              {editOrder && (
                                <button
                                  className="text-blue-500 bg-transparent border border-solid border-blue-500 hover:bg-blue-500 hover:text-white active:bg-blue-600 font-bold uppercase text-xs  rounded-full outline-none focus:outline-none ml-2 ease-linear transition-all duration-150"
                                  type="button"
                                  onClick={() => increase(idx)}
                                >
                                  <i className="fas fa-plus"></i>
                                </button>
                              )}
                            </li>
                          </ul>
                        ))}
                    </>
                  </td>
                  <td className="text-black  flex-auto text-center">
                    <>
                      {[orderDetails.prices]
                        .join()
                        .split(",")
                        .map((prices, idx) => (
                          <ul className="" key={idx}>
                            <li className=" border-t-0 px-6 align-middle border-l-0 border-r-0 text-s whitespace-no-wrap p-4 text-left">
                              {prices}
                            </li>
                          </ul>
                        ))}
                    </>
                  </td>
                </tr>
              </tbody>
            </table>

            <div>
              {editOrder && (
                <div>
                  <select
                    className="form-select block w-full placeholder-gray-400 text-gray-700 bg-white rounded p-3"
                    onChange={(e) => handleAddItem(e)}
                    name="payment_method"
                    //  value={payment_method}
                  >
                    <option value="">Add item to order</option>
                    {meals.map((data, idx) => (
                      <option key={idx} className="text-black">
                        {data.item}  -  1  -  {data.price}  -  total quantity: {data.desc}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <div className="py-5 text-black flex-auto border-t-0 font-semibold px-2 align-middle border-l-0 border-r-0 text-m whitespace-no-wrap py-4 text-right">
                TOTAL: &#8358;{ref_code}
              </div>
            </div>

            <div className="flex flex-wrap mt-3 mb-6">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <span className="block uppercase text-gray-700 text-xs font-bold mb-2">
                    Staff Name
                  </span>
                  {/* <input
                    value={staff}
                    name="staff"
                    onChange={handleChange}
                    readOnly
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150 text-capitalize"
                  /> */}
                  <p className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150 text-capitalize">
                    {orderDetails.table_no ? "customer order" : staff}
                  </p>
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                {/* {payment_status === true && ( */}
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
                    {/* <option value="pending">Pending</option> */}
                    <option value="cash">Cash</option>
                    <option value="pos">POS</option>
                    <option value="transfer">Transfer</option>
                  </select>
                </div>
                {/* // )} */}
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full ">
                  <span className="block uppercase text-gray-700 text-xs font-bold mb-2">
                    Payment Status
                  </span>
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
                    disabled={disableCheckbox}
                    // onClick={orderedDate}
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

          {/* <div
            className={`flex rounded-t bg-white mb-0 px-6 py-6 ${
              orderDetails.ordered === true && payment_status === true
                ? "justify-center"
                : ""
            }`}
          > */}

          <div className="flex rounded-t bg-white mb-0 px-6 py-6 justify-between">
            {/* <div
              className={`text-center flex flex-auto  items-center ${
                orderDetails.ordered === true && payment_status === true
                  ? "justify-center"
                  : "justify-end"
              }`}
            > */}
            <div
              className="text-center flex mx-auto items-center 
              "
            >
              <button
                className="bg-blue-800 custom-btn text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 flex items-center"
                type="button"
                onClick={updateOrder}
              >
                <i className="fas fa-check-square mr-4"></i>
                Update Order
              </button>
            </div>
            {/* <div className="flex-auto mx-auto">
              {(ordered === true) & (payment_status === true) && (
                // <Jump>
                <Link
                  to={`/dashboard/orders/print/${id}`}
                  className={
                    "text-sm py-2 px-4 font-bold uppercase block w-full whitespace-no-wrap bg-transparent text-gray-800 text-center"
                  }
                >
                  <i className="fas fa-print mr-2"></i>
                  Print Receipt
                </Link>
                // </Jump>
              )}
            </div> */}
          </div>
        </div>
      </Fade>
    </>
  );
};

export default OrderCard;
