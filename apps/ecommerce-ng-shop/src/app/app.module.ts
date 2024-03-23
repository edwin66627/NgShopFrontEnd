import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { UiModule } from "@mycompany/ui";
import { ProductsModule } from "@mycompany/products";

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavComponent } from './shared/nav/nav.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductListComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
  ],
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, HttpClientModule, UiModule, 
    FormsModule, ProductsModule],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
    NavComponent
  ],
})
export class AppModule {}
