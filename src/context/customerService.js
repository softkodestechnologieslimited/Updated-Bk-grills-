import { makeAutoObservable } from "mobx";

export class CustomerService {
  allCustomers;
  deletedCustomers;

  constructor() {
    makeAutoObservable(this);
    this.allCustomers = [];
    this.deletedCustomers = [];
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
    const deletedCustomer = copy.splice(customerIndex, 1);
    // console.log(deletedCustomer)
    this.deletedCustomers = [...this.deletedCustomers, ...deletedCustomer]
    this.allCustomers = [...copy];
    // console.log(this.deletedCustomers)
  }
 
  undeleteCustomer(customerId) {
    const customerIndex = this.deletedCustomers.findIndex(customer => customer.id === customerId);
    if (customerIndex === -1) return

    const copy = [...this.deletedCustomers];
    const customer = copy.splice(customerIndex, 1);

    this.allCustomers = [...this.allCustomers, ...customer]
    this.deletedCustomers = [...copy]
  }

}

const customerService = new CustomerService();

export default customerService;