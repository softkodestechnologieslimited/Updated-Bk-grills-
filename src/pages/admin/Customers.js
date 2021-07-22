import React, { useContext, useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { AppStateContext } from "../../context";
import apiService from "../../context/apiService";
import { useToasts } from "react-toast-notifications";

// components
import CustomersCard from "../../components/Cards/CustomersCard";
import AdminNavbar from "../../components/Navbars/AdminNavbar.js";
import Sidebar from "../../components/Sidebar/Sidebar.js";
import FooterAdmin from "../../components/Footers/FooterAdmin.js";
import FullScreenLoader from "../../components/fullScreenLoader";
import Pagination from "../../components/Pagination/Pagination";

const Customers = observer(() => {
  const { customerService, authService } = useContext(AppStateContext);
  const { currentUser } = authService;

  const [isLoading, setIsLoading] = useState(false);
  const [deleted, setIsDeleted] = useState(false);
  const [customers, setAllCustomers] = useState([]);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [customersPerPage] = useState(10);
  const { addToast } = useToasts();

  useEffect(() => {
    if (customers.length) {
      refreshCustomers();
      return;
    }

    getCustomers();

    // eslint-disable-next-line
  }, []);

  const refreshCustomers = () => {
    // setAllCustomers(
    //   customerService.allCustomers.filter(
    //     (customer) => customer.deleted !== true
    //   )
    // );
  };

  const getCustomers = async () => {
    try {
      setIsLoading(true);
      const response = await apiService.getCustomers();
      const { data } = response.data;
      console.log(data);
      customerService.setCustomers([...data]);

      refreshCustomers();
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
    }
    setCurrentPage(1);
  };

  const filteredCustomers = customers.filter((customer) => {
    if (!query) return customer;

    return (
      customer.fullName.toLowerCase().includes(query) ||
      customer.phoneNumber.startsWith(query)
    );
  });

  // Get current customers
  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = filteredCustomers.slice(
    indexOfFirstCustomer,
    indexOfLastCustomer
  );
  const isLastPage = indexOfLastCustomer >= filteredCustomers.length;

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const showDeleted = (e) => {
    if (e.target.checked) {
      setIsDeleted(true)
      setAllCustomers(
        customerService.allCustomers.filter(
          (customer) => customer.deleted === true
        )
      );
    } else {
      setIsDeleted(false)
      refreshCustomers();
    }
  };

  return (
    <>
      {isLoading ? <FullScreenLoader /> : <></>}
      <Sidebar />
      <div className="relative md:ml-64 bg-gray-900">
        <AdminNavbar />
        <div className="relative px-4 md:px-10 mx-auto w-full h-90 md:pt-32 pt-12">
          <div className="px-4 md:mt-4 mt-32 mb-12">
            <form className="w-full lg:w-6/12 mx-auto mb-6 flex flex-wrap justify-between items-center">
              <input
                type="text"
                name="search"
                value={query}
                className="form-input text-gray-700 block w-full p-5 rounded-lg search-input"
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
                  refresh={refreshCustomers()}
                  deleted={deleted}
                />
              ) : (
                <div className="w-full flex justify-center">
                  <p className="py-5 px-6 font-bold text-xl text-red-500">
                    No Customer found!
                  </p>
                </div>
              )}
            </div>
          </div>

          <>
            {currentCustomers.length ? (
              <div className="flex justify-center w-full">
                <p className="my-4 text-white font-bold">
                  Showing{" "}
                  {`${indexOfFirstCustomer + 1} - ${
                    isLastPage ? filteredCustomers.length : indexOfLastCustomer
                  }`}{" "}
                  of {filteredCustomers.length}
                </p>
              </div>
            ) : (
              ""
            )}
          </>

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
        </div>
        <FooterAdmin />
      </div>
    </>
  );
});

export default Customers;
