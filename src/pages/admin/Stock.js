import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { AppStateContext } from "../../context";
import apiService from "../../context/apiService";
import { useToasts } from "react-toast-notifications";
import Fade from "react-reveal/Fade";
import { Link } from 'react-router-dom'

// components
import StockTable from "../../components/Cards/StockTable.js";
import AdminNavbar from "../../components/Navbars/AdminNavbar.js";
import Sidebar from "../../components/Sidebar/Sidebar.js";
import FooterAdmin from "../../components/Footers/FooterAdmin.js";
import FullScreenLoader from "../../components/fullScreenLoader";
import Pagination from "../../components/Pagination/Pagination";
import StockModal from "components/Modals/StockModal";

const Stock = observer(() => {
  const { authService, mealService } = useContext(AppStateContext);
  const { currentUser } = authService;

  const [isLoading, setIsLoading] = useState(false);
  const [deleted, setIsDeleted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [threshold, setThreshold] = useState(20);

  const [stock, setStock] = useState([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [stockPerPage] = useState(10);
  const { addToast } = useToasts();

  useEffect(() => {
    if (stock.length) {
      refreshStock();
      return;
    }

    getItems();

    // eslint-disable-next-line
  }, []);

  const refreshStock = () => {
    setStock(mealService.meals.filter((meal) => meal.deleted !== true));
  };

  const getItems = async () => {
    try {
      setIsLoading(true);
      const response = await apiService.getMeals();
      const { data } = response;
      console.log(data);
      mealService.setMeals([...data]);
      // setStock([...data])
      refreshStock();
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

  const onFilterChange = (e) => {
    if (e.target.name === "search") {
      setQuery(e.target.value.toLowerCase());
    } else if (e.target.name === "category") {
      setCategory(e.target.value.toLowerCase());
    } else if (e.target.name === "status") {
      setStatus(e.target.value.toLowerCase());
    }

    setCurrentPage(1);
  };

  const filteredStock = stock.filter((stockItem) => {
    if (!query && category) {
      return stockItem.category === category;
    }
    if (!query && status) {
      return stockItem.status === status;
      // return stockItem.status === status; // future change
    }

    if (query && !category && !status) {
      return stockItem.item.toLowerCase().includes(query);
    }

    if (query && category) {
      return (
        stockItem.item.toLowerCase().includes(query) &&
        stockItem.category === category
      );
    }
    if (query && status) {
      return (
        stockItem.item.toLowerCase().includes(query) &&
        stockItem.status === status
      );
    }
    if (query && status && category) {
      return (
        stockItem.item.toLowerCase().includes(query) &&
        stockItem.status === status &&
        stockItem.category === category
      );
    }

    return stockItem;
  });

  // Get current customers
  const indexOfLastStock = currentPage * stockPerPage;
  const indexOfFirstStock = indexOfLastStock - stockPerPage;
  const currentStock = filteredStock.slice(indexOfFirstStock, indexOfLastStock);
  const isLastPage = indexOfLastStock >= filteredStock.length;

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const closeModal = () => setShowModal(false);

  const openModal = () => setShowModal(true);

  const showDeleted = (e) => {
    if (e.target.checked) {
      setIsDeleted(true);
      setStock(mealService.meals.filter((meal) => meal.deleted === true));
    } else {
      setIsDeleted(false);
      refreshStock();
    }
  };

  const updateThreshold = (newThreshold) => {
    setThreshold(newThreshold);
  };

  return (
    <>
      {isLoading ? <FullScreenLoader /> : <></>}
      {showModal ? (
        <StockModal
          onClose={closeModal}
          defaultThreshold={threshold}
          updateThreshold={updateThreshold}
        />
      ) : null}
      <Sidebar />
      <div className="relative md:ml-64 bg-gray-900">
        <AdminNavbar />

        <div className="relative px-4 md:px-10 mx-auto w-full h-90 md:pt-32 pt-12 md:mt-0 mt-24">
          <div className="px-4 flex flex-wrap justify-between xl:w-8/12 mx-auto mb-12">
            <form className="w-full">
              <input
                type="text"
                name="search"
                value={query}
                className="form-input text-gray-700 mt-1 block w-full my-4 p-5 rounded-lg"
                placeholder="Search for meals or drinks"
                onChange={onFilterChange}
              />
            </form>
            <div className="flex flex-wrap w-full items-center justify-between">
              <div className="flex w-full xl:w-3/12 items-center lg:justify-start justify-between mx-4">
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

              <div className="flex w-full xl:w-3/12 items-center lg:justify-start justify-between mx-4">
                <label
                  className="block text-white font-bold mr-3"
                  htmlFor="status"
                >
                  <i className="fas fa-filter"></i> Filter by
                </label>
                <select
                  name="status"
                  onChange={onFilterChange}
                  className="form-select block w-6/12 placeholder-gray-400 text-gray-700 bg-white rounded my-4 p-3"
                >
                  <option value="" defaultValue>
                    Status
                  </option>
                  <option value="available">Available</option>
                  <option value="low">Low Instock</option>
                  <option value="out">Out Of Stock</option>
                </select>
              </div>

              {currentUser.role === "superAdmin" && (
                <div className="w-full xl:w-3/12 mx-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox text-blue-500"
                      onChange={showDeleted}
                    />
                    <span className="ml-2 text-red-500 font-bold">
                      Show Deleted
                    </span>
                  </label>
                </div>
              )}
            </div>
          </div>

          <Link
                className=" justify-self-end bg-blue-800 custom-btn text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                to="/dashboard/addmeal"
              >
                <i className="fas fa-plus mr-2"></i> New
              </Link>

          <div className="flex flex-wrap mt-4">
            <div className="w-full xl:w-8/12 mx-auto mb-12 px-4">
              {/* <StockTable meals={mealService.meals} /> */}
              {currentStock.length !== 0 ? (
                <Fade left>
                  <StockTable
                    meals={currentStock}
                    refresh={refreshStock}
                    user={currentUser}
                    openModal={openModal}
                    deleted={deleted}
                    threshold={threshold}
                  />
                </Fade>
              ) : (
                <div className="w-full flex justify-center">
                  <p className="py-5 px-6 font-bold text-xl text-red-500">
                    No Item found!
                  </p>
                </div>
              )}
            </div>
          </div>

          <>
            {currentStock.length ? (
              <div className="flex justify-center w-full">
                <p className="my-4 text-white font-bold">
                  Showing{" "}
                  {`${indexOfFirstStock + 1} - ${
                    isLastPage ? filteredStock.length : indexOfLastStock
                  }`}{" "}
                  of {filteredStock.length}
                </p>
              </div>
            ) : (
              ""
            )}
          </>

          {currentStock.length !== 0 ? (
            <div className="flex justify-center w-full">
              <Pagination
                itemsPerPage={stockPerPage}
                totalItems={filteredStock.length}
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

export default Stock;
