import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { nanoid } from "nanoid";
import { useToasts } from "react-toast-notifications";
// import { Hint } from 'react-autocomplete-hint';
import apiService from "../../context/apiService";
import { AppStateContext } from "../../context";
import { observer } from "mobx-react-lite";
import FullScreenLoader from "../fullScreenLoader";

import cartSvg from "../../assets/img/emptycart.svg";

const CheckoutCard = observer(() => {
  const { cartService, authService, staffService } =
    useContext(AppStateContext);
  const [orderDetails, setOrderDetails] = useState(cartService.currentOrder);
  const [isLoading, setIsLoading] = useState(false);
  // const [query, setQuery] = useState("");
  const history = useHistory();
  const { addToast } = useToasts();

  // sets waiter when component mounts
  const setWaiter = () => {
    const user = authService.currentUser;
    cartService.setWaiter(user.id, user.name);
    setOrderDetails(cartService.currentOrder); // reset the order details after setting waiter details
  };

  const {
    // meals,
    payment_status = false,
    payment_method,
    staff = "",
    // waiter_id,
  } = orderDetails;

  useEffect(() => {
    setWaiter();
    getStaff();

    // console.log(cartService.meals);
    // createOrder()

    // eslint-disable-next-line
  }, []);

  // delete item from cart
  const deleteFromCart = (id) => {
    cartService.deleteItem(id);
  };

  // const {data, item} = cartService.meals

  // cart items
  cartService.meals.forEach((meal) => {
    meal.price = meal.price.replace(",", "");
    // meal.quantity = meal.quantity.replace(',','')
  });

  const cartitems = cartService.meals.map((meal) => (
    <tr key={nanoid()}>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left">
        {meal.item}
      </td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
        &#8358; {meal.price}
      </td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
        {meal.quantity}
      </td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
        &#8358; {meal.quantity * meal.price}
      </td>
      <td className="border-t-0 px-6 text-red-500 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 cursor-pointer">
        <i
          className="fas fa-trash mr-4"
          
          onClick={() => deleteFromCart(meal.id)}
        ></i>
      </td>
    </tr>
  ));

  const orders = cartService.meals;

  const { item_ids, items, desc, category, prices, ref_code } = {
    item_ids: orders.map((item) => item.id).toString(),
    items: orders.map((item) => item.item).toString(),
    desc: orders.map((quantity) => quantity.quantity).toString(),
    category: orders.map((category) => category.category).toString(),
    prices: orders.map((prices) => prices.price).toString(),
    ref_code: parseInt(cartService.total),
  };

  const quantity = desc;

  // on change function
  const handleChange = (e) => {
    const { value, name } = e.target;

    setOrderDetails({ ...orderDetails, [name]: value });
  };

  // payment toggle
  const togglePaymentStatus = () => {
    const status = payment_status === false ? true : false;
    if (status === true) {
      setOrderDetails({
        ...orderDetails,
        payment_status: status,
        payment_method,
      });
      // console.log(
      //   items,
      //   quantity,
      //   category,
      //   prices,
      //   payment_status,
      //   payment_method,
      //   staff
      // );
    } else {
      // console.log(
      //   items,
      //   quantity,
      //   category,
      //   prices,
      //   payment_status,
      //   payment_method,
      //   staff,
      //   ref_code
      // );
      setOrderDetails({ ...orderDetails, payment_status: status });
    }
    // console.log(payment_method);
  };

  const getStaff = async () => {
    try {
      setIsLoading(true);
      const response = await apiService.getUsers();
      const { data } = response;
      staffService.setStaff([...data]);
      // console.log(data);
      // refreshStaff()
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

  const dropdownData = staffService.allStaff;

  let options = dropdownData.map((data) => (
    <option key={data.id} value={data.first_name + " " + data.last_name}>
      {data.first_name} {data.last_name}
    </option>
  ));

  // handle submit function
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      if (!staff) {
        addToast("Select staff", {
          appearance: "error",
          autoDismiss: true,
        });
        return;
      }

      setIsLoading(true);
      await apiService.createOrder({
        item_ids,
        items,
        quantity: quantity,
        category,
        prices,
        payment_status,
        payment_method,
        staff,
        ref_code,
      });

      // ;await apiService.createOrder({
      //   items,
      //   quantity: desc,
      //   category,
      //   prices,
      //   status,
      //   payment_status,
      //   payment_method,
      //   staff,
      //   // waiter_name,
      //   // waiter_id,
      // });
      // const { data } = response.data;
      // console.log(data)
      await cartService.resetCart();
      addToast("Order successful", {
        appearance: "success",
        autoDismiss: true,
      });

      history.push("/dashboard"); // Redirect to menu on success
    } catch (error) {
      const message = apiService.getErrorMessage(error); // the getErrorMessage is a helper function to get the exact messages from the server
      addToast(message, {
        appearance: "error",
        autoDismiss: true,
      });
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? <FullScreenLoader /> : <></>}
      <div className="relative flex flex-col xl:w-8/12 mx-auto min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between items-center">
            <h6 className="text-gray-800 text-xl font-bold"> Cart Order</h6>
            <Link
              className="bg-blue-800 custom-btn text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ml-3 ease-linear transition-all duration-150"
              type="button"
              to="/dashboard/cartmenu"
            >
              Back
            </Link>
          </div>
        </div>
        <div className="flex-auto px-2 lg:px-10 py-10">
          {cartService.meals.length !== 0 ? (
            <>
              <h6 className="text-gray-500 text-sm mb-6 ml-2 lg:ml-0 font-bold uppercase">
                Order Information
              </h6>
              <div className="overflow-x-auto overflow-y-auto">
                <table className="items-center w-full bg-transparent border-collapse">
                  <thead className="thead-light px-6 py-6 rounded-t bg-white">
                    <tr>
                      <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                        Item
                      </th>
                      <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                        Price
                      </th>
                      <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                        Quantity
                      </th>
                      <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                        SUBTOTAL
                      </th>
                      <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-center">
                        Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-800">
                    {cartitems}
                    <tr>
                      <th className="border-t-0 font-semibold uppercase bg-gray-100 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left">
                        Total
                      </th>
                      <td className="border-t-0 font-semibold bg-gray-100 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                        &#8358; {cartService.total}
                      </td>
                      <td className="border-t-0 bg-gray-100 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4"></td>
                      <td className="border-t-0 bg-gray-100 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4"></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <hr className="mt-6 border-b-1 border-gray-400" />

              <div className="w-full flex flex-wrap my-6">
                {/* <div className='w-full lg:w-8/12 flex flex-col'>
                    <input
                      type="text"
                      name="search"
                      value={query}
                      className="form-input text-gray-700 p-5 rounded-lg search-input"
                      placeholder="Search by Customer Phone Number"
                      onChange={onFilterChange}
                    />
                    {
                      !query ? "" : !customersFilter.length && (
                        <small className="text-red-500 text-xs font-bold mt-3">
                          Not yet a customer, add customer?
                        </small>
                      )
                    }

                  </div> */}
                <div className="relative w-full mb-3  px-6">
                  <label className="block">
                    <span className="block uppercase text-gray-700 text-xs font-bold mb-2">
                      Select Staff
                    </span>
                  </label>
                  <select
                    required
                    onChange={handleChange}
                    name="staff"
                    className="form-select block w-full placeholder-gray-400 text-gray-700 bg-white rounded my-4 p-3"
                  >
                    <option>Staff</option>
                    {options}
                  </select>
                </div>
                <label className="flex items-center justify-end lg:w-4/12 text-gray-800 px-6 py-5">
                  <input
                    type="checkbox"
                    name="payment_status"
                    className="form-checkbox text-green-500"
                    value={payment_status}
                    checked={payment_status === true}
                    onChange={togglePaymentStatus}
                  />
                  <span className="ml-2 hidden md:block">Mark as</span>
                  <span className="ml-2">Paid</span>
                </label>{" "}
                {/* <label className="flex items-center justify-end lg:w-4/12 text-gray-800 px-6 py-5">
                  <input
                    type="radio"
                      name="paymentstatus"
                    value={payment_status}
                    className="form-checkbox text-green-500"
                    defaultChecked={payment_status === 'false'}
                    onChange={togglePaymentStatus}
                  />
                  <span className="ml-2 hidden md:block">Mark as</span>
                  <span className="ml-2">Unpaid</span>
                </label> */}
              </div>

              <form
                onSubmit={handleSubmit}
                className="flex flex-wrap mt-3 mb-6 px-6"
              >
                {/* {payment_status === "pending" && ( */}
                <div className= "w-full lg:w-6/12 px-">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-700 text-xs font-bold mb-2"
                      htmlFor="payment method"
                    >
                      Payment Method
                    </label>
                    <select
                      className="form-select block w-full placeholder-gray-400 text-gray-700 bg-white rounded my-4 p-3"
                      onChange={handleChange}
                      name="payment_method"
                      value={payment_method}
                    >
                      <option value="">Select Payment Method</option>
                      <option value="pending">Pending</option>
                      <option value="cash">Cash</option>
                      <option value="pos">POS</option>
                      <option value="transfer">Transfer</option>
                    </select>
                  </div>
                </div>
                <div className="w-full text-center flex justify-center items-center py-6">
                  <button
                    className={
                      (staff === "" ? "bg-gray-700" : "bg-blue-500") +
                      " text-white active:bg-green-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 flex items-center"
                    }
                    type="submit"
                    // disabled={payment_status === "pending"}
                  >
                    <i className="fas fa-clipboard-check mr-4"></i>
                    Confirm Order
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex justify-center items-center flex-col">
              <p className="py-5 px-6 font-bold text-red-500">
                Oops, add items to your cart!
              </p>

              <img
                src={cartSvg}
                alt="empty cart"
                className="w-1/2 object-fit"
              />
            </div>
          )}
        </div>
      </div>
      {/*  {
                    customersFilter.length && (
                      <>
                        <div className="w-full lg:w-6/12 px-4">
                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-gray-700 text-xs font-bold mb-2"
                              htmlFor="customer name"
                            >
                              Customer Name
                            </label>
                            <input
                              className="px-3 py-3 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150 text-capitalize mb-2"
                              name='customer_name'
                              placeholder="Customer Name"
                              value={customer_name}
                              disabled
                            />
                          </div>
                        </div> 
                        <div className="w-full lg:w-6/12 px-4">
                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-gray-700 text-xs font-bold mb-2"
                              htmlFor="customer name"
                            >
                              Customer Phone Number
                            </label>

                            <input
                              className="px-3 py-3 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150 text-capitalize mb-2"
                              name='customer_phone'
                              placeholder="Customer Phone"
                              value={customer_phone}
                              disabled
                            />

                          </div>
                        </div>
                      </>
                    )
                  }


                 <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                        htmlFor="customer name"
                      >
                        Customer Phone Number
                      </label>
                      {
                        !customersFilter.length ? (
                          <input
                            className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150 text-capitalize mb-2"
                            placeholder="Customer Phone"
                            name='customer_name'
                            value={customer_name}
                            onChange={handleChange}
                            required
                          />
                        ) : (
                          <input
                            className="px-3 py-3 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150 text-capitalize mb-2"
                            name='customer_name'
                            placeholder="Customer Phone"
                            value={filteredCustomer.phoneNumber}
                            disabled
                          />
                        )
                      }
                    </div>
                  </div> 

// search result
  // let customersFilter = [];

  // let filteredCustomer;

  // const setSearchResult = () => {
  //   if (customersFilter.length) {
  //     filteredCustomer = customersFilter[0];
  //   }

  //   if (filteredCustomer) {
  //     console.log(filteredCustomer)
  //     setOrderDetails({ ...orderDetails, customer_name: filteredCustomer.fullName, customer_phone: filteredCustomer.phoneNumber });
  //   }
  // }

  // search filter
  // const onFilterChange = (e) => {
  //   if (e.target.name === "search") {
  //     setQuery(e.target.value)
  //   }

  //   customersFilter = customers.filter((customer) => customer.phoneNumber === e.target.value)

  //   setSearchResult(customersFilter)

  // }*/}
    </>
  );
});

export default CheckoutCard;
