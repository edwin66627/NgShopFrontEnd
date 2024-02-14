import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { environment } from 'environments/environment';
import { GetProductsRequest } from '../models/get-products-request';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  apiURLProducts = environment.apiUrl + 'product';
  constructor(private http: HttpClient) { }

  getProducts(productsRequest: GetProductsRequest): Observable<Product[]> {
    return this.http.post<Product[]>(this.apiURLProducts+"/list", productsRequest);
  }


}
