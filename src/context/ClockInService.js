import React, { createContext, useContext, useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'

const ClockedInContext = createContext()

const RawTestStaff = [
  {name: 'John Doe', clockedIn: false, id: uuid()},
  {name: 'Jane Doe', clockedIn: false, id: uuid()},
  {name: 'Tobi Senju', clockedIn: false, id: uuid()},
  {name: 'White Zetsu', clockedIn: false, id: uuid()},
  {name: 'Jrue Holiday', clockedIn: false, id: uuid()},
  {name: 'James Harden', clockedIn: false, id: uuid()},
  {name: 'Devin Booker', clockedIn: false, id: uuid()},
  {name: 'Trae Young', clockedIn: false, id: uuid()},
  {name: 'Paul George', clockedIn: false, id: uuid()},
  {name: 'Damian Lillard', clockedIn: false, id: uuid()},
]

export const useClockedInContext =()=>{
  return useContext(ClockedInContext)
}

const ClockInService = ({children})=>{
  const [testStaff, setTestStaff] = useState([])
  const [clockedInStaff, setClockedInStaff] = useState([])
  const [filteredClock, setFilteredClock] = useState([])
  const [filterText, setFilterText] = useState('')

  useEffect(()=>{
    let newSet = []
    newSet = RawTestStaff.map(item =>{
      return {...item, value: item.id, label: item.name}
    })
    setTestStaff(prev => prev = [...newSet])
  },[])

  useEffect(()=>{
    let newArray = [...clockedInStaff]
    newArray = newArray.filter(item => item.name.toLowerCase().indexOf(filterText) > -1).sort((a, b)=> a-b)
    setFilteredClock(prev => prev = [...newArray])
  },[filterText, clockedInStaff])

  const ClockInStaff=(id)=>{
    let newArray = [...testStaff]
    let singleStaff = newArray.find(item=> item.id === id)
    singleStaff.clockedIn = true
    setTestStaff(prev => prev = [...newArray])
    setClockedInStaff(prev => prev = [...prev, {...singleStaff, time: Date.now()}])
  }

  const handleSearch =(text)=>{
    setFilterText(prev => prev = text)
  }

  return (
    <ClockedInContext.Provider value={{testStaff, setTestStaff, ClockInStaff, clockedInStaff, filteredClock, handleSearch}}>
      {children}
    </ClockedInContext.Provider>
  )
}


export default ClockInService