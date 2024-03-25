import { ButtonModule } from 'primeng/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsSearchComponent } from './components/products-search/products-search.component';
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { RouterModule } from '@angular/router';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { ProductsRoutingModule } from './products-routing.module';

import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
  declarations: [
    ProductsSearchComponent,
    CategoriesBannerComponent,
    ProductItemComponent,
    FeaturedProductsComponent,
    ProductsListComponent
  ],
  imports: [
    CommonModule,RouterModule, ButtonModule, CheckboxModule, ProductsRoutingModule, 
  ],
  exports: [
    ProductsSearchComponent,
    CategoriesBannerComponent,
    ProductItemComponent,
    FeaturedProductsComponent,
    ProductsListComponent
  ]
})
export class ProductsModule { }
