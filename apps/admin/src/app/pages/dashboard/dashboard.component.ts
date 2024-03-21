import { DashboardService } from './../../services/dashboard.service';
import { Component, OnInit } from '@angular/core';
import { DashboardStatistics } from '../../models/dashboard.statistics';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit{
  statistics: DashboardStatistics;
  status = "PENDING";
  role = "CUSTOMER";

  constructor(
    private dashboardService: DashboardService
  ){}

  ngOnInit(): void {
    this._getStatistics();
  }

  private _getStatistics(){
    this.dashboardService.getStatistics(this.status, this.role).subscribe(stats => {
      this.statistics = stats;
    });
  }

}
