import React from 'react';
import Fade from 'react-reveal/Fade';

import Sidebar from "components/Sidebar/Sidebar.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import TicketHistoryCard from 'components/Cards/TicketHistoryCard';
import { useClockedInContext } from 'context/ClockInService';
import { formatShortDate } from 'utils';

const TicketHistory = () => {
  const { handleTicketSearch, filteredTickets, startDate } = useClockedInContext()


  return (
    <>
        <Sidebar />
          <div className="relative md:ml-64 bg-gray-900">
            <AdminNavbar />
              <div className="relative px-4 md:px-10 mx-auto w-full h-90 md:pt-32 pt-12 md:mt-0 mt-24">
                <div className="px-4 mt-6">
                  <form className='w-full lg:w-8/12 mx-auto mb-12 flex flex-wrap justify-between items-center'>
                    <input
                      type="text"
                      className="form-input text-gray-700 block w-full p-5 rounded-lg search-input"
                      placeholder={`Search by Ticket Id (${formatShortDate(startDate)})`}
                      onChange={(e)=>{ handleTicketSearch(e.target.value)} }
                    />
                  </form>
                  <div className="flex flex-wrap mt-4">
                    <Fade left>
                      <div className="w-full lg:w-8/12 mx-auto mb-12 px-4">
                        <TicketHistoryCard ticket={filteredTickets}  />
                      </div>
                    </Fade>
                  </div>
                </div>
              </div>
            <FooterAdmin />
          </div>
    </>
  )
}

export default TicketHistory
