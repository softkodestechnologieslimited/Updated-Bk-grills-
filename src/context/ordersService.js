import { makeAutoObservable } from "mobx";

export class OrderService {
  recentOrders = [];

  constructor() {
    makeAutoObservable(this);
  }

  getSingleOrder(orderId) {
    const orderIndex = this.recentOrders.findIndex(order => order.id === orderId);
    return this.recentOrders[orderIndex]
  }

  getOrdersByWaiterId(waiterId) {
    const orders = this.recentOrders.filter(order => order.waiter_id === waiterId);
    return orders
  }

  setRecentOrders(orders) {
    this.recentOrders = [...orders];
  }

  addOrder(orderDetails) {
    if (!orderDetails) throw Error('Please enter valid order details');
    this.recentOrders = [...this.recentOrders, orderDetails];
  }

  deleteOrder(orderId) {
    const orderIndex = this.recentOrders.findIndex(order => order.id === orderId);
    if (orderIndex === -1) return

    const copy = [...this.recentOrders];
    copy.splice(orderIndex, 1);
    this.recentOrders = [...copy];
  }

  updateOrder(order) {
    if (!order.id) return;

    const index = this.recentOrders.findIndex(ord => ord.id === order.id);
    if (index === -1) return;

    const orderCopy = [...this.recentOrders];
    orderCopy[index] = order;

    this.recentOrders = [...orderCopy];
  }

}

const orderService = new OrderService();

export default orderService;