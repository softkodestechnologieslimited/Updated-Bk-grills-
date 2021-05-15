import { makeAutoObservable } from "mobx";

export class CustomerService {
  allCustomers;

  constructor() {
    makeAutoObservable(this);
    this.allCustomers = [];
  }

  getSingleCustomer(customerId) {
    const customerIndex = this.allCustomers.findIndex(customer => customer.id === customerId);
    return this.allCustomers[customerIndex]
  }

  setCustomers(customers) {
    this.allCustomers = [...customers];
  }

  addCustomer(newCustomerDetails) {
    if (!newCustomerDetails) throw Error('Please enter valid customer details');
    this.allCustomers = [...this.allCustomers, newCustomerDetails];
  }

  deleteCustomer(customerId) {
    const customerIndex = this.allCustomers.findIndex(customer => customer.id === customerId);
    if (customerIndex === -1) return

    const copy = [...this.allCustomers];
    copy.splice(customerIndex, 1);
    this.allCustomers = [...copy];
  }

}

const customerService = new CustomerService();

export default customerService;