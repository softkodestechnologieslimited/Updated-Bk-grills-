import { createContext } from "react"
import authService from "./authService";
import { cartService } from "./cartService";
import mealService from "./mealService";
import orderService from "./ordersService";
import staffService from "./staffService";
import customerService from "./customerService";
import expenseService from "./expenseService";



const defaultStoreValues = {
  authService,
  orderService,
  staffService,
  mealService,
  cartService,
  customerService,
  expenseService
}

export const AppStateContext = createContext(defaultStoreValues);

const AppStateProvider = (props) => {
  return (
    <AppStateContext.Provider value={defaultStoreValues}>
      {props.children}
    </AppStateContext.Provider>
  )
}

export default AppStateProvider;