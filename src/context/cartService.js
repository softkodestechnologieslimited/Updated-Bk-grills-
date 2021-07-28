import { StorageKeys } from "../constants";

const { makeAutoObservable } = require("mobx");


class CartService {
  meals = [];
  waiter_id = "";
  waiter_name = "";
  payment_method = "";
  status = "pending";

  constructor() {
    makeAutoObservable(this);
    this.init();
  }

  init() {
    const savedCartState = sessionStorage.getItem(StorageKeys.CART) || '';

    if (!savedCartState) return;

    const parsedState = JSON.parse(savedCartState);

    Object.keys(parsedState).forEach(key => {
      if (this[key] === undefined) return;

      this[key] = parsedState[key];
    })

    // console.log(parsedState);
    // console.log(this.currentOrder);
  }

  saveLocalCartState() {
    const currentCartState = { ...this.currentOrder };
    sessionStorage.setItem(StorageKeys.CART, JSON.stringify(currentCartState));
  }

  get currentOrder() { // use this to get the current cart state like so cartService.currentOrder
    return {
      meals: [...this.meals],
      waiter_id: this.waiter_id,
      waiter_name: this.waiter_name,
      payment_method: this.payment_method,
      status: this.status
    }
  }

  get total() {
    let total = 0;
    const copy = [...this.meals];
    copy.forEach(item => total += (parseInt(item.quantity) * parseInt(item.price)));
    return total;
  }

  resetCart() {
    this.meals = [];
    this.waiter_id = "";
    this.waiter_name = "";
    // this.customer_id = "";
    // this.customer_name = "";
    // this.customer_phone = "";
    this.payment_method = "";
    this.status = "pending";

    this.saveLocalCartState();
  }

  addOne(itemData) {
    const itemIndex = this.meals.findIndex(item => item.id === itemData.id); // check if meal has already been added
    const itemAlreadyAdded = itemIndex !== -1;

    if (itemAlreadyAdded) {
      this.meals[itemIndex].quantity += 1; //update quantity
      this.saveLocalCartState();
      return;
    }

    this.meals = [...this.meals, {
      ...itemData,
      quantity: 1
    }]

    this.saveLocalCartState();
  }

  removeOne(itemId) {
    const itemIndex = this.meals.findIndex(item => item.id === itemId); // get the mealIndex

    const itemNotAdded = itemIndex === -1;
    if (itemNotAdded) return;

    const currentItemState = this.meals[itemIndex];

    if (currentItemState.quantity === 1) {
      return this.deleteItem(itemId);
    }

    currentItemState.quantity -= 1; // update quantity
    this.meals[itemIndex] = { ...currentItemState };
    this.saveLocalCartState();
  }

  deleteItem(itemId) {
    const itemIndex = this.meals.findIndex(item => item.id === itemId); // get the mealIndex

    if (itemIndex === -1) return;
    const copy = [...this.meals];
    copy.splice(itemIndex, 1);

    this.meals = [...copy];
    this.saveLocalCartState();
  }

  // addCustomerDetails({ name, phone, id }) {
  //   if (!name) return;

  //   this.customer_name = name;
  //   this.customer_phone = phone;
  //   this.customer_id = id;
  //   this.saveLocalCartState();
  // }

  setWaiter(id, name) {
    this.waiter_name = name;
    this.waiter_id = id;
    this.saveLocalCartState();
  }
}

export const cartService = new CartService();