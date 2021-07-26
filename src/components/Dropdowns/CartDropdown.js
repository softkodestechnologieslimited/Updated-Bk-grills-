import React, { useState, createRef, useContext, useRef, useEffect } from "react";
import { createPopper } from "@popperjs/core";
import { Link } from "react-router-dom";
import { AppStateContext } from "../../context";
import { nanoid } from "nanoid";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import Zoom from 'react-reveal/Zoom';

// import cart from '../../assets/img/food-cart-64.png'
// import cart from '../../assets/img/shopping-cart.png'
import cart from '../../assets/img/fast-cart.png'

const CartDropdown = observer(() => {
  const node = useRef();

  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
  const btnDropdownRef = createRef();
  const popoverDropdownRef = createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  const { cartService } = useContext(AppStateContext);

  const itemSummaryInCart = cartService.meals.map(meal => (
    <div className="my-4 text-gray-800" key={nanoid()}>
      <div className="cart-item-container mb-4 flex justify-between">
        <span className="font-bold">{meal.item}</span>
        <span className="price pl-3">
          {meal.quantity} x &#8358;{meal.price}
        </span>
      </div>
    </div>
  ))

  const toggleDropdown = (e) => {
    e.preventDefault();
    dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
  }

  const handleClick = e => {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    closeDropdownPopover()
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };

    // eslint-disable-next-line
  }, []);

  const emptyCart = () => cartService.resetCart();

  return (
    <div ref={node}>
      <a
        className="text-gray-600 block"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={toggleDropdown}
      >
        <div className="items-center flex">
          <div className="relative w-full h-full inline-flex items-center justify-center">

            <img src={cart} alt="cart" className='h-20' />
            <span className='absolute font-bold text-lg top-0 left-1 mt-5 cart-text text-white'>
              {cartService.meals.length}
            </span>
          </div>
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left p-4 list-none text-left rounded shadow-lg min-w-48 flex flex-col"
        }
      >
        <Zoom left>
          <div className='overflow-y-auto max-h-40'>
            {itemSummaryInCart}
          </div>


          {
            cartService.meals.length ? (
              <>
                <Link
                  className="bg-gray-900 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 mt-4 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150 flex items-center justify-center"
                  type="button"
                  to='/dashboard/checkout'
                >
                  Go to Checkout
            </Link>
                <ClearButton onClick={emptyCart}>Empty Cart</ClearButton>
              </>
            ) : (<span className="text-gray-800 font-bold py-4">Your cart is empty.</span>)
          }

        </Zoom>

      </div>
    </div>
  );
});

export default CartDropdown;

const ClearButton = styled.button`
  text-align: center;
  background: none;
  color: #d73a3a;
  width: 100%;
  padding: 0.5em;
  margin-top: 1em;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 0.75rem;
`;
