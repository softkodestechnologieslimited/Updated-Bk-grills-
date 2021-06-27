import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useReactToPrint } from 'react-to-print';

import Sidebar from "components/Sidebar/Sidebar.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Logo from '../../assets/img/logos/3.png';
import '../../assets/styles/ticket.scss';
import { formatter, formatTicketDate, formatTime } from 'utils';


const SwimmingTickets = () => {
  const [ticketId, setTicketId] = useState('')
  const [date, setDate] = useState(0)
  const printComponent = useRef()

  useEffect(()=>{
    let mounted = true
    if(mounted){
      changeTicketId()
    }

    return ()=>{
      mounted = false
    }
  },[])

  useEffect(()=>{
    let timer = setInterval(()=>{
      setDate(prev=> prev = Date.now())
    },1000)

    return function cleanup (){
      console.log('cleaning');
      clearInterval(timer)
    }
  },[])

  const changeTicketId =()=>{
    let newId = uuid()
    setTicketId(prev => prev = newId)
  }

  const handlePrint = useReactToPrint({
    content: () => printComponent.current,
    onAfterPrint:()=>{
      changeTicketId()
    },
  });

  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-gray-900">
        <AdminNavbar />
        <div className="relative px-4 md:px-10 mx-auto w-full h-90 md:pt-32 pt-12 md:mt-0 mt-24">
          <div className="px-4 mt-6">
            <div className="w-full lg:w-8/12 mx-auto mb-12 px-4">
              {/* <h1 className='header'>Print Swimming Ticket</h1> */}
              <div ref={printComponent} className="ticket">
                <div className="img-con">
                  <img src={Logo} alt="logo"/>
                </div>
                <h3>Swimming Ticket</h3>
                <p className='address'>29, Somwhere Street, Some good place, Ilorin, Nigeria</p>
                <p>Phone Nos: <br/> +23400000000</p>
                <p>Ticket Id: <br/> {ticketId}</p>
                <p>Date: <br/> {formatTicketDate(date) || ' '}</p>
                <p>Time: <br/> {formatTime(date) || ' '}</p>
                <h1>{formatter.format(200)}</h1>
              </div>
              <div className="print-btn">
                <button onClick={handlePrint} type='button'>
                    Print Ticket
                </button>
              </div>
            </div>
          </div>
        </div>
        <FooterAdmin />
      </div>
    </>
  )
}

export default SwimmingTickets
