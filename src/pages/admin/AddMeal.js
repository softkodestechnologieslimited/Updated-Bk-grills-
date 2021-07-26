import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import apiService from "../../context/apiService";
import { AppStateContext } from "../../context";
import { useToasts } from 'react-toast-notifications'
import styled from "styled-components";
import Fade from 'react-reveal/Fade';

// components
import AdminNavbar from "../../components/Navbars/AdminNavbar.js";
import Sidebar from "../../components/Sidebar/Sidebar.js";
import FooterAdmin from "../../components/Footers/FooterAdmin.js";
import FullScreenLoader from "../../components/fullScreenLoader";
import { uploadImageToCloud } from "../../firebase";


const AddItem = () => {
  const [itemDetails, setItemDetails] = useState({
    item: "",
    desc: "",
    category: "",
    price: '',
    // status: false,
  });
  const [error, setError] = useState('');
  const [status, setStatus] = useState(false)
  const [imageUrl, setImageUrl] = useState(null)
  const [isLoading, setIsLoading] = useState(false);
  const { mealService } = useContext(AppStateContext)
  const history = useHistory();
  const { addToast } = useToasts()

  const { item, desc, category, price} = itemDetails;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // further validations can be done on the input 
      if (!item || !desc || !category || !price || !imageUrl) {
        addToast("Fill all fields please", {
          appearance: 'error',
          autoDismiss: true,
        })

        return
      }
      setIsLoading(true)
      // const { imageLink, imageId } = await uploadImageToCloud(imageUrl);
      const response = await apiService.createMeal({ item, desc, category, price, status, imageUrl });
      const { data } = response.data;

      mealService.addMeal({ ...data }); // save meal item to the app state
      addToast("Meal added successfully", {
        appearance: 'success',
        autoDismiss: true,
      })

      history.push('/dashboard/stock'); // Redirect to stock page on success
    } catch (error) {
      console.log(error);
      const message = apiService.getErrorMessage(error); // the getErrorMessage is a helper function to get the exact messages from the server
      addToast(message, {
        appearance: 'error',
        autoDismiss: true,
      })
      setIsLoading(false)
      setError(message)
      setTimeout(() => {
        setError('')
      }, 5000);
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    console.log(e.target.value);

    setItemDetails({ ...itemDetails, [name]: value });
  };

  const handleImageInput = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => setImageUrl(reader.result);

    reader.readAsDataURL(file);
  }

  return (
    <>
      {isLoading ? <FullScreenLoader /> : <></>}
      <Sidebar />
      <div className="relative md:ml-64 bg-gray-900">
        <AdminNavbar />
        <Fade left>

          <div className="relative px-4 md:px-10 mx-auto w-full md:pt-32 pt-12">
            <div className="flex flex-wrap md:mt-4 mt-32">
              <div className="lg:w-8/12 w-full px-4 mx-auto">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                  <div className="text-center flex justify-between">
                    <h6 className="text-gray-800 text-xl font-bold">Add Item</h6>
                    <Link
                      className="bg-blue-800 custom-btn text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ml-3 ease-linear transition-all duration-150"
                      type="button"
                      to='/dashboard/stock'
                    >
                      Back
                   </Link>
                  </div>
                </div>

                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg bg-gray-300">
                  <form onSubmit={handleSubmit} className="flex-auto p-5 lg:p-10">
                    <div className="relative w-full mb-3">
                      <label className="block">
                        <span className="text-gray-700">Item</span>
                        <input className="form-input text-gray-700 mt-1 block w-full my-4 p-3" placeholder="Title" name='item' value={item}
                          onChange={handleChange}
                          required />
                      </label>
                    </div>
                    <div className="relative w-full mb-3">
                      <label className="block">
                        <span className="text-gray-700">Quantity</span>
                        <input className="form-input text-gray-700 mt-1 block w-full my-4 p-3" placeholder="quantity" name='desc' value={desc}
                          onChange={handleChange}
                          required />
                      </label>
                    </div>
                    <div className="relative w-full mb-3">
                      <label className="block">
                        <span className="text-gray-700">Category</span>
                        <input className="form-input text-gray-700 mt-1 block w-full my-4 p-3" placeholder="category" name='category' value={category}
                          onChange={handleChange}
                          required />
                      </label>
                    </div> <div className="relative w-full mb-3">
                      <label className="block">
                        <span className="text-gray-700">Price</span>
                        <input className="form-input text-gray-700 mt-1 block w-full my-4 p-3" placeholder="price" name='price' value={price}
                          onChange={handleChange}
                          required />
                      </label>
                    </div>
                    <div className="relative w-full mb-3">
                      <label className="block">
                        <span className="text-gray-700">Image</span>
                        {imageUrl ? <MealImage src={imageUrl} /> : ''}
                        <input type="file" accept="image/*" onChange={handleImageInput} className="form-input text-gray-700 mt-1 block w-full my-4 py-3" />
                      </label>
                    </div>
                    {/* <div className="relative w-full mb-3">
                      <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
                        <span className="text-gray-700">Select Category</span>
                        <select className="form-select block w-full my-4 p-3" onChange={handleChange} name='category' value={category} required>
                          <option value=''
                          >Select Category</option>
                          <option value='food'
                          >Food</option>
                          <option value='drinks'
                          >Drinks</option>
                        </select>
                      </label>
                    </div>
                    <div className="relative w-full mb-3">
                      <label className="block">
                        <span className="text-gray-700">Quantity</span>
                        <input className="form-input text-gray-700 mt-1 block w-full my-4 p-3" placeholder="Quantity" name='quantity' value={quantity}
                          onChange={handleChange}
                        />
                      </label>
                    </div> */}
                    {/* <div className="relative w-full mb-3">
                      <label className="block">
                        <span className="text-gray-700">Price</span>
                        <input className="form-input text-gray-700 mt-1 block w-full my-4 p-3" placeholder="Price" name='price' value={price}
                          onChange={handleChange}
                          required />
                      </label>
                    </div> */}

                    <small className="text-red-500 font-bold">
                      {error}
                    </small>

                    <div className="text-center mt-6">
                      <button
                        className="bg-gray-900 custom-btn text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="submit"
                      >
                        Add
                  </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Fade>
        <FooterAdmin />
      </div>
    </>
  );
};

export default AddItem;

const MealImage = styled.img`
  height: 200px;
  width: 200px;
  object-fit: cover;
  background: lightgrey;
  border-radius: 5px;
  margin-top: 8px;
`;