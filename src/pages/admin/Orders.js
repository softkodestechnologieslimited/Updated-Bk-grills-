import React, { useContext, useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { AppStateContext } from "../../context";
import apiService from "../../context/apiService";
import { useToasts } from 'react-toast-notifications'
import Fade from 'react-reveal/Fade';


// components
import OrdersTable from "../../components/Cards/OrdersTable.js";
import AdminNavbar from "../.././components/Navbars/AdminNavbar.js";
import Sidebar from "../../components/Sidebar/Sidebar.js";
import FooterAdmin from "../.././components/Footers/FooterAdmin";
import FullScreenLoader from "../.././components/fullScreenLoader";
import Pagination from "../../components/Pagination/Pagination";


const Orders = observer(() => {
  const { orderService, authService } = useContext(AppStateContext);
  const { currentUser } = authService;
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10);
  const { addToast } = useToasts();


  useEffect(() => {
    if (orders.length) {
      refreshOrders();
      return;
    };

    getOrders();

    // eslint-disable-next-line
  }, []);

  const refreshOrders = () => {
    if (currentUser.role === 'waiter') {
      const waiterOrders = orderService.getOrdersByWaiterId(currentUser.id)
      setOrders(waiterOrders);
      return;
    }

    setOrders(orderService.recentOrders);
  }

  const getOrders = async () => {
    try {
      setIsLoading(true);
      const response = await apiService.getOrders();
      const { data } = response.data;
      orderService.setRecentOrders([...data]);

      refreshOrders();

    } catch (error) {
      const message = apiService.getErrorMessage(error);

      addToast(message, {
        appearance: 'error',
        autoDismiss: true,
      });

    } finally {
      setIsLoading(false);
    }
  }

  const onFilterChange = (e) => {
    if (e.target.name === "search") {
      setQuery(e.target.value.toLowerCase())
    }
    setCurrentPage(1);
  }


  const filteredOrders = orders.filter((order) => {
    if (!query) return order;

    return order.id.toLowerCase().includes(query) || order.waiter_name.toLowerCase().includes(query);
  });

  // Get current orders
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const isLastPage = indexOfLastOrder >= filteredOrders.length;


  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {isLoading ? <FullScreenLoader /> : <></>}
      <Sidebar />
      <div className="relative md:ml-64 bg-gray-900">
        <AdminNavbar />
        <div className="relative px-4 md:px-10 mx-auto w-full h-90 md:pt-32 pt-12 md:mt-0 mt-24">
          {
            currentUser.role === "admin" && (
              <div className="px-4 mt-6">
                <form className='w-full lg:w-6/12 mr-auto mb-12 flex flex-wrap justify-between items-center'>
                  <input
                    type="text"
                    name="search"
                    value={query}
                    className="form-input text-gray-700 block w-full p-5 rounded-lg search-input"
                    placeholder="Search by Order Id or Waiter Name"
                    onChange={onFilterChange}
                  />
                  {/* <button type="submit" className="bg-blue-900 w-full lg:w-4/12 ml-auto text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 mt-3">
                    Search
                </button> */}
                </form>
              </div>
            )
          }

          <div className="flex flex-wrap mt-12">
            <div className="w-full mx-auto mb-12 px-4">
              {
                currentOrders.length !== 0 ? (
                  <Fade left>
                    <OrdersTable orders={currentOrders} refresh={refreshOrders} />
                  </Fade>
                ) : (
                  <div className="w-full flex justify-center">
                    <p className="py-5 px-6 font-bold text-xl text-red-500">No Order found!</p>
                  </div>
                )
              }
            </div>
          </div>

          <>
            {currentOrders.length ? (
              <div className="flex justify-center w-full">
                <p className="my-4 text-white font-bold">
                  Showing{" "}
                  {`${indexOfFirstOrder + 1} - ${isLastPage ? filteredOrders.length : indexOfLastOrder
                    }`}{" "}
               of {filteredOrders.length}
                </p>
              </div>
            ) : (
              ""
            )}
          </>

          {
            currentOrders.length !== 0 ? (
              <div className="flex justify-center w-full">
                <Pagination
                  itemsPerPage={ordersPerPage}
                  totalItems={filteredOrders.length}
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
});

export default Orders;
