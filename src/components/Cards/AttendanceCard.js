import React, { useEffect, useState } from 'react'
import { formatDate } from 'utils'

function AttendanceCard(props) {
  const { onClick, staff } = props
  const [clockedInStaff, setClockedInStaff] = useState([])

  useEffect(()=>{
    setClockedInStaff(prev => prev = staff.filter(item=> item.clockedIn === true))
  },[staff])

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-6 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-gray-800">Staff Attendance</h3>
            </div>
            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
              <button
                className="bg-blue-800 custom-btn text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={onClick}
              >
                <i className="fas fa-plus mr-2"></i> Clock in staff
              </button>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
        
          {
              clockedInStaff.length !== 0 ? ( <table className="items-center w-full bg-transparent border-collapse">
                  <thead>
                    <tr>
                      <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                        S/N
                      </th>
                      <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                        Full Name 
                      </th>
                      <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                        Time
                      </th>
                
                    
                    </tr>
                  </thead>
                  <tbody className="text-gray-800">
                    {
                      clockedInStaff.map((staffs, idx) =>  (
                            <tr key={idx}>
                              <td className="border-t-0 px-6 text-capitalize align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                                <span className="font-bold">{idx + 1}</span>
                              </td>
                              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                                {staffs.name}
                              </td>
                              <td className="border-t-0 text-capitalize px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                                {formatDate(Date.now())}
                              </td>
                            
                            </tr>
    
                          )
                        )
                    }
                  </tbody>
                </table> ) : (
                        <div className="flex justify-center items-center flex-col">
                          <p className="py-5 px-6 font-bold text-red-500">No staff has been clocked in</p>
                        </div>
                      
                )}
          
                   
        </div>
      </div>
    </>
  )
}

export default AttendanceCard
