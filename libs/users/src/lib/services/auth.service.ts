import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiURLAuth = environment.apiUrl + 'auth';

  constructor(
    private http: HttpClient,
    private localstorage: LocalstorageService,
    private router: Router
  ) { }

  signIn(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiURLAuth}/signin`, { username, password });
  }

  logout() {
    this.localstorage.removeToken();
    this.router.navigate(['/login']);
  }

}
