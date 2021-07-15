<<<<<<< HEAD
import React, { useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { AppStateContext } from "../../context";
import Pulse from "react-reveal/Pulse";
=======
import React, { useContext, useEffect } from 'react'
import { Link, useHistory } from "react-router-dom";
import { AppStateContext } from "../../context";
import Pulse from 'react-reveal/Pulse';

>>>>>>> 24b52f90c601d2036fd49e3f6c8671e0b2458928

// components
import FoodItem from "../../components/MenuItem/FoodItem.js";
import AdminNavbar from "../../components/Navbars/AdminNavbar.js";
import Sidebar from "../../components/Sidebar/Sidebar.js";
import FooterAdmin from "../../components/Footers/FooterAdmin.js";

const FoodMenu = () => {
<<<<<<< HEAD
  const { mealService } = useContext(AppStateContext);
  const foodItems = mealService.meals.filter(
    (meal) => meal.category === "food" && meal.inStock === "true" && meal.deleted !== true
  );

  const history = useHistory();

  useEffect(() => {
    if (!mealService.meals.length) {
      return history.push("/dashboard/menu");
    }
=======
  const { mealService } = useContext(AppStateContext)
  const foodItems = mealService.meals.filter(meal => meal.category === 'food' && meal.inStock === true);

  const history = useHistory();


  useEffect(() => {
    if (!mealService.meals.length) {
      return history.push('/dashboard/menu');
    };
>>>>>>> 24b52f90c601d2036fd49e3f6c8671e0b2458928

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
<<<<<<< HEAD
              to="/dashboard/menu"
=======
              to='/dashboard/menu'
>>>>>>> 24b52f90c601d2036fd49e3f6c8671e0b2458928
            >
              Main Menu
            </Link>
          </div>
          <div className="flex flex-wrap mt-4">
            <div className="w-full mb-12">
              <Pulse>
                <div className="flex flex-wrap mt-8">
<<<<<<< HEAD
                  {foodItems.length !== 0 ? (
                    foodItems.map((foodItem, idx) => (
                      <FoodItem foodItem={foodItem} key={idx} />
                    ))
                  ) : (
                    <p className="py-5 px-6 font-bold text-xl mx-auto text-red-500">
                      No Food available!
                    </p>
                  )}
=======
                  {
                    foodItems.length !== 0 ? (
                      foodItems.map((foodItem, idx) => (
                        <FoodItem foodItem={foodItem} key={idx} />
                      ))
                    ) : (
                      <p className="py-5 px-6 font-bold text-xl text-gray-900">No Food available!</p>
                    )
                  }

>>>>>>> 24b52f90c601d2036fd49e3f6c8671e0b2458928
                </div>
              </Pulse>
            </div>
          </div>
        </div>
        <FooterAdmin />
      </div>
    </>
<<<<<<< HEAD
  );
};

export default FoodMenu;
=======
  )
}

export default FoodMenu
>>>>>>> 24b52f90c601d2036fd49e3f6c8671e0b2458928
