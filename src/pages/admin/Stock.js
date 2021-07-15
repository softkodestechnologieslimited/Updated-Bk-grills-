import React, { useContext, useEffect, useState } from "react";
<<<<<<< HEAD
import { observer } from "mobx-react-lite";
import { AppStateContext } from "../../context";
import apiService from "../../context/apiService";
import { useToasts } from "react-toast-notifications";
import Fade from "react-reveal/Fade";
=======
import { observer } from "mobx-react-lite"
import { AppStateContext } from "../../context";
import apiService from "../../context/apiService";
import { useToasts } from 'react-toast-notifications'
import Fade from 'react-reveal/Fade';

>>>>>>> 24b52f90c601d2036fd49e3f6c8671e0b2458928

// components
import StockTable from "../../components/Cards/StockTable.js";
import AdminNavbar from "../../components/Navbars/AdminNavbar.js";
import Sidebar from "../../components/Sidebar/Sidebar.js";
import FooterAdmin from "../../components/Footers/FooterAdmin.js";
import FullScreenLoader from "../../components/fullScreenLoader";
import Pagination from "../../components/Pagination/Pagination";
<<<<<<< HEAD
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
=======


const Stock = observer(() => {
  const { mealService } = useContext(AppStateContext);
  const [isLoading, setIsLoading] = useState(false);
  const [stock, setStock] = useState([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [stockPerPage] = useState(10);
  const { addToast } = useToasts()

  useEffect(() => {
    if (stock.length) {
      refreshStock()
>>>>>>> 24b52f90c601d2036fd49e3f6c8671e0b2458928
      return;
    }

    getItems();

    // eslint-disable-next-line
  }, []);

  const refreshStock = () => {
<<<<<<< HEAD
    setStock(mealService.meals.filter((meal) => meal.deleted !== true));
  };
=======
    setStock(mealService.meals);
  }
>>>>>>> 24b52f90c601d2036fd49e3f6c8671e0b2458928

  const getItems = async () => {
    try {
      setIsLoading(true);
      const response = await apiService.getMeals();
      const { data } = response.data;
<<<<<<< HEAD
      // console.log(data);
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
=======
      mealService.setMeals([...data]);
      // setStock([...data])
      refreshStock()

    } catch (error) {
      const message = apiService.getErrorMessage(error);
      addToast(message, {
        appearance: 'error',
        autoDismiss: true,
      })
    } finally {
      setIsLoading(false);
    }
  }

  const onFilterChange = (e) => {
    if (e.target.name === "search") {
      setQuery(e.target.value.toLowerCase())
    } else if (e.target.name === 'category') {
      setCategory(e.target.value.toLowerCase())
    }

    setCurrentPage(1);
  }
>>>>>>> 24b52f90c601d2036fd49e3f6c8671e0b2458928

  const filteredStock = stock.filter((stockItem) => {
    if (!query && category) {
      return stockItem.category === category;
    }
<<<<<<< HEAD
    if (!query && status) {
      return stockItem.instock === status;
      // return stockItem.status === status; // future change
    }

    if (query && !category && !status) {
=======

    if (query && !category) {
>>>>>>> 24b52f90c601d2036fd49e3f6c8671e0b2458928
      return stockItem.title.toLowerCase().includes(query);
    }

    if (query && category) {
<<<<<<< HEAD
      return (
        stockItem.title.toLowerCase().includes(query) &&
        stockItem.category === category
      );
    }
    if (query && status) {
      return (
        stockItem.title.toLowerCase().includes(query) &&
        stockItem.instock === status
      );
    }
    if (query && status && category) {
      return (
        stockItem.title.toLowerCase().includes(query) &&
        stockItem.instock === status &&
        stockItem.category === category
      );
=======
      return stockItem.title.toLowerCase().includes(query) && stockItem.category === category
>>>>>>> 24b52f90c601d2036fd49e3f6c8671e0b2458928
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

<<<<<<< HEAD
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
=======
  return (
    <>
      {isLoading ? <FullScreenLoader /> : <></>}
>>>>>>> 24b52f90c601d2036fd49e3f6c8671e0b2458928
      <Sidebar />
      <div className="relative md:ml-64 bg-gray-900">
        <AdminNavbar />

        <div className="relative px-4 md:px-10 mx-auto w-full h-90 md:pt-32 pt-12 md:mt-0 mt-24">
<<<<<<< HEAD
          <div className="px-4 flex flex-wrap justify-between xl:w-8/12 mx-auto mb-12">
            <form className="w-full">
=======
          <div className="px-4 flex flex-wrap justify-between lg:w-8/12 mx-auto">
            <form className='w-full xl:w-6/12'>
>>>>>>> 24b52f90c601d2036fd49e3f6c8671e0b2458928
              <input
                type="text"
                name="search"
                value={query}
                className="form-input text-gray-700 mt-1 block w-full my-4 p-5 rounded-lg"
                placeholder="Search for meals or drinks"
                onChange={onFilterChange}
              />
            </form>
<<<<<<< HEAD
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
=======
            <div className="flex w-full xl:w-4/12 items-center lg:justify-start justify-between mx-4">
              <label
                className="block text-white font-bold mr-3"
                htmlFor='category'
              >
                <i className="fas fa-filter"></i> Filter by
              </label>
              <select name="category" onChange={onFilterChange} className="form-select block w-6/12 placeholder-gray-400 text-gray-700 bg-white rounded my-4 p-3">
                <option value="" defaultValue>
                  Category
                  </option>
                <option value='food'
                >Food</option>
                <option value='drinks'
                >Drinks</option>
              </select>
>>>>>>> 24b52f90c601d2036fd49e3f6c8671e0b2458928
            </div>
          </div>

          <div className="flex flex-wrap mt-4">
<<<<<<< HEAD
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
=======
            <div className="w-full lg:w-8/12 mx-auto mb-12 px-4">
              {/* <StockTable meals={mealService.meals} /> */}
              {
                currentStock.length !== 0 ? (
                  <Fade left>
                    <StockTable meals={currentStock} refresh={refreshStock} />
                  </Fade>
                ) : (
                  <div className="w-full flex justify-center">
                    <p className="py-5 px-6 font-bold text-xl text-red-500">No Item found!</p>
                  </div>
                )
              }
>>>>>>> 24b52f90c601d2036fd49e3f6c8671e0b2458928
            </div>
          </div>

          <>
            {currentStock.length ? (
              <div className="flex justify-center w-full">
                <p className="my-4 text-white font-bold">
                  Showing{" "}
<<<<<<< HEAD
                  {`${indexOfFirstStock + 1} - ${
                    isLastPage ? filteredStock.length : indexOfLastStock
                  }`}{" "}
                  of {filteredStock.length}
=======
                  {`${indexOfFirstStock + 1} - ${isLastPage ? filteredStock.length : indexOfLastStock
                    }`}{" "}
               of {filteredStock.length}
>>>>>>> 24b52f90c601d2036fd49e3f6c8671e0b2458928
                </p>
              </div>
            ) : (
              ""
            )}
          </>

<<<<<<< HEAD
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
=======
          {
            currentStock.length !== 0 ? (
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
            )
          }
>>>>>>> 24b52f90c601d2036fd49e3f6c8671e0b2458928
        </div>
        <FooterAdmin />
      </div>
    </>
  );
<<<<<<< HEAD
});
=======
})
>>>>>>> 24b52f90c601d2036fd49e3f6c8671e0b2458928

export default Stock;
