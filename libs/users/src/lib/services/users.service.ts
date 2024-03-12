import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { GetUsersRequest } from '../models/get-users-request';
import { Page } from '../models/page';

import * as countriesLib from 'i18n-iso-countries';
import { User } from '../models/user';
declare const require: any;

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  apiURLUsers = environment.apiUrl + 'user';
  apiURLAuth = environment.apiUrl + 'auth';

  constructor(private http: HttpClient) { 
    countriesLib.registerLocale(require('i18n-iso-countries/langs/en.json'));
  }

  getUsers(usersRequest: GetUsersRequest): Observable<Page> {
    return this.http.post<Page>(this.apiURLUsers+"/list", usersRequest);
  }

  getUser(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiURLUsers}/${userId}`);
  }

  getCountries(): { id: string; name: string }[] {
    return Object.entries(countriesLib.getNames('en', { select: 'official' })).map((entry) => {
      return {
        id: entry[0],
        name: entry[1]
      };
    });
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiURLAuth + "/signup", user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiURLUsers}/${user.id}`, user);
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURLUsers}/${userId}`);
  }

}
