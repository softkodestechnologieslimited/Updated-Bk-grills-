import React from "react";

// components
import StockmenuDropdown from "../Dropdowns/StockmenuDropdown.js";

<<<<<<< HEAD
const StockTable = ({
  meals,
  refresh,
  user,
  openModal,
  deleted,
  threshold,
}) => {
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white text-gray-800">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 py-3 max-w-full flex-grow flex-1">
              {deleted ? (
                <h3 className="font-semibold text-lg text-gray-800">
                  Deleted Stock Menu
                </h3>
              ) : (
                <h3 className="font-semibold text-lg text-gray-800">
                  Stock Menu
                </h3>
              )}
            </div>
            {user.role === "superAdmin" && (
              <button onClick={() => openModal()}>
                <i className="fas fa-cogs fa-2x mr-4"></i>
              </button>
            )}
=======
const StockTable = ({ meals, refresh }) => {
  return (
    <>
      <div
        className=
        "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white text-gray-800"
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className=
                "font-semibold text-lg text-gray-800"
              >
                Stock Menu
              </h3>
            </div>
>>>>>>> 24b52f90c601d2036fd49e3f6c8671e0b2458928
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
<<<<<<< HEAD
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left bg-gray-100 text-gray-600 border-gray-200">
                  Item
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left bg-gray-100 text-gray-600 border-gray-200">
                  Category
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left bg-gray-100 text-gray-600 border-gray-200">
                  Status
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left bg-gray-100 text-gray-600 border-gray-200">
                  Quantity
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left bg-gray-100 text-gray-600 border-gray-200">
                  Price
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left bg-gray-100 text-gray-600 border-gray-200">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {meals.map((meal, idx) => (
                <tr key={idx}>
                  <th className="border-t-0 px-6 text-capitalize align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left">
                    <span className="font-bold text-gray-700">
                      {meal.title}
                    </span>
                  </th>
                  <td className="border-t-0 text-capitalize px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                    {meal.category}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                    <i
                      className={
                        "fas fa-circle mr-2 " +
                        (meal.quantity >= threshold || meal.inStock
                          ? "text-green-500"
                          : "text-yellow-500")
                      }
                    ></i>

                    {meal.quantity >= threshold || meal.inStock
                      ? "Available"
                      : "low in Stock"}
                  </td>
                  <td className="border-t-0 text-capitalize px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                    {meal.quantity || (
                      <span className="font-bold text-xl">-</span>
                    )}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                    &#8358;{meal.price}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left">
                    <StockmenuDropdown
                      id={meal.id}
                      refresh={refresh}
                      deleted={deleted}
                    />
                  </td>
                </tr>
              ))}
=======
                <th
                  className=
                  "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left bg-gray-100 text-gray-600 border-gray-200"
                >
                  Item
                </th>
                <th
                  className=
                  "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left bg-gray-100 text-gray-600 border-gray-200"
                >
                  Category
                </th>
                <th
                  className=
                  "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left bg-gray-100 text-gray-600 border-gray-200"
                >
                  Status
                </th>
                <th
                  className=
                  "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left bg-gray-100 text-gray-600 border-gray-200"
                >
                  Quantity
                </th>
                <th
                  className=
                  "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left bg-gray-100 text-gray-600 border-gray-200"
                >
                  Price
                </th>
                <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left bg-gray-100 text-gray-600 border-gray-200"></th>
              </tr>
            </thead>
            <tbody>
              {
                meals.map((meal, idx) => (
                  <tr key={idx}>
                    <th className="border-t-0 px-6 text-capitalize align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left flex items-center">
                      <span
                        className=
                        "font-bold text-gray-700"
                      >
                        {meal.title}
                      </span>
                    </th>
                    <td className="border-t-0 text-capitalize px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                      {meal.category}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                      <i className={"fas fa-circle mr-2 " + (meal.inStock ? "text-green-500" : "text-red-500")}></i>
                      {meal.inStock ? "Available" : "Out of Stock"}
                    </td>
                    <td className="border-t-0 text-capitalize px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                      {meal.quantity || <span className="font-bold text-xl">-</span>}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                      &#8358;{meal.price}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-right">
                      <StockmenuDropdown id={meal.id} refresh={refresh} />
                    </td>
                  </tr>
                ))
              }
>>>>>>> 24b52f90c601d2036fd49e3f6c8671e0b2458928
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

<<<<<<< HEAD
=======

>>>>>>> 24b52f90c601d2036fd49e3f6c8671e0b2458928
export default StockTable;
