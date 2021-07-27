import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import apiService from "../../context/apiService";
import { AppStateContext } from "../../context";
import { useToasts } from "react-toast-notifications";
import styled from "styled-components";
import Fade from "react-reveal/Fade";

import FullScreenLoader from "../fullScreenLoader";

const StockItemCard = () => {
  const [itemDetails, setItemDetails] = useState({
    item: "",
    desc: "",
    category: "",
    price: "",
    addQuantity: "",
    // inStock: false
  });

  const { mealService } = useContext(AppStateContext);

  const { addToast } = useToasts();
  // const [status, setStatus] = useState(mealService.meals);
  const [status] = useState(mealService.meals);
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const params = useParams();
  const history = useHistory();
  const { id } = params;

  const getMeal = async () => {
    if (!mealService.meals.length) {
      return history.push("/dashboard/stock");
    }

    const meal = await mealService.getSingleMeal(id);
    console.log(meal);
    console.log(status);

    const { item, desc, category, price, quantity, image, imageId } = meal;
    setItemDetails({ item, desc, category, price, quantity, inStock, imageId });
    setImageUrl(image);
  };

  useEffect(() => {
    getMeal();
    // eslint-disable-next-line
  }, []);

  const {
    item,
    desc,
    category,
    price,
    quantity,
    addQuantity,
    inStock,
    imageId,
  } = itemDetails;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // further validations can be done on the input
      if (!item || !category || !price || !desc) {
        addToast("Fill all fields please", {
          appearance: "error",
          autoDismiss: true,
        });

        return;
      }
      setIsLoading(true);

      let newQuantity;

      if (quantity === null) {
        newQuantity = parseInt(addQuantity);
      } else {
        newQuantity = parseInt(quantity) + parseInt(addQuantity);
      }

      // console.log(newQuantity);

      const response = await apiService.updateMeal({
        id,
        item,
        desc,
        category,
        price,
        quantity: newQuantity,
        inStock,
        imageUrl,
        imageId,
      });

      const { data } = response.data;
      // console.log(data)
      mealService.updateMeal(data);
      addToast("Meal updated successfully", {
        appearance: "success",
        autoDismiss: true,
      });
      history.push("/dashboard/stock"); // Redirect to stock on successful edit
    } catch (error) {
      const message = apiService.getErrorMessage(error);
      // console.log(message || 'Sorry, an error occurred');
      addToast(message, {
        appearance: "error",
        autoDismiss: true,
      });
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;

    setItemDetails((prevDetails) => {
      return {
        ...prevDetails,
        [name]: value,
      };
    });
  };

  const handleCheck = () => {
    setItemDetails((prevDetails) => {
      const newState = {
        ...prevDetails,
        inStock: !prevDetails.inStock,
      };

      return newState;
    });
  };

  return (
    <>
      {isLoading ? <FullScreenLoader /> : <></>}
      <Fade left>
        <div className="relative flex flex-col xl:w-8/12 mx-auto min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
          <div className="rounded-t bg-white mb-0 px-6 py-6">
            <div className="text-center flex justify-between">
              <h6 className="text-gray-800 text-xl font-bold">
                Edit Menu Item
              </h6>
              <Link
                className="bg-blue-800 custom-btn text-white active:bg-blue-600 
              font-bold uppercase text-xs px-4 py-2 rounded shadow 
              hover:shadow-md outline-none focus:outline-none mr-1 
              ease-linear transition-all duration-150"
                type="button"
                to="/dashboard/stock"
              >
                Back
              </Link>
            </div>
          </div>
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <form onSubmit={handleSubmit} className="flex-auto p-5 lg:p-10">
              <div className="relative w-full mb-3">
                <label className="block">
                  <span className="text-gray-700">Title</span>
                  <input
                    className="form-input text-gray-700 mt-1 block w-full my-4 p-3"
                    placeholder="Title"
                    name="item"
                    value={item}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
              <div className="relative w-full mb-3">
                <label className="block">
                  <span className="text-gray-700">Description</span>
                  <input
                    className="form-input text-gray-700 mt-1 block w-full my-4 p-3"
                    placeholder="Description"
                    name="desc"
                    value={desc}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
              <div className="relative w-full mb-3">
                <label className="block">
                  <span className="text-gray-700">Image</span>
                  {imageUrl ? <MealImage src={imageUrl} /> : ""}
                </label>
              </div>
              <div className="relative w-full mb-3">
                <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
                  <span className="text-gray-700">Select Category</span>
                  <select
                    className="form-select block w-full my-4 p-3"
                    onChange={handleChange}
                    name="category"
                    value={category}
                  >
                    <option value="">Select Category</option>
                    <option value="food">Food</option>
                    <option value="drinks">Drinks</option>
                  </select>
                </label>
              </div>
              <div className="relative w-full mb-3">
                <label className="block">
                  <span className="text-gray-700">Add Quantity</span>
                  <input
                    className="form-input text-gray-700 mt-1 block w-full my-4 p-3"
                    placeholder="Quantity"
                    name="addQuantity"
                    value={addQuantity}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="relative w-full mb-3">
                <label className="block">
                  <span className="text-gray-700">Price</span>
                  <input
                    className="form-input text-gray-700 mt-1 block w-full my-4 p-3"
                    placeholder="Price"
                    name="price"
                    value={price}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
              <div className="flex mt-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox text-green-500"
                    checked={inStock || ""}
                    onChange={handleCheck}
                  />
                  <span className="ml-2 text-gray-700">Instock</span>
                </label>
              </div>
              <div className="text-center mt-8">
                <button
                  className="bg-gray-900 custom-btn text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="submit"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </Fade>
    </>
  );
};

export default StockItemCard;

const MealImage = styled.img`
  height: 200px;
  width: 200px;
  object-fit: cover;
  background: lightgrey;
  border-radius: 5px;
  margin-top: 8px;
`;
