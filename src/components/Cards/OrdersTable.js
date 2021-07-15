import React, { useContext } from "react";
import { AppStateContext } from "../../context";

// components
import OrderDropdown from "../Dropdowns/OrderDropdown.js";

<<<<<<< HEAD
const OrderTable = ({ orders, refresh, deleted }) => {
=======
const OrderTable = ({ orders, refresh }) => {
>>>>>>> 24b52f90c601d2036fd49e3f6c8671e0b2458928
  const { authService } = useContext(AppStateContext);
  const { currentUser } = authService;


  return (
    <>
      <div
        className=
        "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white text-gray-800"
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
<<<<<<< HEAD
            <div className="relative w-full px-4 max-w-full flex-grow flex-1 py-2">
=======
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
>>>>>>> 24b52f90c601d2036fd49e3f6c8671e0b2458928
              {currentUser.role === 'admin' ? (
                <h3
                  className=
                  "font-semibold text-lg text-gray-800"
                >
                  All Orders
                </h3>
              ) : (
                <h3
                  className=
                  "font-semibold text-lg text-gray-800"
                >
                  My Orders
                </h3>
              )}

            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  className=
                  "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left bg-gray-100 text-gray-600 border-gray-200"
                >
                  Customer Name
                </th>
                <th
                  className=
                  "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left bg-gray-100 text-gray-600 border-gray-200"
                >
                  Order Status
                </th>
                <th
                  className=
                  "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left bg-gray-100 text-gray-600 border-gray-200"
                >
                  Payment Status
                </th>
                <th
                  className=
                  "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left bg-gray-100 text-gray-600 border-gray-200"
                >
                  Payment Method
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left bg-gray-100 text-gray-600 border-gray-200 " + (currentUser.role === 'waiter' ? "hidden" : "block")}
                >
                  Waiter Name
                </th>
                <th
                  className=
                  "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left bg-gray-100 text-gray-600 border-gray-200"
                >
                  Amount
                </th>
                <th
                  className=
                  "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left bg-gray-100 text-gray-600 border-gray-200"
<<<<<<< HEAD
                >Action</th>
=======
                ></th>
>>>>>>> 24b52f90c601d2036fd49e3f6c8671e0b2458928
              </tr>
            </thead>
            <tbody>
              {
                orders.map((order, idx) => (
                  <tr key={idx}>
<<<<<<< HEAD
                    <th className="border-t-0 px-6 align-middle text-capitalize border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left">
=======
                    <th className="border-t-0 px-6 align-middle text-capitalize border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left flex items-center">
>>>>>>> 24b52f90c601d2036fd49e3f6c8671e0b2458928
                      <span
                        className=
                        "ml-3 font-bold text-gray-700"
                      >
                        {order.customer_name}
                      </span>
                    </th>
                    <td className="border-t-0 px-6 text-capitalize align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                      <i className={"fas fa-circle mr-2 " + (order.status === "completed" ? "text-green-500" : "text-orange-500")}></i> {order.status}
                    </td>
                    <td className="border-t-0 px-6 text-capitalize align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                      <i className={"fas fa-circle mr-2 " + (order.payment_status === "complete" ? "text-green-500" : "text-orange-500")}></i>
                      {order.payment_status}
                    </td>
                    <td className="border-t-0 px-6 text-capitalize align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                      {order.payment_method || "Nil"}
                    </td>
                    <td className={"border-t-0 px-6 text-capitalize align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 " + (currentUser.role === 'waiter' ? "hidden" : "block")}>
                      {order.waiter_name}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                      &#8358;{order.total}
                    </td>
<<<<<<< HEAD
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left">
                      <OrderDropdown refresh={refresh} id={order.id} orderStatus={order.status} deleted={deleted} />
=======
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-right">
                      <OrderDropdown refresh={refresh} id={order.id} orderStatus={order.status} />
>>>>>>> 24b52f90c601d2036fd49e3f6c8671e0b2458928
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};


export default OrderTable;
