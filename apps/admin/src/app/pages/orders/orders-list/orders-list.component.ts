import { Component, OnInit } from '@angular/core';

import { OrderService } from '@mycompany/orders';
import { ORDER_STATUS } from '../order.constants';

@Component({
  selector: 'admin-orders-list',
  templateUrl: './orders-list.component.html',
})
export class OrdersListComponent implements OnInit {
  orders = [];
  orderStatus = ORDER_STATUS;

  constructor(
    private ordersService: OrderService
  ){}

  ngOnInit(): void {
    this._getOrders();
  }

  _getOrders() {
    this.ordersService.getOrders().subscribe((orders) => {
      this.orders = orders;
    });
  }

  showOrder(){
    console.log("Show Order!!!");
  }
  deleteOrder(){
    console.log("Delete Order!!!");
  }
}
