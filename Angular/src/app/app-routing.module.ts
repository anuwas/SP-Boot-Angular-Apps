import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AllJobInfoComponent } from './components/all-job-info/all-job-info.component';
import { ReportSchedulerComponent } from './components/report-scheduler/report-scheduler.component';

const routes: Routes = [
	{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
	{ path: 'dashboard', component: DashboardComponent },
    { path: 'alljobs', component: AllJobInfoComponent },
    { path: 'auto-report-scheduler-list', component: ReportSchedulerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
