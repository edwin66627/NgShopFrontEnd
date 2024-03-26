import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { GetProductsRequest } from '../../models/get-products-request';
import { Subject, takeUntil } from 'rxjs';
import { ProductsService } from '../../services/products.service';
import { environment } from 'environments/environment';
import { Category } from '../../models/category';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'products-list',
  templateUrl: './products-list.component.html',
  styles: [
  ]
})
export class ProductsListComponent implements OnInit, OnDestroy {
  apiURLImages = environment.apiUrl + 'image/';
  categories: Category[] = [];
  endsubs$: Subject<void> = new Subject();
  pageSize = 9;
  pageNumber = 0;
  productsRequest: GetProductsRequest = new GetProductsRequest();
  products: Product[] = [];
  sortColumn = "name";
  sortDirection = "ASC";
  totalElements: number;

  constructor(
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
  ) {}

  ngOnInit(): void {
    this._getCategories();
    this._getProducts();
  }

  ngOnDestroy() {
    this.endsubs$.next();
    this.endsubs$.complete();
  }

  private _getCategories() {
    this.categoriesService.getCategories().pipe(takeUntil(this.endsubs$)).subscribe((cats) => {
      this.categories = cats.map(cat => {
        const catgeory = new Category()
        catgeory.id = cat.id;
        catgeory.name = cat.name;
        catgeory.color = cat.color;
        catgeory.icon = cat.icon;
        catgeory.checked = false;
        return catgeory;
      });
    });
  }

  private _getProducts() {
    this.productsRequest.pageSize = this.pageSize;
    this.productsRequest.pageNumber = this.pageNumber;
    this.productsRequest.sortColumn = this.sortColumn;
    this.productsRequest.sortDirection = this.sortDirection;
    this.productsRequest.isFeatured = false;
    this.productsService.getProducts(this.productsRequest).pipe(takeUntil(this.endsubs$)).subscribe((page) => {
      page.content.forEach(product => {
        const firstImage = product.image.split(",")[0];
        product.image = this.apiURLImages + firstImage;
      });
      this.products = page.content;
      this.totalElements = page.totalElements;
    });
  }

  categoryFilter($event, category: Category){
    category.checked = $event.checked;
    const selectedCategories = this.categories
      .filter((category) => category.checked)
      .map((category) => Number(category.id));
    
    this.productsRequest.categories = selectedCategories;
    this._getProducts();
  }

}
