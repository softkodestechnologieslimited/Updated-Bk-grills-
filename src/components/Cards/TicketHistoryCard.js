import React, { useEffect, useContext, useState } from 'react';
import { formatTime, formatLongDate } from 'utils';
import DatePicker from "react-datepicker";
import { useClockedInContext } from 'context/ClockInService';
import Spinner from 'components/spinner/Spinner';
import { AppStateContext } from "../../context";
import Zoom from 'react-reveal/Zoom';
import { useToasts } from 'react-toast-notifications';

const TicketHistoryCard = (props) => {
  const { ticket } = props
  const [selectedTicket, setSelectedTicket] = useState(null)
  const { authService } = useContext(AppStateContext)
  const { currentUser } = authService;
  const { handleDateChange, startDate, loading, setStartDate, deleteTicket } = useClockedInContext();
  const { addToast } = useToasts()

  useEffect(()=>{
    setStartDate(prev=> prev = Date.now())

    //eslint-disable-next-line
  },[])

  const showTicketModal=(item)=>{
    if(currentUser.role === 'superAdmin'){
      setSelectedTicket(prev => prev = {...item})
    }
    else{
      return
    }
  }

  const closeModal=(e)=>{
    if(e.target.classList.contains("ticket-modal")){
      setSelectedTicket(prev=> prev = null)
    }
  }

  const DeleteTicket=async(id)=>{
    const deleted = await deleteTicket(id)
    if(deleted){
      setSelectedTicket(null)
      addToast("Ticket Deleted Successfully", {
        appearance: 'success',
        autoDismiss: true,
      })
    }else{
      setSelectedTicket(null)
      addToast('Unable to delete, Something went wrong', {
        appearance: 'error',
        autoDismiss: true,
      })
    }
  }
  
  
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-6 border-0">
            <div className="flex py-2 flex-wrap items-center">
              <div className="relative ticket-center w-full px-4 max-w-full flex-grow flex-1">
                <h3 className="font-semibold text-base text-gray-800">Ticket History </h3>
              </div>
                <DatePicker 
                  startDate={startDate}
                  onChange={(date)=> { handleDateChange(date) }}
                  className='date-input py-2 ticket-center'
                  selected={startDate}
                />
              <div className="relative py-2 w-full px-4">
                <h3 className="font-semibold text-base text-center text-gray-800">Showing ticket history for {formatLongDate(startDate)} </h3>
              </div>
              <div className="relative py-2 w-full px-4">
                {ticket.length !== 0 && !loading && <h3 className="font-semibold text-base text-gray-800">No of Tickets: {ticket.length}</h3>}
              </div>
              <br/>
              <div className="block w-full overflow-x-auto">

               
                   {
                     loading &&  <Spinner/>
                   }
                
        
                   {
                    !loading && ticket.length !== 0 ? ( <table className="items-center w-full bg-transparent border-collapse">
                    <thead>
                      <tr>
                        <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                          S/N
                        </th>
                        <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                          Ticket Id
                        </th>
                        <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                          Time
                        </th>
                  
                      
                      </tr>
                    </thead>
                    <tbody className="text-gray-800">
                          {
                            ticket.map((item, index)=> (
                              <tr className='table-row' onClick={()=>{showTicketModal(item)}} key={index}>
                                <td className="border-t-0 px-6 text-capitalize align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                                  <span className="font-bold">{index+1}</span>
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                                  {item.ticket_id}
                                </td>
                                <td className="border-t-0 text-capitalize px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                                  {formatTime(new Date(item.timestamp).getTime())}
                                </td>
                              
                              </tr>
                            ))
                          }
                    </tbody>
                  </table> ) : (
                  <div className="flex justify-center items-center flex-col">
                    
                  </div>)}
                  {
                    !loading &&  ticket.length === 0 && <div className="flex justify-center items-center flex-col">
                    <p className="py-5 px-6 font-bold text-red-500">No Ticket Found</p>
                  </div>
                  }
             </div>
              
            </div>
          </div>
      </div>



      {selectedTicket && <div className="ticket-modal" onClick={closeModal}>
        <Zoom>
          <div className="modal">

           {!loading && <> <div className="title">
              <h5>Ticket Details</h5>
            </div>
            <div className="body">
              <div className="message">
                <p className='no-align'>Ticket ID:<strong> {selectedTicket.ticket_id}</strong> </p>
                <p className='no-align' >Date Printed: <strong>{formatLongDate(new Date(selectedTicket.timestamp).getTime())}</strong></p>
                <p className="no-align">Time: <strong>{formatTime(new Date(selectedTicket.timestamp).getTime())}</strong></p>
              </div>

              <div className="btn-con">
                <button type='button' className="button clock active:bg-indigo-600 bg-blue-800 "
                onClick={()=>{DeleteTicket(selectedTicket.id)}}
                >
                  Delete
                </button>
                <button type='button' className="button cancel"
                  onClick={()=>{ setSelectedTicket(false) }}
                >
                  close
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

export default TicketHistoryCard
