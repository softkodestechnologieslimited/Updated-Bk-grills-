import React, { useContext, useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { AppStateContext } from "../../context";
import apiService from "../../context/apiService";
<<<<<<< HEAD
import { useToasts } from "react-toast-notifications";
=======
import { useToasts } from 'react-toast-notifications'
>>>>>>> 24b52f90c601d2036fd49e3f6c8671e0b2458928

// components
import CustomersCard from "../../components/Cards/CustomersCard.js";
import AdminNavbar from "../../components/Navbars/AdminNavbar.js";
import Sidebar from "../../components/Sidebar/Sidebar.js";
import FooterAdmin from "../../components/Footers/FooterAdmin.js";
import FullScreenLoader from "../../components/fullScreenLoader";
import Pagination from "../../components/Pagination/Pagination";

const Customers = observer(() => {
<<<<<<< HEAD
  const { customerService, authService } = useContext(AppStateContext);
  const { currentUser } = authService;

  const [isLoading, setIsLoading] = useState(false);
  const [deleted, setIsDeleted] = useState(false);
=======
  const { customerService } = useContext(AppStateContext);
  const [isLoading, setIsLoading] = useState(false);
>>>>>>> 24b52f90c601d2036fd49e3f6c8671e0b2458928
  const [customers, setCustomers] = useState([]);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [customersPerPage] = useState(10);
<<<<<<< HEAD
  const { addToast } = useToasts();

  useEffect(() => {
    if (customers.length) {
      refreshCustomers();
=======
  const { addToast } = useToasts()


  useEffect(() => {
    if (customers.length) {
      refreshCustomers()
>>>>>>> 24b52f90c601d2036fd49e3f6c8671e0b2458928
      return;
    }

    getCustomers();

    // eslint-disable-next-line
  }, []);

  const refreshCustomers = () => {
<<<<<<< HEAD
    setCustomers(
      customerService.allCustomers.filter(
        (customer) => customer.deleted !== true
      )
    );
  };
=======
    setCustomers(customerService.allCustomers);
  }
>>>>>>> 24b52f90c601d2036fd49e3f6c8671e0b2458928

  const getCustomers = async () => {
    try {
      setIsLoading(true);
      const response = await apiService.getCustomers();
      const { data } = response.data;
<<<<<<< HEAD
      // console.log(data);
=======
>>>>>>> 24b52f90c601d2036fd49e3f6c8671e0b2458928
      customerService.setCustomers([...data]);

      refreshCustomers();
      // setCustomers([...data])
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
      })

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

  const filteredCustomers = customers.filter((customer) => {
    if (!query) return customer;

<<<<<<< HEAD
    return (
      customer.fullName.toLowerCase().includes(query) ||
      customer.phoneNumber.startsWith(query)
    );
=======
    return customer.fullName.toLowerCase().includes(query);
>>>>>>> 24b52f90c601d2036fd49e3f6c8671e0b2458928
  });

  // Get current customers
  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
<<<<<<< HEAD
  const currentCustomers = filteredCustomers.slice(
    indexOfFirstCustomer,
    indexOfLastCustomer
  );
=======
  const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);
>>>>>>> 24b52f90c601d2036fd49e3f6c8671e0b2458928
  const isLastPage = indexOfLastCustomer >= filteredCustomers.length;

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

<<<<<<< HEAD
  const showDeleted = (e) => {
    if (e.target.checked) {
      setIsDeleted(true)
      setCustomers(
        customerService.allCustomers.filter(
          (customer) => customer.deleted === true
        )
      );
    } else {
      setIsDeleted(false)
      refreshCustomers();
    }
  };

=======
>>>>>>> 24b52f90c601d2036fd49e3f6c8671e0b2458928
  return (
    <>
      {isLoading ? <FullScreenLoader /> : <></>}
      <Sidebar />
      <div className="relative md:ml-64 bg-gray-900">
        <AdminNavbar />
        <div className="relative px-4 md:px-10 mx-auto w-full h-90 md:pt-32 pt-12">
<<<<<<< HEAD
          <div className="px-4 md:mt-4 mt-32 mb-12">
            <form className="w-full lg:w-6/12 mx-auto mb-6 flex flex-wrap justify-between items-center">
=======
          <div className="px-4 md:mt-4 mt-32">
            <form className='w-full lg:w-6/12 mx-auto mb-12 flex flex-wrap justify-between items-center'>
>>>>>>> 24b52f90c601d2036fd49e3f6c8671e0b2458928
              <input
                type="text"
                name="search"
                value={query}
                className="form-input text-gray-700 block w-full p-5 rounded-lg search-input"
<<<<<<< HEAD
                placeholder="Search by Customer Name or Phone"
                onChange={onFilterChange}
              />
            </form>
            {currentUser.role === "superAdmin" && (
              <div className="w-full lg:w-6/12 mx-auto ">
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
          <div className="flex flex-wrap">
            <div className="w-full lg:w-6/12 mx-auto mb-12 px-4">
              {currentCustomers.length !== 0 ? (
                <CustomersCard
                  customers={currentCustomers}
                  refresh={refreshCustomers}
                  deleted={deleted}
                />
              ) : (
                <div className="w-full flex justify-center">
                  <p className="py-5 px-6 font-bold text-xl text-red-500">
                    No Customer found!
                  </p>
                </div>
              )}
=======
                placeholder="Search by Customer Name"
                onChange={onFilterChange}
              />
              {/* <button type="submit" className="bg-blue-900 w-full lg:w-4/12 ml-auto text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 mt-3">
                    Search
                </button> */}
            </form>
          </div>
          <div className="flex flex-wrap">
            <div className="w-full lg:w-6/12 mx-auto mb-12 px-4">
              {
                currentCustomers.length !== 0 ? (
                  <CustomersCard customers={currentCustomers} refresh={refreshCustomers} />
                ) : (
                  <div className="w-full flex justify-center">
                    <p className="py-5 px-6 font-bold text-xl text-red-500">No Customer found!</p>
                  </div>
                )
              }
>>>>>>> 24b52f90c601d2036fd49e3f6c8671e0b2458928
            </div>
          </div>

          <>
            {currentCustomers.length ? (
              <div className="flex justify-center w-full">
                <p className="my-4 text-white font-bold">
                  Showing{" "}
<<<<<<< HEAD
                  {`${indexOfFirstCustomer + 1} - ${
                    isLastPage ? filteredCustomers.length : indexOfLastCustomer
                  }`}{" "}
                  of {filteredCustomers.length}
=======
                  {`${indexOfFirstCustomer + 1} - ${isLastPage ? filteredCustomers.length : indexOfLastCustomer
                    }`}{" "}
               of {filteredCustomers.length}
>>>>>>> 24b52f90c601d2036fd49e3f6c8671e0b2458928
                </p>
              </div>
            ) : (
              ""
            )}
          </>

<<<<<<< HEAD
          {currentCustomers.length !== 0 ? (
            <div className="flex justify-center w-full">
              <Pagination
                itemsPerPage={customersPerPage}
                totalItems={filteredCustomers.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            </div>
          ) : (
            ""
          )}
=======
          {
            currentCustomers.length !== 0 ? (
              <div className="flex justify-center w-full">
                <Pagination
                  itemsPerPage={customersPerPage}
                  totalItems={filteredCustomers.length}
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
<<<<<<< HEAD
  );
});

export default Customers;
=======
  )
})

export default Customers
>>>>>>> 24b52f90c601d2036fd49e3f6c8671e0b2458928
