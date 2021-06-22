import { useContext, useEffect } from "react";
import { AppStateContext } from "./context";
import Pusher from "pusher-js";
import { useToasts } from "react-toast-notifications";
import apiService from "./context/apiService";

export const usePusherNotifications = () => {
  const { orderService, mealService, customerService } = useContext(AppStateContext);
  const { addToast } = useToasts();

  const infoToast = { appearance: 'info', autoDismiss: true };

  useEffect(() => {
    const registerBindings = () => {
      const pusher = new Pusher('4b11434497ee32cd53ba', {
        cluster: 'eu'
      })

      const defaultChannel = pusher.subscribe('default');

      defaultChannel.bind('orderCreated', ({ order }) => {
        orderService.addOrder(order);
        addToast(`New Order Added by ${order.waiter_name} `, infoToast);
      })

      defaultChannel.bind('orderUpdated', ({ order }) => {
        orderService.updateOrder(order)
        addToast('Order updated', infoToast);
      })

      defaultChannel.bind('customerCreated', ({ customer }) => {
        customerService.addCustomer(customer);
        addToast('New Customer Added: ' + customer.fullName, infoToast)
      })

      defaultChannel.bind('mealAdded', ({ meal }) => {
        mealService.addMeal(meal);
        addToast('New Meal Added', infoToast);
        // console.log(meal);
      })

      defaultChannel.bind('mealQuantityUpdated', async () => {
        const { data } = await apiService.getMeals();
        const meals = data.data;
        mealService.setMeals(meals); // Update the meals data when the quantity is updated;
        addToast('Stock Quantity Updated', infoToast)

      })

      console.log('listening to events');
    }

    registerBindings();

    // eslint-disable-next-line
  }, [])
}