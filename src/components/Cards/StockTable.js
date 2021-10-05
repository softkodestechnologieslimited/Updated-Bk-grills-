import { AppStateContext } from "context/index.js";
import React, { useContext } from "react";

// components
import StockmenuDropdown from "../Dropdowns/StockmenuDropdown.js";

const StockTable = ({
  meals,
  refresh,
  user,
  openModal,
  deleted,
  threshold,
}) => {
  const { authService } = useContext(AppStateContext);

  const { currentUser } = authService;
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
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
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
                {currentUser.user_type === "admin" ? (
                  <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left bg-gray-100 text-gray-600 border-gray-200">
                    Action
                  </th>
                ) : (
                  ""
                )}
              </tr>
            </thead>
            <tbody>
              {meals.map((meal, idx) => {
                return (
                  <tr key={idx}>
                    <th className="border-t-0 px-6 text-capitalize align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left">
                      <span className="font-bold text-gray-700">{meal.item}</span>
                    </th>
                    <td className="border-t-0 text-capitalize px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                      {meal.category}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                      {(() => {
                        if (meal.status === true && meal.desc >= 10) {
                          return (
                            <i className="fas fa-circle mr-2 text-green-500"></i>
                          );
                        } else if (meal.status === true && meal.desc <= 10) {
                          return (
                            <i className="fas fa-circle mr-2 text-orange-500"></i>
                          );
                        } else {
                          return <i className="fas fa-circle mr-2"></i>;
                        }
                      })()}

                      {/* <i
              className={
                "fas fa-circle mr-2 " +
                (meal.status === true
                  ? "text-green-500"
                  : "text-yellow-500")
              }
            ></i> */}

                      {(() => {
                        if (meal.status === true && meal.desc >= 10) {
                          return "Available";
                        } else if (meal.status === true && meal.desc <= 10) {
                          return "Low in Stock";
                        } else if (meal.status === false && meal.desc <= 0) {
                          return "Out of Stock";
                        } else if (meal.status === true & meal.desc >= 1 || meal.status === false & meal.desc >= 1) {
                          return "error, check quantity";
                        }
                      })()}

                      {/* {meal.status === true ? "Available" : "Out of Stock"} */}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                      {/* {meal.quantity || ( */}
                      <span className="">{meal.desc}</span>
                      {/* )} */}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                      &#8358;{meal.price}
                    </td>
                    {currentUser.user_type === "admin" ? (
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left">
                        <StockmenuDropdown
                          id={meal.id}
                          refresh={refresh}
                          deleted={deleted} />
                      </td>
                    ) : (
                      ""
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default StockTable;
