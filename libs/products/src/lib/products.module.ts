import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsSearchComponent } from './components/products-search/products-search.component';

@NgModule({
  declarations: [
    ProductsSearchComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ProductsSearchComponent
  ]
})
export class ProductsModule { }
