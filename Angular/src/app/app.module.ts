import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { LocationStrategy, HashLocationStrategy} from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { CalendarModule} from 'primeng/calendar';
import { EditorModule} from 'primeng/editor';

import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AllJobInfoComponent } from './components/all-job-info/all-job-info.component';
import { ReportSchedulerComponent } from './components/report-scheduler/report-scheduler.component';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { Ng2SmartTableModule } from 'ng2-smart-table';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AllJobInfoComponent,
    ReportSchedulerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    CalendarModule,
    EditorModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    CKEditorModule,
    Ng2SmartTableModule,
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
