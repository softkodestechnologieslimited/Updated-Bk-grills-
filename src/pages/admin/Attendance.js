import React, { useState, useEffect, useContext } from 'react'
import { AppStateContext } from "../../context";
import apiService from "../../context/apiService";
import { useToasts } from 'react-toast-notifications'
import { useClockedInContext } from 'context/ClockInService';
import '../attendance/attendance.styles.scss'
import Fade from 'react-reveal/Fade';


// Components
import Sidebar from "components/Sidebar/Sidebar.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import ClockInModal from 'components/attendance/ClockInModal';
import AttendanceCard from 'components/Cards/AttendanceCard';


const Attendance = () => {
  const { staffService } = useContext(AppStateContext);
  const { filteredClock, handleSearch } = useClockedInContext()
  const [showModal, setShowModal] = useState(false)
  const [selected, setSelected] = useState({})
  const [staff, setStaff] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToasts()


  useEffect(() => {
    if (staff.length) {
      refreshStaff()
      return;
    }

    getStaff();

    // eslint-disable-next-line
  }, []);

  const refreshStaff = () => {
    let newArray = []
    newArray = staffService.allStaff.map(item=> ({...item, label: item.name, value: item.id, clockedIn: false}))
    setStaff(newArray)
  }
 
  const closeModal = ()=>{
    setSelected(prev => prev = {})
    setShowModal(prev => prev = false )
  }

  const handleShowModal = ()=>{
    setShowModal(prev => prev = true)
  }

  const getStaff = async () => {
    try {
      setIsLoading(true);
      const response = await apiService.getUsers();
      const { data } = response.data;
      staffService.setStaff([...data]);

      refreshStaff()
    } catch (error) {
      const message = apiService.getErrorMessage(error);
      addToast(message, {
        appearance: 'error',
        autoDismiss: true,
      })
    } finally {
      setIsLoading(false);
    }
  }


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
                  placeholder="Search by Staff Name"
                  onChange={(e)=>{ handleSearch(e.target.value)} }
                />
            </form>
            <div className="flex flex-wrap mt-4">
              <Fade left>
                <div className="w-full lg:w-8/12 mx-auto mb-12 px-4">
                  <AttendanceCard staff={staff} filteredClock={filteredClock} onClick={handleShowModal} />
                </div>
              </Fade>
            </div>
          </div>
        </div>
        <FooterAdmin />
      </div>
      {showModal && <ClockInModal loading={isLoading} staff={staff} setStaff={setStaff} closeModal={closeModal} selected={selected} setSelected={setSelected} />}
    </>
  )
}

export default Attendance
