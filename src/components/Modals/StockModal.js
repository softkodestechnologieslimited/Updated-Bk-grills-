import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useToasts } from "react-toast-notifications";

const StockModal = ({ onClose, defaultThreshold, updateThreshold }) => {
  const [threshold, setThreshold] = useState(defaultThreshold);
  const { addToast } = useToasts();
  // const history = useHistory();

  const closeModal = () => {
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!threshold) {
      addToast("Provide a threshold!", {
        appearance: "error",
        autoDismiss: true,
      });
      return;
    }

    updateThreshold(threshold);
    // history.push("/dashboard/stock");

    closeModal();
  };

  const handleChange = (e) => {
    const { value } = e.target;

    setThreshold(value);
  };

  return (
    <ModalWrapper>
      <div className="justify-center items-center mx-auto flex overflow-x-hidden overflow-y-auto z-50 outline-none focus:outline-none">
        <div className="relative w-full my-6 mx-auto max-w-sm">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-8/12 bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-center justify-between p-5 border-b border-solid border-gray-300 rounded-t">
              <h3 className="text-3xl text-gray-800 font-semibold text-capitalize">
                <i className="fas fa-exclamation-circle mr-4 text-blue-500"></i>
                threshold for stock availability
              </h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={closeModal}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none font-extrabold">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative px-6 flex-auto">
              <form onSubmit={handleSubmit} className="flex-auto p-5 lg:p-10">
                <p className="text-gray-700 mb-6 font-bold">
                  Choose a value to determine when Items are low in stock
                </p>
                <div className="relative w-full mb-3">
                  <label className="block">
                    <span className="text-gray-700">Low in stock</span>
                    <input
                      type="number"
                      className="form-input text-gray-700 mt-1 block w-full my-4 p-3"
                      placeholder="Enter a number"
                      name="threshold"
                      value={threshold}
                      onChange={handleChange}
                      required
                    />
                  </label>
                </div>

                <div className="text-center mt-6">
                  <button
                    className="bg-gray-900 custom-btn text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                  >
                    <i className="fas fa-arrow-alt-circle-right mr-4"></i>
                    Confirm
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </ModalWrapper>
  );
};

export default StockModal;

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

  > div {
    width: min(600px, 90%);
  }
`;
