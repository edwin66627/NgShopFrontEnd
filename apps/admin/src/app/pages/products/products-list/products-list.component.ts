import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService, GetProductsRequest } from '@mycompany/products';
import { environment } from 'environments/environment';

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
    console.log("Request: ", this.productsRequest);
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

  loadPage($event){
    console.log("On Page Change: ", $event)
    this.pageNumber = $event.first / $event.rows;
    this.sortColumn = $event.sortField;
    this.sortDirection = $event.sortOrder == 1 ? "ASC" : "DESC";
    this._getProducts();
  }
  
}
