import { NgModule } from '@angular/core';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'products',
    component: ProductsListComponent
  },
  {
    path: 'category/:categoryid',
    component: ProductsListComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)]
})
export class ProductsRoutingModule { }
