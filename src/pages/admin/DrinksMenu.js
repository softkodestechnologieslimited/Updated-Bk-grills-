import React, { useContext, useEffect } from 'react'
import { Link, useHistory } from "react-router-dom";
import { AppStateContext } from "../../context";
import Fade from 'react-reveal/Fade';


// components
import DrinksTable from "../../components/Cards/DrinksTable.js";
import AdminNavbar from "../.././components/Navbars/AdminNavbar.js";
import Sidebar from "../../components/Sidebar/Sidebar.js";
import FooterAdmin from "../.././components/Footers/FooterAdmin";

const DrinksMenu = () => {
  const { mealService } = useContext(AppStateContext)
  const drinks = mealService.meals.filter(meal => meal.category === 'drinks' && meal.inStock === true);
  const history = useHistory();


  useEffect(() => {
    if (!mealService.meals.length) {
      return history.push('/dashboard/menu');
    };

    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-gray-900">
        <AdminNavbar />
        <div className="relative px-4 md:px-10 mx-auto w-full h-screen md:pt-32 pt-12 md:mt-0 mt-24">
          <div className="relative flex justify-end">
            <Link
              className="bg-blue-800 text-white custom-btn active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-4 ease-linear transition-all duration-150"
              type="button"
              to='/dashboard/menu'
            >
              Main Menu
            </Link>
          </div>
          <div className="flex flex-wrap mt-12">
            <div className="w-full lg:w-8/12 mx-auto mb-12 px-4">
              <Fade left>
                <DrinksTable drinks={drinks} />
              </Fade>
            </div>
          </div>
        </div>
        <FooterAdmin />
      </div>
    </>
  )
}

export default DrinksMenu
