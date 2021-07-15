import React, { useContext, useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { AppStateContext } from "../../context";
import apiService from "../../context/apiService";
<<<<<<< HEAD
import { useToasts } from "react-toast-notifications";
import Fade from "react-reveal/Fade";
=======
import { useToasts } from 'react-toast-notifications'
import Fade from 'react-reveal/Fade';

>>>>>>> 24b52f90c601d2036fd49e3f6c8671e0b2458928

// components
import OrdersTable from "../../components/Cards/OrdersTable.js";
import AdminNavbar from "../../components/Navbars/AdminNavbar.js";
import Sidebar from "../../components/Sidebar/Sidebar.js";
import FooterAdmin from "../../components/Footers/FooterAdmin.js";
import FullScreenLoader from "../../components/fullScreenLoader";
import Pagination from "../../components/Pagination/Pagination";

<<<<<<< HEAD
=======

>>>>>>> 24b52f90c601d2036fd49e3f6c8671e0b2458928
const Orders = observer(() => {
  const { orderService, authService } = useContext(AppStateContext);
  const { currentUser } = authService;
  const [isLoading, setIsLoading] = useState(false);
<<<<<<< HEAD
  const [deleted, setIsDeleted] = useState(false);
=======
>>>>>>> 24b52f90c601d2036fd49e3f6c8671e0b2458928
  const [orders, setOrders] = useState([]);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10);
  const { addToast } = useToasts();

<<<<<<< HEAD
=======

>>>>>>> 24b52f90c601d2036fd49e3f6c8671e0b2458928
  useEffect(() => {
    if (orders.length) {
      refreshOrders();
      return;
<<<<<<< HEAD
    }
=======
    };
>>>>>>> 24b52f90c601d2036fd49e3f6c8671e0b2458928

    getOrders();

    // eslint-disable-next-line
  }, []);

  const refreshOrders = () => {
<<<<<<< HEAD
    if (currentUser.role === "waiter") {
      const waiterOrders = orderService.getOrdersByWaiterId(currentUser.id);
      setOrders(waiterOrders.filter((order) => order.deleted !== true));
      return;
    }

    setOrders(
      orderService.recentOrders.filter((order) => order.deleted !== true)
    );
  };
=======
    if (currentUser.role === 'waiter') {
      const waiterOrders = orderService.getOrdersByWaiterId(currentUser.id)
      setOrders(waiterOrders);
      return;
    }

    setOrders(orderService.recentOrders);
  }
>>>>>>> 24b52f90c601d2036fd49e3f6c8671e0b2458928

  const getOrders = async () => {
    try {
      setIsLoading(true);
      const response = await apiService.getOrders();
      const { data } = response.data;
<<<<<<< HEAD
      console.log(data);
      orderService.setRecentOrders([...data]);

      refreshOrders();
=======
      orderService.setRecentOrders([...data]);

      refreshOrders();

>>>>>>> 24b52f90c601d2036fd49e3f6c8671e0b2458928
    } catch (error) {
      const message = apiService.getErrorMessage(error);

      addToast(message, {
<<<<<<< HEAD
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
    }
    setCurrentPage(1);
  };
=======
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

>>>>>>> 24b52f90c601d2036fd49e3f6c8671e0b2458928

  const filteredOrders = orders.filter((order) => {
    if (!query) return order;

<<<<<<< HEAD
    return (
      order.id.toLowerCase().includes(query) ||
      order.waiter_name.toLowerCase().includes(query)
    );
=======
    return order.id.toLowerCase().includes(query) || order.waiter_name.toLowerCase().includes(query);
>>>>>>> 24b52f90c601d2036fd49e3f6c8671e0b2458928
  });

  // Get current orders
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
<<<<<<< HEAD
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );
  const isLastPage = indexOfLastOrder >= filteredOrders.length;

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const showDeleted = (e) => {
    if (e.target.checked) {
      setIsDeleted(true)
      setOrders(
        orderService.recentOrders.filter((order) => order.deleted === true)
      );
    } else {
      setIsDeleted(false)
      refreshOrders();
    }
  };

=======
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const isLastPage = indexOfLastOrder >= filteredOrders.length;


  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

>>>>>>> 24b52f90c601d2036fd49e3f6c8671e0b2458928
  return (
    <>
      {isLoading ? <FullScreenLoader /> : <></>}
      <Sidebar />
      <div className="relative md:ml-64 bg-gray-900">
        <AdminNavbar />
        <div className="relative px-4 md:px-10 mx-auto w-full h-90 md:pt-32 pt-12 md:mt-0 mt-24">
<<<<<<< HEAD
          {currentUser.role !== "waiter" && (
            <div className="px-4 mt-6 w-full xl:w-8/12 flex flex-wrap xl:flex-no-wrap justify-between items-center mx-auto mb-12">
              <form className="w-full lg:w-8/12 mb-6">
                <input
                  type="text"
                  name="search"
                  value={query}
                  className="form-input text-gray-700 block w-full p-5 rounded-lg search-input"
                  placeholder="Search by Order Id or Waiter Name"
                  onChange={onFilterChange}
                />
              </form>
              {currentUser.role === "superAdmin" && (
                <div className="lg:w-4/12 w-full">
                  <label className="flex items-center justify-center">
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
          )}

          <div className="flex flex-wrap mt-12">
            <div className="w-full mx-auto mb-12 px-4">
              {currentOrders.length !== 0 ? (
                <Fade left>
                  <OrdersTable orders={currentOrders} refresh={refreshOrders} deleted={deleted} />
                </Fade>
              ) : (
                <div className="w-full flex justify-center">
                  <p className="py-5 px-6 font-bold text-xl text-red-500">
                    No Orders found!
                  </p>
                </div>
              )}
=======
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
>>>>>>> 24b52f90c601d2036fd49e3f6c8671e0b2458928
            </div>
          </div>

          <>
            {currentOrders.length ? (
              <div className="flex justify-center w-full">
                <p className="my-4 text-white font-bold">
                  Showing{" "}
<<<<<<< HEAD
                  {`${indexOfFirstOrder + 1} - ${
                    isLastPage ? filteredOrders.length : indexOfLastOrder
                  }`}{" "}
                  of {filteredOrders.length}
=======
                  {`${indexOfFirstOrder + 1} - ${isLastPage ? filteredOrders.length : indexOfLastOrder
                    }`}{" "}
               of {filteredOrders.length}
>>>>>>> 24b52f90c601d2036fd49e3f6c8671e0b2458928
                </p>
              </div>
            ) : (
              ""
            )}
          </>

<<<<<<< HEAD
          {currentOrders.length !== 0 ? (
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
          )}
=======
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
>>>>>>> 24b52f90c601d2036fd49e3f6c8671e0b2458928
        </div>
        <FooterAdmin />
      </div>
    </>
  );
});

export default Orders;
