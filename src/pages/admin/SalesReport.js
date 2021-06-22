import React, { useState } from "react";
import DatePicker from "react-datepicker";
import moment from 'moment';
import { nanoid } from "nanoid";
import { useToasts } from 'react-toast-notifications'
import apiService from "../../context/apiService";
import { triggerFileDownload } from '../../utils';
import Fade from 'react-reveal/Fade';


import "react-datepicker/dist/react-datepicker.css";

// components
import AdminNavbar from "../.././components/Navbars/AdminNavbar.js";
import Sidebar from "../.././components/Sidebar/Sidebar.js";
import FooterAdmin from "../.././components/Footers/FooterAdmin";
import ReportModal from "../../components/Modals/ReportModal";
import FullScreenLoader from "../.././components/fullScreenLoader/";

const SalesReport = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [weekDate, setWeekDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState(null);
  const [monthReport, setMonthReport] = useState({
    month: '',
    year: ''
  });

  const { addToast } = useToasts();

  const closeModal = () => setSummary(null);

  const monthsArr = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  const { month, year } = monthReport;

  const handleChange = (e) => {
    const { value, name } = e.target;

    setMonthReport({ ...monthReport, [name]: value })
  };


  const generateReport = async (type, download = false) => {
    try {

      if (type === "month" && (!month || !year)) return alert('Please Enter A Month And Year');

      let date;

      switch (type) {
        case "week":
          date = moment(weekDate).format("MMMM DD YYYY");
          break;
        case "month":
          date = `${month} 01, ${year}`;
          break;
        default:
          date = moment(startDate).format("MMMM DD YYYY");
      }

      setIsLoading(true);

      const { data } = await apiService.getReports({ type, date, download });


      if (!download) {
        const report = data.data;
        report.metadata = { type, date };

        setSummary(report);
        // console.log(data.data);
        return;
      };

      const randomId = nanoid();

      triggerFileDownload(data, `report_${randomId}.csv`); // attach a random id to the report name
      addToast("Report Generated", {
        appearance: 'info',
        autoDismiss: true,
      })

    } catch (error) {
      addToast(error, {
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
        <Fade left>
          <div className="relative px-4 md:px-10 mx-auto w-full h-90 md:pt-32 pt-12 md:mt-0 mt-24">
            <div className="flex flex-wrap mt-4">
              <div className="w-full lg:w-8/12 mx-auto mb-12 px-4">
                <>
                  <div
                    className=
                    "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white text-gray-800"
                  >
                    <div className="rounded-t mb-0 px-4 py-3 border-0">
                      <div className="flex flex-wrap items-center">
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                          <h3
                            className=
                            "font-semibold text-lg text-gray-800 text-capitalize"
                          >
                            sales report
                        </h3>
                          <p className="mb-4 text-base leading-relaxed text-gray-800">
                            Generate sales report by daily, weekly or monthly statistics.
                         </p>
                        </div>
                      </div>
                    </div>

                    <div className='rounded-lg mb-0 py-6 px-12 bg-gray-100 border-0 flex justify-center flex-col w-full mx-auto'>
                      <h3 className="font-semibold text-base text-gray-800">
                        Daily Report
                    </h3>
                      <p className="mb-4 text-xs text-gray-800 font-bold">Please select a date</p>
                      <div className="w-full md:flex md:justify-between items-center flex-wrap">
                        <DatePicker selected={startDate} onChange={date => setStartDate(date)} className='text-gray-600 px-4' />
                        <div className="mt-4">
                          {/* <ReportModal /> */}
                          <button
                            className="custom-btn bg-blue-800 text-white active:bg-blue-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mt-4 mr-2 md:mt-0 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => generateReport("day")}
                          >
                            <i className="fas fa-eye mr-2"></i>
                          View Report
                        </button>
                          <button
                            className="custom-btn bg-blue-800 text-white active:bg-blue-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mt-4 md:mt-0 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => generateReport("day", true)}
                          >
                            <i className="fas fa-file-download mr-2"></i>
                          Generate CSV
                        </button>
                        </div>
                      </div>
                    </div>

                    <div className='rounded-lg mb-0 py-6 px-12 bg-gray-100 border-0 flex justify-center flex-col w-full mx-auto'>
                      <h3 className="font-semibold text-base text-gray-800">
                        Weekly Report
                    </h3>
                      <p className="mb-4 text-xs text-gray-800 font-bold">Please select a date</p>
                      <div className="w-full md:flex md:justify-between items-center flex-wrap">
                        <DatePicker selected={weekDate} onChange={date => setWeekDate(date)} className='text-gray-600 px-4' />
                        <div className='mt-4'>
                          <button
                            className="custom-btn bg-blue-800 text-white active:bg-blue-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mt-4 mr-2 md:mt-0 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => generateReport("week")}
                          >
                            <i className="fas fa-eye mr-2"></i>
                          View Report
                        </button>
                          <button
                            className="custom-btn bg-blue-800 text-white active:bg-blue-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mt-4 md:mt-0 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => generateReport("week", true)}
                          >
                            <i className="fas fa-file-download mr-2"></i>
                          Generate CSV
                        </button>
                        </div>
                      </div>
                    </div>

                    <div className='rounded-lg bg-gray-100 mb-0 py-6 px-12 border-0 flex justify-center flex-col w-full mx-auto'>
                      <h3 className="font-semibold text-base text-gray-800">
                        Monthly Report
                    </h3>
                      <div className="w-full md:flex md:justify-between items-center flex-wrap">
                        <label className="block text-capitalize text-gray-700 text-xs font-bold mb-2">
                          <span className="text-gray-700">Please select month & year</span>
                          <div className="flex">
                            <select className="form-select block w-full my-2 p-3" onChange={handleChange} name='month' value={month} required>
                              <option value=''
                              >Month</option>
                              {monthsArr.map((month, idx) => (
                                <option value={month} key={idx}
                                >{month}</option>
                              ))}
                            </select>
                            <select className="form-select block w-full my-2 p-3" onChange={handleChange} name='year' value={year} required>
                              <option value=''
                              >Year</option>
                              <option value='2021'
                              >2021</option>
                              <option value='2020'
                              >2020</option>
                            </select>
                          </div>
                        </label>
                        <div>

                          <button
                            className="custom-btn bg-blue-800 text-white active:bg-blue-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mt-4 mr-2 md:mt-0 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => generateReport("month")}
                          >
                            <i className="fas fa-eye mr-2"></i>
                          View Report
                        </button>

                          <button
                            className="custom-btn bg-blue-800 text-white active:bg-blue-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mt-4 md:mt-0 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => generateReport("month", true)}
                          >
                            <i className="fas fa-file-download mr-2"></i>
                          Generate CSV
                        </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              </div>
            </div>
          </div>
          {summary ? <ReportModal onClose={closeModal} report={summary} /> : ''}
          {isLoading ? <FullScreenLoader /> : ''}
        </Fade>
        <FooterAdmin />
      </div>
    </>
  );
};

export default SalesReport;
