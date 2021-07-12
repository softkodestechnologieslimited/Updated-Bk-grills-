import React, { useEffect, useState } from 'react'
import { useClockedInContext } from 'context/ClockInService'
import Select from 'react-select'
import Zoom from 'react-reveal/Zoom'

import './clockin.styles.scss'
import Spinner from 'components/spinner/Spinner'


const customStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: '1px solid rgba(0,0,0,0.4)',
    color: state.isSelected ? '#ccc' : 'white',
    padding: 10,
    backgroundColor: 'white',
  }),
}

const ClockInModal = (props) => {
  const { closeModal, selected, setSelected, staff, setStaff, loading } = props
  const [options, setOptions] = useState([])

  const { testStaff } = useClockedInContext()

  useEffect(()=>{
    let newOptions = []
    newOptions = staff.filter(item=> item.clockedIn !== true)
    setOptions(prev => prev = [...newOptions])
      // eslint-disable-next-line
  },[testStaff])

  const handleModal = (e)=>{
    if(e.target.classList.contains('clock-in-con') || e.target.classList.contains('cancel')){
      closeModal()
    }
  }

  const handleClock = (e)=>{
    e.preventDefault()
    if(selected.id){
      const index = staff.indexOf(selected)
      let newStaff = [...staff.slice(0,index), {...staff[index], clockedIn: true}, ...staff.slice(index+1)]
      setStaff(prev => prev = [...newStaff])
      closeModal()
    }
    return
  }


  return (
    <div className='clock-in-con' onClick={handleModal}>
      <Zoom>
        <div className='modal'>
           {!loading && <> <div className="title">
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
                <button type='button' className="button clock active:bg-indigo-600 bg-blue-800 "
                onClick={handleClock}
                >
                  clock in
                </button>
                <button type='button' className="button cancel">
                  cancel
                </button>
              </div>
            </div></>}
            {
              loading && <Spinner />
            }
        </div>
      </Zoom>
    </div>
  )
}

export default ClockInModal
