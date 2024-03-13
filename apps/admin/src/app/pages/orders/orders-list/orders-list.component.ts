import { Component, OnInit } from '@angular/core';

import { OrderService } from '@mycompany/orders';
import { ORDER_STATUS } from '../order.constants';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-orders-list',
  templateUrl: './orders-list.component.html',
})
export class OrdersListComponent implements OnInit {
  orders = [];
  orderStatus = ORDER_STATUS;

  constructor(
    private ordersService: OrderService,
    private router: Router
  ){}

  ngOnInit(): void {
    this._getOrders();
  }

  _getOrders() {
    this.ordersService.getOrders().subscribe((orders) => {
      this.orders = orders;
    });
  }

  showOrder(orderId){
    this.router.navigateByUrl(`orders/${orderId}`);
  }
  deleteOrder(){
    console.log("Delete Order!!!");
  }
}
