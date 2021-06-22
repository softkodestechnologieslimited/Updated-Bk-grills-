import React, { Suspense, useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { AppStateContext } from "../context";
import { usePusherNotifications } from "notificationHook";

// components
import Spinner from "../components/spinner/Spinner";

// views
import Dashboard from "../pages/admin/Dashboard.js";
import Customers from "../pages/admin/Customers.js";
import Menu from "../pages/admin/Menu.js";
import Profile from "../pages/admin/Profile.js";
import FoodMenu from "../pages/admin/FoodMenu.js";
import DrinksMenu from "../pages/admin/DrinksMenu.js";
import CartMenu from "../pages/admin/CartMenu.js";
import Orders from "../pages/admin/Orders.js";
import Order from "../pages/admin/Order.js";
import PrintOrder from "../pages/admin/PrintOrder.js";
import StockItem from "../pages/admin/StockItem.js";
import Checkout from "../pages/admin/Checkout.js";
import Stock from "../pages/admin/Stock.js";
import AddMeal from "../pages/admin/AddMeal.js";
import AddCustomer from "../pages/admin/AddCustomer.js";
import EditCustomer from "../pages/admin/EditCustomer.js";
import AddStaff from "../pages/admin/AddStaff.js";
import Staff from "../pages/admin/Staff.js";
import Log from "../pages/admin/Log.js";
import EditStaff from "../pages/admin/EditStaff.js";
import Password from "../pages/admin/Password.js";
import EditProfile from "../pages/admin/EditProfile.js";
import SalesReport from "../pages/admin/SalesReport.js";
import Expenses from "../pages/admin/Expenses.js";
import AddExpense from "../pages/admin/AddExpense.js";


const Admin = () => {
  const { authService } = useContext(AppStateContext);
  usePusherNotifications();

  if (!authService.activeUser) {
    return <Redirect to="/login" />
  }

  return (
    <>
      <Switch>
        <Suspense fallback={<Spinner />}>
          <Route exact path="/dashboard" component={Dashboard} />

          <Route exact path="/dashboard/menu" component={Menu} />
          <Route exact path="/dashboard/food" component={FoodMenu} />
          <Route exact path="/dashboard/drinks" component={DrinksMenu} />
          <Route exact path="/dashboard/addMeal" component={AddMeal} />
          <Route exact path="/dashboard/cartmenu" component={CartMenu} />

          <Route exact path="/dashboard/orders" component={Orders} />
          <Route exact path="/dashboard/orders/:id" component={Order} />
          <Route exact path="/dashboard/orders/print/:id" component={PrintOrder} />

          <Route exact path="/dashboard/checkout" component={Checkout} />

          <Route exact path="/dashboard/stock" component={Stock} />
          <Route exact path="/dashboard/stock/:id" component={StockItem} />

          <Route exact path="/dashboard/customers" component={Customers} />
          <Route exact path="/dashboard/addcustomer" component={AddCustomer} />
          <Route exact path="/dashboard/customers/:id" component={EditCustomer} />

          <Route exact path="/dashboard/staff" component={Staff} />
          <Route exact path="/dashboard/addstaff" component={AddStaff} />
          <Route exact path="/dashboard/staff/:id" component={EditStaff} />


          <Route exact path="/dashboard/profile" component={Profile} />
          <Route exact path="/dashboard/editprofile" component={EditProfile} />
          <Route exact path="/dashboard/password" component={Password} />

          <Route exact path="/dashboard/sales" component={SalesReport} />

          <Route exact path="/dashboard/expenses" component={Expenses} />
          {/* <Route exact path="/dashboard/expenses/:id" component={StockItem} /> */}
          <Route exact path="/dashboard/addexpense" component={AddExpense} />

          <Route exact path="/dashboard/log" component={Log} />
        </Suspense>
      </Switch>
    </>
  )
}

export default Admin

