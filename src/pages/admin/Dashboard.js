import React, { useContext, useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { AppStateContext } from "../../context";
import apiService from "../../context/apiService";
import { useToasts } from 'react-toast-notifications'
import { formatter } from '../../utils'

// components
import CardBarChart from "../../components/Cards/CardBarChart.js";
import CardLineChart from "../../components/Cards/CardLineChart.js";
import AdminNavbar from "../.././components/Navbars/AdminNavbar.js";
import Sidebar from "../../components/Sidebar/Sidebar.js";
import HeaderStats from "../../components/Headers/HeaderStats.js";
import FooterAdmin from "../../components/Footers/FooterAdmin.js";


const Dashboard = observer(() => {
  const { staffService, orderService, customerService } = useContext(AppStateContext);
  const { addToast } = useToasts()
  const [staffCount, setStaffCount] = useState('');
  const [ordersCount, setOrdersCount] = useState('');
  const [customersCount, setCustomersCount] = useState('');
  const [salesTotal, setSalesTotal] = useState('');


  useEffect(() => {
    getStaff();
    getCustomers();
    getOrders();

    // eslint-disable-next-line
  }, [orderService.recentOrders, staffService.allStaff, customerService.allCustomers]);

  const getStaff = async () => {
    try {
      const response = await apiService.getUsers();
      const { data } = response.data;
      // console.log("staff", data.length)
      setStaffCount(data.length)
      staffService.setStaff([...data]);
    } catch (error) {
      const message = apiService.getErrorMessage(error);
      addToast(message, {
        appearance: 'error',
        autoDismiss: true,
      })
    }
  }

  const getCustomers = async () => {
    try {
      const response = await apiService.getCustomers();
      const { data } = response.data;
      // console.log("customers", data.length)
      setCustomersCount(data.length)
      customerService.setCustomers([...data]);
    } catch (error) {
      const message = apiService.getErrorMessage(error);
      addToast(message, {
        appearance: 'error',
        autoDismiss: true,
      })
    }
  }

  const getOrders = async () => {
    try {
      const response = await apiService.getOrders();
      const { data } = response.data;
      setOrdersCount(data.length)
      const orderTotal = data.map(order => order.total)
      setSalesTotal(orderTotal.reduce((accumulator, currentValue) => accumulator + currentValue, 0))
      orderService.setRecentOrders([...data]);
    } catch (error) {
      const message = apiService.getErrorMessage(error);
      addToast(message, {
        appearance: 'error',
        autoDismiss: true,
      })
    }
  }

  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-gray-900">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats staffCount={staffCount} customersCount={customersCount} ordersCount={ordersCount} salesTotal={formatter.format(salesTotal)} />
        <div className="px-4 md:px-10 mx-auto w-full h-90 -m-24">
          <div className="flex flex-wrap mt-4">
            <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
              <CardLineChart />
            </div>
            <div className="w-full xl:w-4/12 mb-24 px-4">
              <CardBarChart />
            </div>
          </div>
        </div>
        <FooterAdmin />
      </div>
    </>
  )
})

export default Dashboard
