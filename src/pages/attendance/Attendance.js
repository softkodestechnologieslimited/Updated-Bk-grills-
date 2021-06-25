import React, { Fragment, useEffect, useState } from 'react'
import Footer from 'components/Footers/Footer'
import Header from 'components/Headers/Header'
import './attendance.styles.scss'
import ClockInModal from 'components/attendance/ClockInModal'
import { useClockedInContext } from 'context/ClockInService'
import { formatDate } from 'utils'

function Attendance() {
  const [showModal, setShowModal] = useState(false)
  const [selected, setSelected] = useState({})


  const { filteredClock, handleSearch, clockedInStaff } = useClockedInContext()

 

  const closeModal = ()=>{
    setSelected(prev => prev = {})
    setShowModal(prev => prev = false )
  }

  const handleShowModal = ()=>{
    setShowModal(prev => prev = true)
  }

 


  return (
    <Fragment>
      <Header/>
      <div className="container attendance">
        <div className="attendance-list">
          <h5>Staff Attendance</h5>
          <div className="btn-con">
              <button type='button' className='button' onClick={handleShowModal}>
                Clock in staff
              </button>
          </div>
          {clockedInStaff.length === 0 && 
            <h3 className='center-big'>No Staff has been clocked in</h3>
          }
          {clockedInStaff.length !== 0 && <> 
            <div className="filter-con">
              <div className="search">
                <input type="text" onChange={(e)=>{
                  handleSearch(e.target.value)
                }} placeholder='Search: Enter Name' />
              </div>
            </div>
            {filteredClock.length === 0 &&
              <h3 className='center-big'>No Staff was found</h3>
            }
            {filteredClock.length !== 0 && 
              <div className="table">
                <table>
                  <thead>
                    <tr>
                      <th>S/N</th>
                      <th>Firstname</th>
                      <th>Lastname</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      filteredClock.map((item, index)=>(
                        <tr key={item.id}>
                          <td>{index + 1}</td>
                          <td>{item.name}</td>
                          <td>{formatDate(item.time)}</td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table> 
              </div>}
          </>}
        </div>
      </div>
    {showModal && <ClockInModal closeModal={closeModal} selected={selected} setSelected={setSelected} />}
      <Footer />
    </Fragment>
  )
}

export default Attendance
