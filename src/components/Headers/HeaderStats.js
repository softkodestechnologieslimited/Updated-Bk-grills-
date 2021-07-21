import React from "react";
import Fade from 'react-reveal/Fade';

// components
import CardStats from "../Cards/CardStats.js";


const HeaderStats = ({ staffCount, customersCount, ordersCount, salesTotal, subscribersCount }) => {
  return (
    <>
      {/* Header */}
      <div className="relative bg-blue-600 md:pt-32 pb-32 pt-12 md:mt-0 mt-32">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <Fade left cascade>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                  <CardStats
                    statSubtitle="SALES"
                    statTitle={salesTotal}
                    statIconName="far fa-chart-bar"
                    statIconColor="bg-red-500"
                  />
                </div>
                <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                  <CardStats
                    statSubtitle="TOTAL ORDERS"
                    statTitle={ordersCount}
                    statIconName="far fa-chart-bar"
                    statIconColor="bg-blue-500"
                  />
                </div>
                <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                  <CardStats
                    statSubtitle="STAFF"
                    statTitle={staffCount}
                    statIconName="fas fa-user-tag"
                    statIconColor="bg-orange-500"
                  />
                </div>
                <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                    statSubtitle="CUSTOMERS"
                    statTitle={customersCount}
                    statIconName="fas fa-users"
                    statIconColor="bg-pink-500"
                  /><CardStats
                  statSubtitle="SUBSCRIBERS"
                  statTitle={subscribersCount}
                  statIconName="fas fa-users"
                  statIconColor="bg-pink-500"
                />
                </div>
              </div>
            </Fade>
          </div>
        </div>
      </div>
    </>
  )
}

export default HeaderStats
