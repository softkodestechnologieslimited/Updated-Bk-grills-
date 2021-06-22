import axios from "axios";
import { StorageKeys } from "../constants";

const axiosInstance = axios.create({
  baseURL: "https://big-k-grills-backend-api.herokuapp.com/api/v1",
  // baseURL: 'http://localhost:8000/api/v1',
  headers: {
    "Content-type": "application/json",
  },
});

const addAuthorizedHeaders = () => {
  const token = sessionStorage.getItem(StorageKeys.TOKEN) || "";

  if (!token) return {};

  return {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
};

export class ApiService {
  axios = axiosInstance;

  getErrorMessage(error) {
    // check for error message from server and return that
    if (error.response && error?.response?.data?.message)
      return error.response.data.message;
    return error.message;
  }

  // USER

  login = async (payload) => this.axios.post("/auth/login", payload);

  getUsers = async () => this.axios.get("/users", addAuthorizedHeaders());

  createUser = async (payload) =>
    this.axios.post("/auth/create", payload, addAuthorizedHeaders());

  editUser = async (payload) =>
    this.axios.put("/users", payload, addAuthorizedHeaders()); // for editing profile details

  changePassword = async (payload) =>
    this.axios.post("/auth/change-password", payload, addAuthorizedHeaders());

  // ADMIN PRIVILEGES FOR OTHER USERS

  deleteUser = async (payload) =>
    this.axios.post("/users/delete", payload, addAuthorizedHeaders());

  resetPassword = async (payload) =>
    this.axios.post("/users/reset-password", payload, addAuthorizedHeaders());

  modifyRole = async (payload) =>
    this.axios.post("/users/modify-role", payload, addAuthorizedHeaders());

  // MEALS

  getMeals = async () => this.axios.get("/meals", addAuthorizedHeaders());

  createMeal = async (payload) =>
    this.axios.post("/meals", payload, addAuthorizedHeaders());

  updateMeal = async (payload) =>
    this.axios.put("/meals", payload, addAuthorizedHeaders());

  getSingleMeal = async (payload) =>
    this.axios.get(`/meals/${payload.id}`, addAuthorizedHeaders());

  deleteMeal = async (payload) =>
    this.axios.delete(`/meals?id=${payload.id}`, addAuthorizedHeaders());

  // CUSTOMERS

  addCustomer = async (payload) =>
    this.axios.post("/customers", payload, addAuthorizedHeaders());

  getCustomers = async () =>
    this.axios.get("/customers", addAuthorizedHeaders());

  editCustomer = async (payload) =>
    this.axios.put(
      `/customers?id=${payload.id}`,
      payload,
      addAuthorizedHeaders()
    ); // for editing profile details

  deleteCustomer = async (payload) =>
    this.axios.delete(`/customers?id=${payload.id}`, addAuthorizedHeaders());

  searchCustomer = async (payload) =>
    this.axios.get(
      `/customers/search?name=${payload.name}`,
      addAuthorizedHeaders()
    );

  // ORDERS

  getOrders = async () => this.axios.get("/orders", addAuthorizedHeaders());

  createOrder = async (payload) =>
    this.axios.post("/orders", payload, addAuthorizedHeaders());

  getSingleOrder = async (payload) =>
    this.axios.get(`/orders/${payload.id}`, addAuthorizedHeaders());

  updateOrder = async (payload) =>
    this.axios.put(`/orders/${payload.id}`, payload, addAuthorizedHeaders());

  deleteOrder = async (payload) =>
    this.axios.delete(`/orders/${payload.id}`, addAuthorizedHeaders());

  getReports = async (payload) =>
    this.axios.post("/reports", payload, {
      responseType: payload.download ? "blob" : "json",
      ...addAuthorizedHeaders(),
    });

  //  EXPENSES

  getExpenses = async () => this.axios.get("/expenses", addAuthorizedHeaders());

  getExpensesByDay = async (payload) =>
    this.axios.get(`/expenses/date?date=${payload}`, addAuthorizedHeaders());

  addExpense = async (payload) =>
    this.axios.post("/expenses", payload, addAuthorizedHeaders());

  // LOGS

  getLogs = async () => this.axios.get("/logs", addAuthorizedHeaders());
}

const apiService = new ApiService();
export default apiService;
