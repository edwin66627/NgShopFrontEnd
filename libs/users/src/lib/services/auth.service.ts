import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiURLAuth = environment.apiUrl + 'auth';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  signIn(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiURLAuth}/signin`, { username, password });
  }

}
