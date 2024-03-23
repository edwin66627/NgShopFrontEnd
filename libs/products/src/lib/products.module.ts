import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsSearchComponent } from './components/products-search/products-search.component';
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';

@NgModule({
  declarations: [
    ProductsSearchComponent,
    CategoriesBannerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ProductsSearchComponent,
    CategoriesBannerComponent
  ]
})
export class ProductsModule { }
