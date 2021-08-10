import React, {  useContext, useState } from "react";
// import { useClockedInContext } from "context/ClockInService";
// import Select from "react-select";
import Zoom from "react-reveal/Zoom";
import apiService from "../../context/apiService";
import { useToasts } from "react-toast-notifications";
import { AppStateContext } from "../../context";

import "./clockin.styles.scss";
import Spinner from "components/spinner/Spinner";

// const customStyles = {
//   option: (provided, state) => ({
//     ...provided,
//     borderBottom: "1px solid rgba(0,0,0,0.4)",
//     color: state.isSelected ? "#ccc" : "white",
//     padding: 10,
//     backgroundColor: "white",
//   }),
// };

const ClockInModal = (props) => {
  const { closeModal,  loading } = props;
  // const [options, setOptions] = useState([]);
  const { staffService } = useContext(AppStateContext);
  // const { testStaff } = useClockedInContext()
  const { addToast } = useToasts();
  const [ attendancePayload, setAttendancePayload ] = useState([]);

  // useEffect(() => {
  //   let newOptions = [];
  //   newOptions = staff.filter((item) => item.clockedIn !== true);
  //   setOptions((prev) => (prev = [...newOptions]));
  //   // eslint-disable-next-line
  // }, [testStaff]);

  const handleModal = (e) => {
    if (
      e.target.classList.contains("clock-in-con") ||
      e.target.classList.contains("cancel")
    ) {
      closeModal();
    }
  };

  // const handleClock = (e)=>{
  //   e.preventDefault()
  //   if(selected.id){
  //     const index = staff.indexOf(selected)
  //     let newStaff = [...staff.slice(0,index), {...staff[index], clockedIn: true}, ...staff.slice(index+1)]
  //     setStaff(prev => prev = [...newStaff])
  //     closeModal()
  //   }
  //   return
  // }

  const dropdownData = staffService.allStaff;

  let options = dropdownData.map((data) => (
    <option key={data.id} value={data.first_name + " " + data.last_name}>
      {data.first_name} {data.last_name}
    </option>
  ));

  const handleChange = (e) => {
    const {value, name} = e.target
    setAttendancePayload({ [name]: value})
    console.log(attendancePayload);
  };

  const setAttendance = async () => {
    try {
       await apiService.setAttendance(attendancePayload);
      // const { data } = response;
      // console.log(data);
      addToast("Clockin Success", {
        appearance: "success",
        autoDismiss: true,
      });
    } catch (error) {
      const message = apiService.getErrorMessage(error);
      addToast(message, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setAttendance();
  };

  return (
    <div className="clock-in-con" onClick={handleModal}>
      <Zoom>
        <div className="modal">
          {!loading && (
            <>
              {" "}
              <div className="title">
                <h5>Clock in staff</h5>
              </div>
              <form onSubmit={handleSubmit} className="body text-blac-200">
                <select
                  // options={options}
                  onClick={handleChange}
                  // isSearchable
                  // styles={customStyles}
                  className="form-select block w-full placeholder-gray-400 text-gray-700 bg-white rounded my-4 p-3"
                  // classNamePrefix='react-select'
                  name="staff"
                  // value={newStaff}
                  // onChange={handleChange}
                >
                  <option>Select staff</option>
                {options}
                </select>
                <div className="btn-con">
                  <button
                    type="submit"
                    className="button clock active:bg-indigo-600 bg-blue-800 "
                    // onClick={handleClock}
                  >
                    clock in
                  </button>
                  <button type="button" className="button cancel">
                    cancel
                  </button>
                </div>
              </form>
            </>
          )}
          {loading && <Spinner />}
        </div>
      </Zoom>
    </div>
  );
};

export default ClockInModal;
