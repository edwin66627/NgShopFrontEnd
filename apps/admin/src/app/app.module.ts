import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { CategoriesListComponent } from './pages/categories/categories-list/categories-list.component';
import { appRoutes } from './app.routes';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { CategoriesFormComponent } from './pages/categories/categories-form/categories-form.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProductsListComponent } from './pages/products/products-list/products-list.component';
import { ProductsFormComponent } from './pages/products/products-form/products-form.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { EditorModule } from 'primeng/editor';
import { InputMaskModule } from 'primeng/inputmask';
import {MultiSelectModule} from 'primeng/multiselect';
import { TagModule } from 'primeng/tag';
import { FieldsetModule } from 'primeng/fieldset';

import { CategoriesService } from '@mycompany/products';
import { UsersListComponent } from './users/users-list/users-list.component';
import { UsersFormComponent } from './users/users-form/users-form.component';
import { OrdersDetailComponent } from './pages/orders/orders-detail/orders-detail.component';
import { OrdersListComponent } from './pages/orders/orders-list/orders-list.component';

const UX_MODULE = [
  ButtonModule,
  CardModule,
  ColorPickerModule,
  ConfirmDialogModule,
  DropdownModule,
  EditorModule,
  FieldsetModule,
  InputMaskModule,
  InputNumberModule,
  InputTextareaModule,
  InputTextModule,
  InputSwitchModule,
  MultiSelectModule,
  TableModule,
  TagModule,
  ToastModule,
  ToolbarModule,
]

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent, DashboardComponent, ShellComponent, SidebarComponent, CategoriesListComponent, CategoriesFormComponent, ProductsListComponent, ProductsFormComponent, UsersListComponent, UsersFormComponent, OrdersDetailComponent, OrdersListComponent],
  imports: [
    BrowserModule, BrowserAnimationsModule, HttpClientModule, FormsModule, ReactiveFormsModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    ...UX_MODULE
  ],
  providers: [CategoriesService, ConfirmationService, MessageService],
  bootstrap: [AppComponent],
  exports: [
    DashboardComponent,
    ShellComponent,
    SidebarComponent,
    CategoriesListComponent,
    CategoriesFormComponent,
    ProductsListComponent,
    ProductsFormComponent,
    UsersListComponent,
    UsersFormComponent,
    OrdersDetailComponent,
    OrdersListComponent
  ],
})
export class AppModule {}
