import { makeAutoObservable } from "mobx";

export class CustomerService {
  allCustomers;
<<<<<<< HEAD
  deletedCustomers;
=======
>>>>>>> 24b52f90c601d2036fd49e3f6c8671e0b2458928

  constructor() {
    makeAutoObservable(this);
    this.allCustomers = [];
<<<<<<< HEAD
    this.deletedCustomers = [];
=======
>>>>>>> 24b52f90c601d2036fd49e3f6c8671e0b2458928
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
<<<<<<< HEAD
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
=======
    copy.splice(customerIndex, 1);
    this.allCustomers = [...copy];
>>>>>>> 24b52f90c601d2036fd49e3f6c8671e0b2458928
  }

}

const customerService = new CustomerService();

export default customerService;