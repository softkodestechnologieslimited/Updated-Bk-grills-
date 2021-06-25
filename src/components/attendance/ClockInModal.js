import React, { useEffect, useState } from 'react'
import { useClockedInContext } from 'context/ClockInService'
import Select from 'react-select'
import './clockin.styles.scss'


const customStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: '1px solid rgba(0,0,0,0.4)',
    color: state.isSelected ? '#ccc' : 'white',
    padding: 10,
    backgroundColor: ' #12111b',
  }),
}

const ClockInModal = ({ closeModal, selected, setSelected }) => {
  const [options, setOptions] = useState([])

  const { testStaff, ClockInStaff } = useClockedInContext()

  useEffect(()=>{
    let newOptions = []
    newOptions = testStaff.filter(item=> item.clockedIn !== true)
    setOptions(prev => prev = [...newOptions])
  },[testStaff])

  const handleModal = (e)=>{
    if(e.target.classList.contains('clock-in-con') || e.target.classList.contains('cancel')){
      closeModal()
    }
  }

  const handleClock = (e)=>{
    e.preventDefault()
    if(selected.id){
      ClockInStaff(selected.id);
      closeModal()
    }
    return
  }


  return (
    <div className='clock-in-con' onClick={handleModal}>
      <div className='modal'>
          <div className="title">
            <h5>Clock in staff</h5>
          </div>
          <div className="body">
            <Select options={options} onChange={(value)=>{setSelected(value)}} 
            isSearchable 
            placeholder='Select Staff'
            styles={customStyles}
            className='react-select-container'
            classNamePrefix='react-select'
            />
             <div className="btn-con">
              <button type='button' className="button clock"
              onClick={handleClock}
              >
                clock in
              </button>
              <button type='button' className="button cancel">
                cancel
              </button>
            </div>
          </div>
      </div>
    </div>
  )
}

export default ClockInModal
