import styled from "styled-components";
import { formatter } from "../../utils";

const ReportModal = ({ onClose, report }) => {
  const closeModal = () => {
    onClose();
  }


  return (
    <ModalWrapper>
      <div
        className="justify-center items-center mx-auto flex overflow-x-hidden overflow-y-auto z-50 outline-none focus:outline-none"
        onClick={closeModal}
      >
        <div className="relative w-full my-6 mx-auto max-w-sm">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-8/12 bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
              <h3 className="text-3xl text-gray-800 font-semibold">Sales Summary</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={closeModal}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                    </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative px-6 flex-auto">
              <ReportContentWrapper>
                <div className="grid-wrapper">
                  <p>New Customers</p>
                  <p>{report.numberOfCustomers}</p>
                </div>
                <div className="grid-wrapper">
                  <p>Number of Orders</p>
                  <p>{report.numberOfOrders}</p>
                </div>
                <div className="grid-wrapper">
                  <p>Average Order Amount</p>
                  <p>{formatter.format(report.averageOrderAmount)}</p>
                </div>
                <div className="grid-wrapper">
                  <p>Total Sales</p>
                  <p>{formatter.format(report.totalRevenue)}</p>
                </div>
              </ReportContentWrapper>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={closeModal}
              >
                Close
                  </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </ModalWrapper>
  );
};

export default ReportModal;

const ReportContentWrapper = styled.div`
  .grid-wrapper{
    display: grid;
    grid-template-columns: auto 120px;
    gap: 1em;
    align-items: center;
    color: #2d3748;
    margin: 1em 0;

    p:nth-child(2){
      font-weight: 700;
      font-size: 1em;
      text-align: right;
    }
  }
`;

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  display: grid;
  place-items: center;
  background: #00000078;
  z-index: 100;

  > div{
    width: min(600px, 90%);
  }
`;
