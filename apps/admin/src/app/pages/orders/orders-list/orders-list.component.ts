import { Component, OnDestroy, OnInit } from '@angular/core';

import { OrderService } from '@mycompany/orders';
import { ORDER_STATUS } from '../order.constants';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-orders-list',
  templateUrl: './orders-list.component.html',
})
export class OrdersListComponent implements OnInit, OnDestroy {
  endsubs$: Subject<void> = new Subject();
  orders = [];
  orderStatus = ORDER_STATUS;

  constructor(
    private ordersService: OrderService,
    private router: Router
  ){}

  ngOnInit(): void {
    this._getOrders();
  }

  ngOnDestroy() {
    this.endsubs$.next();
    this.endsubs$.complete();
  }

  _getOrders() {
    this.ordersService.getOrders().pipe(takeUntil(this.endsubs$)).subscribe((orders) => {
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
