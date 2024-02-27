import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { environment } from 'environments/environment';
import { GetProductsRequest } from '../models/get-products-request';
import { Page } from '../models/page';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  apiURLProducts = environment.apiUrl + 'product';
  constructor(private http: HttpClient) { }

  getProducts(productsRequest: GetProductsRequest): Observable<Page> {
    return this.http.post<Page>(this.apiURLProducts+"/list", productsRequest);
  }

  getProduct(productId: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiURLProducts}/${productId}/category`);
  }
  
  createProduct(productData: FormData): Observable<Product> {
    return this.http.post<Product>(this.apiURLProducts+"/new", productData);
  }

  updateProduct(productData: FormData, productid: number): Observable<Product> {
    return this.http.put<Product>(`${this.apiURLProducts}/${productid}`, productData);
  }

  deleteProduct(productId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURLProducts}/${productId}`);
  }
  
}
