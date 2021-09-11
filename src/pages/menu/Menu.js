import React, { useContext, useEffect, useState } from "react";
import { AppStateContext } from "../../context";
import { observer } from "mobx-react-lite";
import apiService from "../../context/apiService";
import Footer from "../../components/Footers/Footer";
import Header from "../../components/Headers/Header";
import DrinksMenuItems from "../../components/DrinksmenuItems/DrinksMenuItems";
import FullScreenLoader from "components/fullScreenLoader";
import { useToasts } from "react-toast-notifications";

import "./menu.styles.scss";

const Menu = observer(() => {
  const { mealService } = useContext(AppStateContext);
  const { addToast } = useToasts();

  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getMenu = async () => {
    try {
      setIsLoading(true);
      const response = await apiService.getMealsPy();
      const { data } = response;
      if (data.length !== 0) {
        mealService.setMealsPy([...data]);
      }

      refreshMenu();
    } catch (error) {
      console.log(error);
      addToast("An error occured, please check your network and try again", {
        appearance: "error",
        autoDismiss: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const refreshMenu = () => {
    setMenuItems(mealService.mealsPy);
  };

  useEffect(() => {
    if (menuItems.length) {
      refreshMenu();
      return;
    }
    getMenu();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {isLoading ? <FullScreenLoader /> : <></>}
      <div className="menu-wrapper">
        <Header active="menu" />

        <div className=" lg-menu-img">
          <div className="menu-img-text">
            <h2>menu</h2>
          </div>
        </div>


        <DrinksMenuItems menuItems={menuItems} />
      </div>

      <Footer />
    </>
  );
 });

export default Menu;
