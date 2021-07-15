import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import apiService from "../../context/apiService";
import { useToasts } from 'react-toast-notifications'

const StaffModal = ({ onClose, setIsLoading, email, role, type }) => {
  const [password, setPassword] = useState('')
  const { addToast } = useToasts()
  const history = useHistory();

  const closeModal = () => {
    onClose();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // further validations can be done on the input 
      if (!password) {
        addToast("Provide admin password!", {
          appearance: 'error',
          autoDismiss: true,
        })
        return
      }

      let response;

      switch (type) {
        case "role":
          response = await apiService.modifyRole({ email, password, role });
          break;
        case "delete":
          response = await apiService.deleteUser({ email, password });
          break;
        case "reset":
          response = await apiService.resetPassword({ email, password });
          break;
        default:
          return response;
      }

      setIsLoading(true)

      const { status } = response.data;

      addToast(status, {
        appearance: 'success',
        autoDismiss: true,
      })
      history.push('/dashboard/staff'); // Redirect to staff on successful edit
    } catch (error) {
      const message = apiService.getErrorMessage(error); // the getErrorMessage is a helper function to get the exact messages from the server
      // console.log(message || 'Sorry, an error occurred');
      addToast(message, {
        appearance: 'error',
        autoDismiss: true,
      })
      setIsLoading(false)
      closeModal();
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;

    setPassword(value);
  }

  return (
    <ModalWrapper>
      <div
        className="justify-center items-center mx-auto flex overflow-x-hidden overflow-y-auto z-50 outline-none focus:outline-none"
      >
        <div className="relative w-full my-6 mx-auto max-w-sm">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-8/12 bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-center justify-between p-5 border-b border-solid border-gray-300 rounded-t">
              <h3 className="text-3xl text-gray-800 font-semibold">
                <i className="fas fa-exclamation-circle mr-4 text-orange-500"></i>
                Confirm Action</h3>
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
                <div className="relative w-full mb-3">
                  <label className="block">
                    <span className="text-gray-700">Admin Password</span>
                    <input type='password' className="form-input text-gray-700 mt-1 block w-full my-4 p-3" placeholder="Enter Password" name='password' value={password}
                      onChange={handleChange}
                      required />
                  </label>
                </div>

                <div className="text-center mt-6">
                  <button
                    className="bg-gray-900 custom-btn text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                  >
                    <i className="fas fa-arrow-alt-circle-right mr-4"></i>
                    Proceed
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

export default StaffModal;

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
