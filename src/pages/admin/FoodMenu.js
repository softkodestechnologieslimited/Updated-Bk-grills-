import React, { useContext, useEffect } from 'react'
import { Link, useHistory } from "react-router-dom";
import { AppStateContext } from "../../context";
import Pulse from 'react-reveal/Pulse';


// components
import FoodItem from "../../components/MenuItem/FoodItem.js";
import AdminNavbar from "../../components/Navbars/AdminNavbar.js";
import Sidebar from "../../components/Sidebar/Sidebar.js";
import FooterAdmin from "../../components/Footers/FooterAdmin.js";

const FoodMenu = () => {
  const { mealService } = useContext(AppStateContext)
  const foodItems = mealService.meals.filter(meal => meal.category === 'food' && meal.inStock === true);

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
        <div className="relative px-4 md:px-10 mx-auto w-full md:pt-32 pt-12 h-90 md:mt-0 mt-24">
          <div className="relative flex justify-end">
            <Link
              className="bg-blue-800 text-white custom-btn active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-4 ease-linear transition-all duration-150"
              type="button"
              to='/dashboard/menu'
            >
              Main Menu
            </Link>
          </div>
          <div className="flex flex-wrap mt-4">
            <div className="w-full mb-12">
              <Pulse>
                <div className="flex flex-wrap mt-8">
                  {
                    foodItems.length !== 0 ? (
                      foodItems.map((foodItem, idx) => (
                        <FoodItem foodItem={foodItem} key={idx} />
                      ))
                    ) : (
                      <p className="py-5 px-6 font-bold text-xl text-gray-900">No Food available!</p>
                    )
                  }

                </div>
              </Pulse>
            </div>
          </div>
        </div>
        <FooterAdmin />
      </div>
    </>
  )
}

export default FoodMenu
