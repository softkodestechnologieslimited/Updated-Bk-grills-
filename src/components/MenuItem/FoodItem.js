import React from "react";
import styled from "styled-components";

const FoodItem = ({ foodItem }) => {
  const foodPlaceholderImage = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80';

  return (
    <>
      <div className="w-full xl:w-3/12 lg:w-4/12 md:w-6/12 px-4">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-transparent">
          <Image
            alt="food image"
            src={foodItem.image || foodPlaceholderImage}
            className="w-full align-middle rounded-t-lg"
          />
          <blockquote className="relative flex flex-col align-middle p-4">
            <strong className='text-green-500 mb-3 font-bold'>Available</strong>
            <h5 className="text-base font-bold text-gray-800 mb-2">{foodItem.title}</h5>
            <p className="text-base font-bold text-gray-800 mb-2">&#8358;{foodItem.price}</p>
            {/* <p className="text-base font-bold text-gray-800 mb-2"><small >Waiting Time: 10min</small></p> */}
            <p className="text-base text-gray-800 mb-2"><strong >Description: </strong>{foodItem.description}</p>

          </blockquote>
        </div>
      </div>
    </>
  );
};

export default FoodItem;

const Image = styled.img`
  height: 200px;
  object-fit: fill;
`;