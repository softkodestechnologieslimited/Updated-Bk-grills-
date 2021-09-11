import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import apiService from "../../context/apiService";
import { AppStateContext } from "../../context";
import { useToasts } from "react-toast-notifications";
import ReactToPrint from "react-to-print";
// import { format } from "date-fns";
import FullScreenLoader from "../../components/fullScreenLoader";
import logo from "../../assets/img/new-logo.jpeg";

const ReceiptCard = () => {
  const [orderDetails, setOrderDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const history = useHistory();
  const { id } = params;
  const { orderService } = useContext(AppStateContext);
  const { addToast } = useToasts();

  const receiptRef = useRef();

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

    // eslint-disable-next-line
  }, []);

  const {ordered_date, payment_method, payment_status, staff, ref_code} =
    orderDetails;

  return (
    <>
      {isLoading ? <FullScreenLoader /> : <></>}
      <div className="relative flex flex-col xl:w-8/12 mx-auto min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between itemss-center">
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
        <div className="flex-auto px-2 lg:px-10 py-10 pt-0" ref={receiptRef}>
          <div className="my-6 w-6/12 mx-auto">
            <img src={logo} alt="logo" className="mx-auto" />
          </div>

          <h6 className="text-black text-sm mt-3 mb-6 font-bold uppercase">
            Order Information
          </h6>

          <table className="items-center w-full bg-transparent border-collapse">
            <thead className="thead-light">
              <tr>
                <th className="px-3 bg-gray-100 text-black align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                  Item
                </th>
                <th className="px-3 bg-gray-100 text-black align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                  Quantity
                </th>
                <th className="px-3 bg-gray-100 text-black align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                  Price
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
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
                              </li>
                            </ul>
                          ))}
                      </>
                    </td>
                    <td className="text-black font-bold flex-auto text-center">
                      <>
                        {[orderDetails.quantity]
                          .join()
                          .split(",")
                          .map((quantity, idx) => (
                            <ul className="flex-1" key={idx}>
                              <li className=" border-t-0 px-6 align-middle border-l-0 border-r-0 text-s whitespace-no-wrap p-4 text-left">
                                {quantity}
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
                  <tr className="py-5 text-black flex-auto border-t-0 font-semibold px-2 align-middle border-l-0 border-r-0 text-m whitespace-no-wrap py-4">
                  TOTAL: &#8358;{ref_code}
                </tr>
            </tbody>
          </table>

          <hr className="mt-6 border-b-1 border-gray-400" />

          <div className="flex flex-wrap mt-3 mb-6">
            {/* <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <span className="block uppercase text-gray-700 text-xs font-bold mb-2">
                  Items
                </span>
                <p className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150 text-capitalize">
                  {items}
                </p>
              </div>
            </div> */}
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <span className="block uppercase text-black text-xs font-bold mb-2">
                  Staff Name
                </span>
                <p className="px-3 py-3 placeholder-black font-bold text-black rounded text-sm focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150 text-capitalize">
                  {staff}
                </p>
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <span className="block uppercase text-black text-xs font-bold mb-2">
                  Payment Method
                </span>
                <p className="px-3 py-3 placeholder-black font-bold text-black  rounded text-sm focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150 text-capitalize">
                  {payment_method}
                </p>
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <span className="block uppercase text-black text-xs font-bold mb-2">
                  Payment Status
                </span>
                <p className="px-3 py-3 placeholder-black font-bold text-black  rounded text-sm focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150 text-capitalize">
                  {
                    payment_status === true ? <p>paid</p> : <p>unpaid</p>
                  }
                </p>
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <span className="block uppercase text-black text-xs font-bold mb-2">
                  Date
                </span>
                <p className="px-3 py-3 placeholder-black font-bold text-black rounded text-sm focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150 text-capitalize">
                  {/* {format(new Date(1623000000), "MM/dd/yyyy 'at' h:mm:ss a")} */}
                  {new Date(ordered_date).toLocaleString('en-US')}
                </p>
              </div>
            </div>
          </div>

          <p className="px-3 py-3 text-gray-800 font-bold text-center">
            Thanks for patronizing us.
          </p>
        </div>

        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-center itemss-center">
            <ReactToPrint
              trigger={() => (
                <button
                  className="bg-blue-800 custom-btn text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 flex itemss-center"
                  type="button"
                >
                  <i className="fas fa-print mr-4"></i>
                  Print
                </button>
              )}
              content={() => receiptRef.current}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ReceiptCard;
