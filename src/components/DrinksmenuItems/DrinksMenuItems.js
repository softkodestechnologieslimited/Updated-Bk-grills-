import React, { useState, useEffect } from "react";
import "./drinksmenuitems.styles.scss";
// import img from "../../assets/img/team-3-800x800.jpg";
import { useToasts } from "react-toast-notifications";
import AdminMenuItem from "../../components/MenuItem/AdminMenuItem.js";
import FullScreenLoader from "../../components/fullScreenLoader";
import Pagination from "../../components/Pagination/Pagination";
import apiService from "context/apiService";

// import { Link } from "react-router-dom";

const DrinksMenuItems = ({ menuItems }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [meals, setMeals] = useState([]);
  const [mealsPerPage] = useState(10);
  const { addToast } = useToasts();

  const getMeals = async () => {
    try {
      setIsLoading(true);
      const response = await apiService.getMeals();
      setMeals(response.data);
      console.log(response);
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
  const filteredMeals = meals.filter((meal) => meal.status === true);

  useEffect(() => {
    getMeals();
    //eslint-disable-next-line
  }, []);

  const indexOfLastMeal = currentPage * mealsPerPage;
  const indexOfFirstMeal = indexOfLastMeal - mealsPerPage;
  const currentMeals = filteredMeals.slice(indexOfFirstMeal, indexOfLastMeal);
  const isLastPage = indexOfLastMeal >= filteredMeals.length;

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {isLoading ? <FullScreenLoader /> : <></>}
      <div className="">
        <div className="relative px-4 md:px-10 mx-auto h-90 w-full md:pt-32 pt-12 md:mt-0 mt-24 z-9999">
          <div className="px-4 flex flex-wrap justify-between">
            <form className="w-full lg:w-6/12 mx-auto">
              <input
                type="text"
                name="search"
                // value={query}
                className="form-input text-gray-700 mt-1 block w-full my-4 p-5 rounded-lg"
                placeholder="Search for meals or drinks"
                // onChange={onFilterChange}
              />
            </form>
            <div className="flex w-full lg:w-4/12 items-center lg:justify-start justify-between mx-4">
              <label
                className="block text-white font-bold mr-3"
                htmlFor="category"
              >
                <i className="fas fa-filter"></i> Filter by
              </label>
              <select
                name="category"
                f
                // onChange={onFilterChange}
                className="form-select block w-6/12 placeholder-gray-400 text-gray-700 bg-white rounded my-4 p-3"
              >
                <option value="" defaultValue>
                  Category
                </option>
                <option value="food">Food</option>
                <option value="drinks">Drinks</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap mt-4">
            <div className="w-full mb-12">
              {/* <Pulse> */}
              <div className="flex flex-wrap mt-8">
                {currentMeals.length !== 0 ? (
                  currentMeals.map((meal, idx) => (
                    <AdminMenuItem meal={meal} key={idx} />
                  ))
                ) : (
                  <div className="w-full flex justify-center">
                    <p className="py-5 px-6 font-bold text-xl text-red-500">
                      No Item found!
                    </p>
                  </div>
                )}
              </div>
              {/* </Pulse> */}
            </div>
          </div>

          <>
            {currentMeals.length ? (
              <div className="flex justify-center w-full">
                <p className="my-4 text-gray-900 font-bold">
                  Showing{" "}
                  {`${indexOfFirstMeal + 1} - ${
                    isLastPage ? filteredMeals.length : indexOfLastMeal
                  }`}{" "}
                  of {filteredMeals.length}
                </p>
              </div>
            ) : (
              ""
            )}
          </>

          {currentMeals.length !== 0 ? (
            <div className="flex justify-center w-full">
              <Pagination
                itemsPerPage={mealsPerPage}
                totalItems={filteredMeals.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
  // return (
  //   <div className="menu-wrap">
  //     {/* <h1 className="menu-title">drinks menu</h1> */}

  //     <div className="menu-items-wrapper">
  //       {/* <h1 className="menu-sub-title">cigarettes & shisha</h1> */}
  //       <div className="menu-items-flex">
  //         {menuItems.map((menuItems, idx) => (
  //           <div className="menu-item-con" key={idx}>
  //             <div className="menu-items">
  //               <div className="menu-items-pad">
  //                 <div className="menu">
  //                   <div className="menu-img">
  //                     <img src={menuItems.picture ? menuItems.piture : img} alt="menu item" title="menu-item" />
  //                   </div>

  //                   <div className="menu-text">
  //                     <span>
  //                       <h1>{menuItems.title}</h1>

  //                       <p>{menuItems.price}</p>
  //                     </span>

  //                     <span>
  //                       <p>
  //                        {menuItems.desc}
  //                       </p>

  //                       {/* <p>garlic, vegetable, bread</p> */}
  //                     </span>
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default DrinksMenuItems;
