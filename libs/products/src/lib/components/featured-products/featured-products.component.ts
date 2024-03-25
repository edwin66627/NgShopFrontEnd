import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';
import { GetProductsRequest } from '../../models/get-products-request';
import { environment } from 'environments/environment';

@Component({
  selector: 'products-featured-products',
  templateUrl: './featured-products.component.html',
  styles: [
  ]
})
export class FeaturedProductsComponent implements OnInit {
  apiURLImages = environment.apiUrl + 'image/';
  featuredProducts: Product[] = [];
  pageSize = 3;
  pageNumber = 0;
  productsRequest = new GetProductsRequest();
  products = [];
  sortColumn = "name";
  sortDirection = "ASC";
  
  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this._getFeaturedProducts();
  }

  private _getFeaturedProducts() {
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
    });
  }
}
