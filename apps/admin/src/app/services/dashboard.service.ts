import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { DashboardStatistics } from '../models/dashboard.statistics';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  apiURLStatistics = environment.apiUrl + 'statistics';
  constructor(private http: HttpClient) { }

  getStatistics(status: string, role: string): Observable<DashboardStatistics> {
    return this.http.post<DashboardStatistics>(this.apiURLStatistics+"/", {status, role});
  }
  
}
