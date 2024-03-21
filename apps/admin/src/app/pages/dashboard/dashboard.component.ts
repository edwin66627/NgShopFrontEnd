import { DashboardService } from './../../services/dashboard.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DashboardStatistics } from '../../models/dashboard.statistics';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {
  endsubs$: Subject<void> = new Subject();
  statistics: DashboardStatistics;
  status = "PENDING";
  role = "CUSTOMER";

  constructor(
    private dashboardService: DashboardService
  ){}

  ngOnInit(): void {
    this._getStatistics();
  }

  ngOnDestroy() {
    this.endsubs$.next();
    this.endsubs$.complete();
  }

  private _getStatistics(){
    this.dashboardService.getStatistics(this.status, this.role).pipe(takeUntil(this.endsubs$)).subscribe(stats => {
      this.statistics = stats;
    });
  }

}
