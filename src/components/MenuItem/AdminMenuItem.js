import React, {  useContext } from "react";
import { AppStateContext } from "../../context";
import { observer } from "mobx-react-lite";
import { useToasts } from "react-toast-notifications";
import styled from "styled-components";

const AdminMenuItem = observer(({ meal }) => {
  const { cartService } = useContext(AppStateContext);
  const { addToast } = useToasts();
  // const [cartItem, setCartItem] = useState('')

  const foodPlaceholderImage =
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80";

  const drinksPlaceholderImage =
    "https://images.unsplash.com/photo-1582106245687-cbb466a9f07f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80";

  const quantityInCart = () => {
    const itemInCart = cartService.meals.find(
      (cartMeal) => meal.id === cartMeal.id
    );
    // setCartItem(itemInCart)
    return itemInCart ? itemInCart.quantity : 0;
  };

  const cartItem = quantityInCart()


  const addQuantity = () => {
    cartService.addOne(meal);
    const itemInCart = cartService.meals.find(
      (cartMeal) => meal.id === cartMeal.id
    );
    itemInCart.quantity !== 1
      ? addToast("Item updated", {
          appearance: "info",
          autoDismiss: true,
          autoDismissTimeout: 2000,
        })
      : addToast("Item added to cart", {
          appearance: "info",
          autoDismiss: true,
          autoDismissTimeout: 2000,
        });
        console.log( meal.desc, cartItem);
        if (itemInCart.quantity >= meal.desc) {
          console.log('great');
        }
  };

  const reduceQuantity = () => {
    cartService.removeOne(meal.id);
    const itemInCart = cartService.meals.find(
      (cartMeal) => meal.id === cartMeal.id
    );
    itemInCart
      ? addToast("Item updated", {
          appearance: "info",
          autoDismiss: true,
          autoDismissTimeout: 2000,
        })
      : addToast("Item removed from cart", {
          appearance: "info",
          autoDismiss: true,
          autoDismissTimeout: 2000,
        });
        console.log(meal.desc, cartItem);
  };

  return (
    <>
      <div className="w-full xl:w-3/12 lg:w-4/12 md:w-6/12 px-4">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-transparent">
          {meal.image ? (
            <Image
              alt="meal image"
              src={meal.image}
              className="w-full rounded-t-lg"
            />
          ) : (
            <Image
              alt="..."
              src={
                meal.category === "food"
                  ? foodPlaceholderImage
                  : drinksPlaceholderImage
              }
              className="w-full rounded-t-lg"
            />
          )}

          <blockquote className="relative p-3">
            <div className="flex justify-between">
              <h4 className="text-base text-gray-800 mb-2 text-capitalize">
                {meal.item}
              </h4>
              <p className="text-base font-bold text-gray-800 mb-2">
                &#8358;{meal.price}
              </p>
            </div>

            <div className="flex justify-center items-center mt-5">
              <button
                className="text-red-500 bg-transparent border border-solid border-red-500 hover:bg-red-500 hover:text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={reduceQuantity}
              >
                <i className="fas fa-minus"></i>
              </button>
              <span className="text-gray-800 px-4 font-bold">
                {quantityInCart()}
              </span>
              {cartItem  > meal.desc? (
                <button
                className="text-black-500 bg-transparent border border-solid border-blue-500 hover:bg-blue-500 hover:text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                // onClick={addQuantity}
              >
                <i className="fas fa-plus text-gray-500"></i>
              </button>
              ) : (
                <button
                  className="text-blue-500 bg-transparent border border-solid border-blue-500 hover:bg-blue-500 hover:text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={addQuantity}
                >
                  <i className="fas fa-plus"></i>
                </button>
               )}
            </div>
          </blockquote>
        </div>
      </div>
    </>
  );
});

export default AdminMenuItem;

const Image = styled.img`
  height: 200px;
  object-fit: fill;
`;
