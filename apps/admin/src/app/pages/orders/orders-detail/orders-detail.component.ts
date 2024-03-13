import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrderService } from '@mycompany/orders';
import { ORDER_STATUS } from '../order.constants';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'admin-orders-detail',
  templateUrl: './orders-detail.component.html',
})
export class OrdersDetailComponent implements OnInit {
  order: Order;
  orderStatuses = [];
  selectedStatus: any;

  constructor(
    private messageService: MessageService,
    private orderService: OrderService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._mapOrderStatus();
    this._getOrder();
  }

  private _mapOrderStatus() {
    this.orderStatuses = Object.keys(ORDER_STATUS).map((key) => {
      return {
        id: key,
        name: ORDER_STATUS[key].label
      };
    });
  }

  private _getOrder() {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.orderService.getOrder(params.id).subscribe((order) => {
          this.order = order;
          this.selectedStatus = order.status;
        });
      }
    });
  }

  onStatusChange(event) {
    this.orderService.updateOrderStatus({ status: event.value }, this.order.id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Order is updated!'
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Order is not updated!'
        });
      }
    });
  }

}
