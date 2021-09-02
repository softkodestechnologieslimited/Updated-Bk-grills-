import React, { useState, useEffect, useContext } from "react";
import "./drinksmenuitems.styles.scss";
// import img from "../../assets/img/team-3-800x800.jpg";
import { useToasts } from "react-toast-notifications";
import { nanoid } from "nanoid";
import AdminMenuItem from "../../components/MenuItem/AdminMenuItem.js";
import FullScreenLoader from "../../components/fullScreenLoader";
import Pagination from "../../components/Pagination/Pagination";
import apiService from "context/apiService";
import { AppStateContext } from "../../context";

// import { Link } from "react-router-dom";

const DrinksMenuItems = ({ menuItems }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [meals, setMeals] = useState([]);
  const [category, setCategory] = useState("");
  const [orderModal, setOrderModal] = useState(false);
  const [mealsPerPage] = useState(10);
  const { addToast } = useToasts();

  const { cartService } = useContext(AppStateContext);

  const getMeals = async () => {
    try {
      setIsLoading(true);
      const response = await apiService.getMeals();
      setMeals(response.data.filter((meal) => meal.status === true));
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
  const handleShowModal = () => {
    setOrderModal((prev) => (prev = true));
  };

  const closeOrderModal = () => {
    setOrderModal((prev) => (prev = false));
  };

  const filteredMeals = meals.filter((meal) => {
    if (!query && category) {
      return meal.category === category;
    }

    if (query && !category) {
      return meal.item.toLowerCase().includes(query);
    }

    if (query && category) {
      return (
        meal.item.toLowerCase().includes(query) && meal.category === category
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

  useEffect(() => {
    getMeals();
    //eslint-disable-next-line
  }, []);

  const indexOfLastMeal = currentPage * mealsPerPage;
  const indexOfFirstMeal = indexOfLastMeal - mealsPerPage;
  const currentMeals = filteredMeals.slice(indexOfFirstMeal, indexOfLastMeal);
  const isLastPage = indexOfLastMeal >= filteredMeals.length;

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
    <tr className="justify-center" key={nanoid()}>
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

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {isLoading ? <FullScreenLoader /> : <></>}
      <div className="body-con">
        <div className="relative px-4 md:px-10 mx-auto h-90 w-full md:pt-32 pt-12 md:mt-0 mt-24 z-9999">
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
                f
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
        <div
          onClick={handleShowModal}
          className={"" + cartService.meals.length >= 1 ? "tooltip" : ""}
        >
          <p>{cartService.meals.length}</p>
        </div>

        {orderModal === true ? (
          <form className="orderModal">
            <h2>Order Menu</h2>
            {cartitems}

            <div className="table_no">
              <label for="table_no">Table Number</label>
              <input type="number" name="table_no" required />
            </div>
            <div className="submit">
              <p onClick={closeOrderModal}>close</p>
              <button className="btn btn-bordered">order</button>
            </div>
          </form>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default DrinksMenuItems;
