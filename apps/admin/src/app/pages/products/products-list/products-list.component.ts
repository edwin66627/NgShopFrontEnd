import { Component, OnInit } from '@angular/core';
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
  productsRequest: GetProductsRequest;
  products = [];

  constructor(
    private productsService: ProductsService,
  ) {}

  ngOnInit(): void {
    this._getProducts();
  }
  
  private _getProducts() {
    this.productsRequest = new GetProductsRequest();
    this.productsRequest.isFeatured = false;
    this.productsRequest.categories = [];
    this.productsService.getProducts(this.productsRequest).subscribe((products) => {
      products.forEach(product => {
        const firstImage = product.image.split(",")[0];
        product.image = this.apiURLImages + firstImage;
      });
      this.products = products;
      
    });
  }

}
