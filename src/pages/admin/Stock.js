import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite"
import { AppStateContext } from "../../context";
import apiService from "../../context/apiService";
import { useToasts } from 'react-toast-notifications'
import Fade from 'react-reveal/Fade';


// components
import StockTable from "../../components/Cards/StockTable.js";
import AdminNavbar from "../../components/Navbars/AdminNavbar.js";
import Sidebar from "../.././components/Sidebar/Sidebar.js";
import FooterAdmin from "../.././components/Footers/FooterAdmin";
import FullScreenLoader from "../.././components/fullScreenLoader";
import Pagination from "../.././components/Pagination/Pagination";


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
      return;
    }

    getItems();

    // eslint-disable-next-line
  }, []);

  const refreshStock = () => {
    setStock(mealService.meals);
  }

  const getItems = async () => {
    try {
      setIsLoading(true);
      const response = await apiService.getMeals();
      const { data } = response.data;
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

  const filteredStock = stock.filter((stockItem) => {
    if (!query && category) {
      return stockItem.category === category;
    }

    if (query && !category) {
      return stockItem.title.toLowerCase().includes(query);
    }

    if (query && category) {
      return stockItem.title.toLowerCase().includes(query) && stockItem.category === category
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

  return (
    <>
      {isLoading ? <FullScreenLoader /> : <></>}
      <Sidebar />
      <div className="relative md:ml-64 bg-gray-900">
        <AdminNavbar />

        <div className="relative px-4 md:px-10 mx-auto w-full h-90 md:pt-32 pt-12 md:mt-0 mt-24">
          <div className="px-4 flex flex-wrap justify-between lg:w-8/12 mx-auto">
            <form className='w-full xl:w-6/12'>
              <input
                type="text"
                name="search"
                value={query}
                className="form-input text-gray-700 mt-1 block w-full my-4 p-5 rounded-lg"
                placeholder="Search for meals or drinks"
                onChange={onFilterChange}
              />
            </form>
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
            </div>
          </div>

          <div className="flex flex-wrap mt-4">
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
            </div>
          </div>

          <>
            {currentStock.length ? (
              <div className="flex justify-center w-full">
                <p className="my-4 text-white font-bold">
                  Showing{" "}
                  {`${indexOfFirstStock + 1} - ${isLastPage ? filteredStock.length : indexOfLastStock
                    }`}{" "}
               of {filteredStock.length}
                </p>
              </div>
            ) : (
              ""
            )}
          </>

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
        </div>
        <FooterAdmin />
      </div>
    </>
  );
})

export default Stock;
