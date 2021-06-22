import React, { useContext, useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { AppStateContext } from "../../context";
import apiService from "../../context/apiService";
import { useToasts } from "react-toast-notifications";
import Fade from "react-reveal/Fade";

// components
import LogCard from "components/Cards/LogCard.js";
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";
import FullScreenLoader from "components/fullScreenLoader";
import Pagination from "components/Pagination/Pagination";

const Log = observer(() => {
  const { authService } = useContext(AppStateContext);
  const { currentUser } = authService;
  const [isLoading, setIsLoading] = useState(false);
  const [logs, setLogs] = useState([]);
  // const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [logPerPage] = useState(10);
  const { addToast } = useToasts();

  useEffect(() => {
    // if (staff.length) {
    //   refreshStaff();
    //   return;
    // }

    getLogs();

    // eslint-disable-next-line
  }, []);

  // const refreshStaff = () => {
  //   setStaff(staffService.allStaff);
  // };

  const getLogs = async () => {
    try {
      setIsLoading(true);
      const response = await apiService.getLogs();
      const { data } = response.data;
      if (currentUser.role === "superAdmin") {
        setLogs(data);
        // console.log(data);
      }
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

  // Get current logs
  const indexOfLastLog = currentPage * logPerPage;
  const indexOfFirstLog = indexOfLastLog - logPerPage;
  const currentLogs = logs.slice(indexOfFirstLog, indexOfLastLog);
  const isLastPage = indexOfLastLog >= logs.length;

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {isLoading ? <FullScreenLoader /> : <></>}
      <Sidebar />
      <div className="relative md:ml-64 bg-gray-900">
        <AdminNavbar />
        <div className="relative px-4 md:px-10 mx-auto w-full h-90 md:pt-32 pt-12 md:mt-0 mt-24">
          <div className="flex flex-wrap mt-4">
            <div className="w-full lg:w-8/12 mx-auto mb-12 px-4">
              {currentLogs.length !== 0 ? (
                <Fade left>
                  <LogCard logs={currentLogs} />
                </Fade>
              ) : (
                <div className="w-full flex justify-center">
                  <p className="py-5 px-6 font-bold text-xl text-red-500">
                    No Logs found!
                  </p>
                </div>
              )}
            </div>
          </div>

          <>
            {currentLogs.length ? (
              <div className="flex justify-center w-full">
                <p className="my-4 text-white font-bold">
                  Showing{" "}
                  {`${indexOfFirstLog + 1} - ${
                    isLastPage ? logs.length : indexOfLastLog
                  }`}{" "}
                  of {logs.length}
                </p>
              </div>
            ) : (
              ""
            )}
          </>

          {currentLogs.length !== 0 ? (
            <div className="flex justify-center w-full">
              <Pagination
                itemsPerPage={logPerPage}
                totalItems={logs.length}
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

export default Log;
