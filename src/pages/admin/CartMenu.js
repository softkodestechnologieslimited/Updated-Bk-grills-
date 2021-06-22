import React, { useContext, useEffect, useState } from "react";
import { AppStateContext } from "../../context";
import apiService from "../../context/apiService";
import { useToasts } from "react-toast-notifications";
import { observer } from "mobx-react-lite";
import Pulse from "react-reveal/Pulse";

// components
import AdminNavbar from "../../components/Navbars/AdminNavbar.js";
import Sidebar from "../../components/Sidebar/Sidebar.js";
import FooterAdmin from "../../components/Footers/FooterAdmin.js";
import AdminMenuItem from "../../components/MenuItem/AdminMenuItem.js";
import FullScreenLoader from "../../components/fullScreenLoader";
import Pagination from "../../components/Pagination/Pagination";

const CartMenu = observer(() => {
  const { mealService } = useContext(AppStateContext);
  const [meals, setMeals] = useState(
    mealService.meals.filter(
      (meal) => meal.inStock === "true" && meal.deleted !== true
    )
  );
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [mealsPerPage] = useState(10);
  const { addToast } = useToasts();

  useEffect(() => {
    if (meals.length) return;

    getItems();

    // eslint-disable-next-line
  }, []);

  const getItems = async () => {
    try {
      setIsLoading(true);
      const response = await apiService.getMeals();
      const { data } = response.data;

      // console.log(data);

      const inStockMeals = data.filter(
        (meal) => meal.inStock === "true" && meal.deleted !== true
      );
      setMeals(inStockMeals);

      mealService.setMeals([...data]);
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

  const filteredMeals = meals.filter((meal) => {
    if (!query && category) {
      return meal.category === category;
    }

    if (query && !category) {
      return meal.title.toLowerCase().includes(query);
    }

    if (query && category) {
      return (
        meal.title.toLowerCase().includes(query) && meal.category === category
      );
    }

    return meal;
  });

  const onFilterChange = (e) => {
    if (e.target.name === "search") {
      setQuery(e.target.value.toLowerCase());
    } else if (e.target.name === "category") {
      setCategory(e.target.value.toLowerCase());
    }

    setCurrentPage(1);
  };

  // Get current meals
  const indexOfLastMeal = currentPage * mealsPerPage;
  const indexOfFirstMeal = indexOfLastMeal - mealsPerPage;
  const currentMeals = filteredMeals.slice(indexOfFirstMeal, indexOfLastMeal);
  const isLastPage = indexOfLastMeal >= filteredMeals.length;

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {isLoading ? <FullScreenLoader /> : <></>}
      <Sidebar />
      <div className="relative md:ml-64 bg-gray-900">
        <AdminNavbar />
        <div className="relative px-4 md:px-10 mx-auto h-90 w-full md:pt-32 pt-12 md:mt-0 mt-24">
          <div className="px-4 flex flex-wrap justify-between">
            <form className="w-full lg:w-6/12 mx-auto">
              <input
                type="text"
                name="search"
                value={query}
                className="form-input text-gray-700 mt-1 block w-full my-4 p-5 rounded-lg"
                placeholder="Search for meals or drinks"
                onChange={onFilterChange}
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
                onChange={onFilterChange}
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
              <Pulse>
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
              </Pulse>
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
        <FooterAdmin />
      </div>
    </>
  );
});

export default CartMenu;
