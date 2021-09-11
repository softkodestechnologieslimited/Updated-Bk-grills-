import React, { useState, useEffect, useContext } from "react";
import "./drinksmenuitems.styles.scss";
// import img from "../../assets/img/team-3-800x800.jpg";
import { useToasts } from "react-toast-notifications";
import { useHistory } from "react-router-dom";
import { nanoid } from "nanoid";
import { observer } from "mobx-react-lite";
import AdminMenuItem from "../../components/MenuItem/AdminMenuItem.js";
import FullScreenLoader from "../../components/fullScreenLoader";
import Pagination from "../../components/Pagination/Pagination";
import apiService from "context/apiService";
import { AppStateContext } from "../../context";

// import { Link } from "react-router-dom";

const DrinksMenuItems = observer(({ menuItems }) => {
  const { cartService } = useContext(AppStateContext);
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState(cartService.currentOrder);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [meals, setMeals] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState("");
  const [orderModal, setOrderModal] = useState(false);
  const [mealsPerPage] = useState(10);
  const { addToast } = useToasts();

  useEffect(() => {
    if (cartService.meals.length <= 0) {
      closeOrderModal();
    }
  }, [cartService.meals]);

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
    if (!query && filteredCategory) {
      return meal.category === filteredCategory;
    }

    if (query && !filteredCategory) {
      return meal.item.toLowerCase().includes(query);
    }

    if (query && filteredCategory) {
      return (
        meal.item.toLowerCase().includes(query) &&
        meal.category === filteredCategory
      );
    }

    return meal;
  });

  const onFilterChange = (e) => {
    if (e.target.name === "search") {
      setQuery(e.target.value.toLowerCase());
    } else if (e.target.name === "category") {
      setFilteredCategory(e.target.value.toLowerCase());
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
    <ul className="cartItems" key={nanoid()}>
      <li className="">{meal.item}</li>
      <li className="li_text_center">&#8358; {meal.price}</li>
      <li className="li_text_center">{meal.quantity}</li>
      <li className="li_text_center">&#8358; {meal.quantity * meal.price}</li>
      <li className="">
        <i
          className="fas fa-trash mr-4"
          onClick={() => deleteFromCart(meal.id)}
        ></i>
      </li>
    </ul>
  ));

  const orders = cartService.meals;

  const { table_no} =  orderDetails

  const { item_ids, items, desc, category, prices, ref_code } = {
    item_ids: orders.map((item) => item.id).toString(),
    items: orders.map((item) => item.item).toString(),
    desc: orders.map((quantity) => quantity.quantity).toString(),
    category: orders.map((category) => category.category).toString(),
    prices: orders.map((prices) => prices.price).toString(),
    ref_code: parseInt(cartService.total),
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setOrderDetails({ ...orderDetails, [name]: value });
    console.log(orderDetails);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      await apiService.createOrder({
        item_ids,
        items,
        quantity: desc,
        category,
        prices,
        ref_code,
        table_no
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

      history.push("/menu");
      setIsLoading(false);
      // Redirect to menu on success
    } catch (error) {
      const message = apiService.getErrorMessage(error); // the getErrorMessage is a helper function to get the exact messages from the server
      addToast(message, {
        appearance: "error",
        autoDismiss: true,
      });
      setIsLoading(false);
    }
  };
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
                    <p className="py-5 px-6 font-bold text-xl text-center text-red-500">
                      No Items found, try again.
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
                <p className="my-4 text-white-900 font-bold">
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

        {orderModal === false && (
          <div
            onClick={handleShowModal}
            className={
              cartService.meals.length >= 1 ? "tooltip" : "tooltip_hide"
            }
          >
            <p>{cartService.meals.length}</p>
          </div>
        )}

        {orderModal === true ? (
          <form className="orderModal" onSubmit={handleSubmit}>
            <h2>Order Menu</h2>
            <div className="cartItems_con">{cartitems}</div>

            <div className="details">
              <div className="table_no">
                <label for="table_no">Table Number</label>
                <input
                  onChange={handleChange}
                  type="number"
                  name="table_no"
                  required
                  min="1"
                />
              </div>

              <div className="total">
                <p>&#8358;</p> <p> {" " + cartService.total}</p>
              </div>
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
});

export default DrinksMenuItems;
