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
import StaffCard from "components/Cards/StaffCard.js";
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";
import FullScreenLoader from "components/fullScreenLoader";
import Pagination from "components/Pagination/Pagination";

const Staff = observer(() => {
<<<<<<< HEAD
  const { staffService, authService } = useContext(AppStateContext);
  const { currentUser } = authService;
  const [isLoading, setIsLoading] = useState(false);
  const [deleted, setIsDeleted] = useState(false);
=======
  const { staffService } = useContext(AppStateContext);
  const [isLoading, setIsLoading] = useState(false);
>>>>>>> 24b52f90c601d2036fd49e3f6c8671e0b2458928
  const [staff, setStaff] = useState([]);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [staffPerPage] = useState(10);
<<<<<<< HEAD
  const { addToast } = useToasts();

  useEffect(() => {
    if (staff.length) {
      refreshStaff();
=======
  const { addToast } = useToasts()


  useEffect(() => {
    if (staff.length) {
      refreshStaff()
>>>>>>> 24b52f90c601d2036fd49e3f6c8671e0b2458928
      return;
    }

    getStaff();

    // eslint-disable-next-line
  }, []);

  useEffect(()=>{console.log(staff);},[staff])

  const refreshStaff = () => {
<<<<<<< HEAD
    setStaff(staffService.allStaff.filter((staff) => staff.deleted !== true));
  };
=======
    setStaff(staffService.allStaff)
  }
>>>>>>> 24b52f90c601d2036fd49e3f6c8671e0b2458928

  const getStaff = async () => {
    try {
      setIsLoading(true);
      const response = await apiService.getUsers();
      const { data } = response.data;
<<<<<<< HEAD
      if (currentUser.role === "superAdmin") {
        staffService.setStaff([...data]);
      } else {
        const filter = data.filter((user) => user.role !== "superAdmin");
        // console.log(filter)
        staffService.setStaff([...filter]);
      }

      refreshStaff();
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
=======
      staffService.setStaff([...data]);

      refreshStaff()
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
    }
    setCurrentPage(1);
  }

>>>>>>> 24b52f90c601d2036fd49e3f6c8671e0b2458928

  const filteredStaff = staff.filter((staff) => {
    if (query) {
      return staff.name.toLowerCase().includes(query);
    }

    return staff;
  });

  // Get current customers
  const indexOfLastStaff = currentPage * staffPerPage;
  const indexOfFirstStaff = indexOfLastStaff - staffPerPage;
  const currentStaff = filteredStaff.slice(indexOfFirstStaff, indexOfLastStaff);
  const isLastPage = indexOfLastStaff >= filteredStaff.length;

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

<<<<<<< HEAD
  const showDeleted = (e) => {
    if (e.target.checked) {
      setIsDeleted(true)
      setStaff(staffService.allStaff.filter((staff) => staff.deleted === true));
    } else {
      setIsDeleted(false)
      refreshStaff();
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
        <div className="relative px-4 md:px-10 mx-auto w-full h-90 md:pt-32 pt-12 md:mt-0 mt-24">
<<<<<<< HEAD
          <div className="px-4 mt-6 mb-12">
            <form className="w-full lg:w-8/12 mx-auto mb-6 flex flex-wrap justify-between items-center">
=======
          <div className="px-4 mt-6">
            <form className='w-full lg:w-8/12 mx-auto mb-12 flex flex-wrap justify-between items-center'>
>>>>>>> 24b52f90c601d2036fd49e3f6c8671e0b2458928
              <input
                type="text"
                name="search"
                value={query}
                className="form-input text-gray-700 block w-full p-5 rounded-lg search-input"
                placeholder="Search by Staff Name"
                onChange={onFilterChange}
              />
<<<<<<< HEAD
            </form>
            {currentUser.role === "superAdmin" && (
              <div className="w-full lg:w-8/12 mx-auto ">
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
          <div className="flex flex-wrap mt-4">
            <div className="w-full lg:w-8/12 mx-auto mb-12 px-4">
              {currentStaff.length !== 0 ? (
                <Fade left>
                  <StaffCard staff={currentStaff} user={currentUser} deleted={deleted}/>
                </Fade>
              ) : (
                <div className="w-full flex justify-center">
                  <p className="py-5 px-6 font-bold text-xl text-red-500">
                    No Staff found!
                  </p>
                </div>
              )}
=======
              {/* <button type="submit" className="bg-blue-900 w-full lg:w-4/12 ml-auto text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 mt-3">
                    Search
                </button> */}
            </form>
          </div>
          <div className="flex flex-wrap mt-4">
            <div className="w-full lg:w-8/12 mx-auto mb-12 px-4">
              {
                currentStaff.length !== 0 ? (
                  <Fade left>
                    <StaffCard staff={currentStaff} />
                  </Fade>
                ) : (
                  <div className="w-full flex justify-center">
                    <p className="py-5 px-6 font-bold text-xl text-red-500">No Staff found!</p>
                  </div>
                )
              }
>>>>>>> 24b52f90c601d2036fd49e3f6c8671e0b2458928
            </div>
          </div>

          <>
            {currentStaff.length ? (
              <div className="flex justify-center w-full">
                <p className="my-4 text-white font-bold">
                  Showing{" "}
<<<<<<< HEAD
                  {`${indexOfFirstStaff + 1} - ${
                    isLastPage ? filteredStaff.length : indexOfLastStaff
                  }`}{" "}
                  of {filteredStaff.length}
=======
                  {`${indexOfFirstStaff + 1} - ${isLastPage ? filteredStaff.length : indexOfLastStaff
                    }`}{" "}
               of {filteredStaff.length}
>>>>>>> 24b52f90c601d2036fd49e3f6c8671e0b2458928
                </p>
              </div>
            ) : (
              ""
            )}
          </>

<<<<<<< HEAD
          {currentStaff.length !== 0 ? (
            <div className="flex justify-center w-full">
              <Pagination
                itemsPerPage={staffPerPage}
                totalItems={filteredStaff.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            </div>
          ) : (
            ""
          )}
=======
          {
            currentStaff.length !== 0 ? (
              <div className="flex justify-center w-full">
                <Pagination
                  itemsPerPage={staffPerPage}
                  totalItems={filteredStaff.length}
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

export default Staff;
=======
  )
}
)

export default Staff
>>>>>>> 24b52f90c601d2036fd49e3f6c8671e0b2458928
