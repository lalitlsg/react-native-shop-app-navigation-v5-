export default class NewOrder {
  constructor(orderId, orderItems, totalAmount, orderDate) {
    this.orderId = orderId;
    this.orderItems = orderItems;
    this.totalAmount = totalAmount;
    this.orderDate = orderDate;
  }
}
