import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppStateContext } from "../../context";
import apiService from "../../context/apiService";
import { useToasts } from "react-toast-notifications";
import Fade from "react-reveal/Fade";

// components
import AdminNavbar from "../../components/Navbars/AdminNavbar.js";
import Sidebar from "../../components/Sidebar/Sidebar.js";
import FooterAdmin from "../../components/Footers/FooterAdmin.js";

const Menu = () => {
  const { authService, mealService } = useContext(AppStateContext);
  const { currentUser } = authService;
  const { addToast } = useToasts();

  useEffect(() => {
    if (mealService.meals.length) return;
    getItems();

    // eslint-disable-next-line
  }, []);

  const getItems = async () => {
    try {
      const response = await apiService.getMeals();
      const { data } = response.data;
      // console.log(data);
      // mealService.setMeals(data);
      mealService.setMeals([...data]);
    } catch (error) {
      const message = apiService.getErrorMessage(error);
      addToast(message, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-gray-900">
        <AdminNavbar />
        <div className="relative px-4 md:px-10 mx-auto w-full md:pt-32 pt-12 md:mt-0 mt-24">
          {currentUser.role !== "waiter" && (
            <div className="relative px-4 mt-6">
              <Link
                className="bg-blue-800 text-white active:bg-blue-800 custom-btn font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                to="/dashboard/addmeal"
              >
                <i className="fas fa-plus mr-2"></i> Add Item
              </Link>
            </div>
          )}

          <Fade left cascade>
            <div className="flex flex-wrap mt-16">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-transparent">
                  <img
                    alt="..."
                    src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                    className="w-full align-middle rounded-t-lg"
                  />
                  <blockquote className="relative p-8 mb-4">
                    <h4 className="text-xl font-bold text-gray-800 mb-4 ml-3">
                      Food
                    </h4>
                    <Link
                      className="bg-blue-800 text-white active:bg-blue-600 custom-btn font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      to="/dashboard/food"
                    >
                      View
                    </Link>
                  </blockquote>
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4 ">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-transparent">
                  <img
                    alt="..."
                    src="https://images.unsplash.com/photo-1582106245687-cbb466a9f07f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                    className="w-full align-middle rounded-t-lg"
                  />
                  <blockquote className="relative p-8 mb-4">
                    <h4 className="text-xl font-bold text-gray-800 mb-4 ml-3">
                      Drinks
                    </h4>
                    <Link
                      className="bg-blue-800 text-white active:bg-blue-600 custom-btn font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      to="/dashboard/drinks"
                    >
                      View
                    </Link>
                  </blockquote>
                </div>
              </div>
            </div>
          </Fade>

          <FooterAdmin />
        </div>
      </div>
    </>
  );
};

export default Menu;
