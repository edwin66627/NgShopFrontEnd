import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService, GetProductsRequest } from '@mycompany/products';
import { environment } from 'environments/environment';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
  styles: [
  ]
})
export class ProductsListComponent implements OnInit {
  apiURLImages = environment.apiUrl + 'image/';
  sortColumn = "name";
  loading: boolean;
  pageSize = 3;
  pageNumber = 0;
  productsRequest: GetProductsRequest;
  products = [];
  sortDirection = "ASC";
  totalElements: number;

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private productsService: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._getProducts();
  }
  
  private _getProducts() {
    this.loading = true;
    this.productsRequest = new GetProductsRequest();
    this.productsRequest.pageSize = this.pageSize;
    this.productsRequest.pageNumber = this.pageNumber;
    this.productsRequest.sortColumn = this.sortColumn;
    this.productsRequest.sortDirection = this.sortDirection;
    this.productsRequest.isFeatured = false;
    this.productsRequest.categories = [];
    this.productsService.getProducts(this.productsRequest).subscribe((page) => {
      page.content.forEach(product => {
        const firstImage = product.image.split(",")[0];
        product.image = this.apiURLImages + firstImage;
      });
      this.products = page.content;
      this.totalElements = page.totalElements;
    });
    this.loading = false;
  }

  updateProduct(productid: string) {
    this.router.navigateByUrl(`products/form/${productid}`);
  }

  deleteProduct(productId: string) {
    console.log("Delete image ...")
    this.confirmationService.confirm({
      message: 'Do you want to Delete this Product?',
      header: 'Delete Product',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productsService.deleteProduct(productId).subscribe({
          next: () => {
            this._getProducts();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Product is deleted!'
            });
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Product is not deleted!'
            });
          } 
        });
      }
    });
  }

  loadPage($event){
    this.pageNumber = $event.first / $event.rows;
    this.sortColumn = $event.sortField ? $event.sortField : "name";
    this.sortDirection = $event.sortOrder == 1 ? "ASC" : "DESC";
    this._getProducts();
  }
  
}
