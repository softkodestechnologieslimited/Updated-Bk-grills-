import React from "react";
import { formatter } from "../../utils";

// components

const DrinkTable = ({ drinks }) => {
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
                Drinks Menu
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {
            drinks.length !== 0 ? (
              <table className="items-center w-full bg-transparent border-collapse">
                <thead>
                  <tr>
                    <th
                      className=
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left bg-gray-100 text-gray-600 border-gray-200"
                    >
                      Name
                </th>
                    <th
                      className=
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left bg-gray-100 text-gray-600 border-gray-200"
                    >
                      Description
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
                    >
                      Status
                </th>
                    {/* <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left bg-gray-100 text-gray-600 border-gray-200"></th> */}
                  </tr>
                </thead>
                <tbody>
                  {drinks.map((drink, idx) => (
                    <tr key={idx}>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left flex items-center">
                        <span
                          className=
                          "font-bold text-gray-700"
                        >
                          {drink.title}
                        </span>
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                        {drink.description}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                        {formatter.format(drink.price)}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                        <i className="fas fa-circle text-green-500 mr-2"></i> Available
                </td>
                    </tr>
                  ))
                  }
                </tbody>
              </table>
            ) : (
              <p className="py-5 px-6 font-bold">No Drinks available!</p>
            )
          }


        </div>
      </div>
    </>
  );
};


export default DrinkTable;
