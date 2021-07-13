import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useReactToPrint } from 'react-to-print';
import Zoom from 'react-reveal/Zoom'
import { useToasts } from 'react-toast-notifications'

import Sidebar from "components/Sidebar/Sidebar.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";
import AdminNavbar from "components/Navbars/AdminNavbar.js";
// import logo from "../../assets/img/logo.png";
import logo from '../../assets/img/logos/NewLogo.JPG'
import '../../assets/styles/ticket.scss';
import { formatter, formatTicketDate, formatTime } from 'utils';
import { Link } from 'react-router-dom';
import { useClockedInContext } from 'context/ClockInService';
import Spinner from 'components/spinner/Spinner';


const SwimmingTickets = () => {
  const [ticketId, setTicketId] = useState('')
  const [date, setDate] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const printComponent = useRef()
  const { addTicket, fetchTickets, loading, startDate } = useClockedInContext()
  const { addToast } = useToasts()

  useEffect(()=>{
    let mounted = true
    if(mounted){
      changeTicketId()
      fetchTickets(startDate)
    }

    return ()=>{
      mounted = false
    }
      // eslint-disable-next-line
  },[])

  useEffect(()=>{
    let timer = setInterval(()=>{
      setDate(prev=> prev = Date.now())
    },1000)

    return function cleanup (){
      clearInterval(timer)
    }
      // eslint-disable-next-line
  },[])

  const changeTicketId =()=>{
    let newId = uuid()
    setTicketId(prev => prev = newId)
  }

  const HandlePrint = async()=>{
    const print = await addTicket({ticket_id: ticketId})
    if(print){
      await handlePrint()
      setShowModal(false)
    }else{
      setShowModal(false)
      addToast('Unable to print, Something went wrong', {
        appearance: 'error',
        autoDismiss: true,
      })
    }
  }

  const handlePrint = useReactToPrint({
    content: () => printComponent.current,
    onAfterPrint:()=>{
      changeTicketId()
      setShowModal(prev => prev = false)
    },
  });

  const closeModal =(e)=>{
    if(e.target.classList.contains("ticket-modal")){
      setShowModal(prev=> prev = false)
    }
  }

  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-gray-900">
        <AdminNavbar />
        <div className="relative px-4 md:px-10 mx-auto w-full h-90 md:pt-32 pt-12 md:mt-0 mt-24">
          <div className="px-4 mt-6">
              <div className="ticket-history">
                <Link className='link' to='/dashboard/swimming-ticket/history' >
                  <button type='button'>
                  <i className="fas fa-history"></i>
                  View Ticket History
                  </button>
                </Link>
              </div>
              <div ref={printComponent} className="ticket">
                <div className="img-con">
                  <img src={logo} style={{borderRadius: '50%'}} alt="logo"/>
                </div>
                <h3>Swimming Ticket</h3>
                <p className='address'>29, Somwhere Street, Some good place, Ilorin, Nigeria</p>
                <p>Ticket Id: <br/> {ticketId}</p>
                <p>Date: <br/> {formatTicketDate(date) || ' '}</p>
                <p>Time: <br/> {formatTime(date) || ' '}</p>
                <h1>{formatter.format(200)}</h1>
              </div>
              <div className="print-btn">
                <button onClick={()=>{ setShowModal(true) }} type='button'>
                    Print Ticket
                </button>
  
            </div>
          </div>
        </div>
        <FooterAdmin />
      </div>

      {showModal &&
      <div className="ticket-modal" onClick={closeModal}>
        <Zoom>
          <div className="modal">

           {!loading && <> <div className="title">
              <h5>Confirm Ticket Print</h5>
            </div>
            <div className="body">
              <div className="message">
                <p>Are you sure you want to print this ticket?</p>
                <p>After clicking "CONFIRM", it cannot be undone</p>
              </div>

              <div className="btn-con">
                <button type='button' className="button clock active:bg-indigo-600 bg-blue-800 "
                  onClick={HandlePrint}
                >
                  confirm
                </button>
                <button type='button' className="button cancel"
                  onClick={()=>{ setShowModal(false) }}
                >
                  cancel
                </button>
              </div>
            </div> </>}
          
          {
            loading && <Spinner />
          }
          </div>
        </Zoom>
      </div>}
    </>
  )
}

export default SwimmingTickets
