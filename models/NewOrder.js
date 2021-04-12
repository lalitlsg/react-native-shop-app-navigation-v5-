import moment from "moment";

export default class NewOrder {
  constructor(orderId, orderItems, totalAmount, orderDate) {
    this.id = orderId;
    this.orderItems = orderItems;
    this.totalAmount = totalAmount;
    this.orderDate = orderDate;
  }

  get readableDate() {
    return moment(this.orderDate).format("MMMM Do YYYY, hh:mm");
  }
}
