import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { GetUsersRequest } from '../models/get-users-request';
import { Page } from '../models/page';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  apiURLUsers = environment.apiUrl + 'user';

  constructor(private http: HttpClient) { }

  getProducts(usersRequest: GetUsersRequest): Observable<Page> {
    return this.http.post<Page>(this.apiURLUsers+"/list", usersRequest);
  }

}
