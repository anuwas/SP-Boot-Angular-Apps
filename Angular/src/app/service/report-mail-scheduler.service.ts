import { Injectable } from '@angular/core';
import{ GlobalConstants } from '../conf/global-constants';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportMailSchedulerService {

private baseUrl = '';

  constructor(private http:HttpClient) { 
  	this.baseUrl = GlobalConstants.apiReportSchedulerURL;
  	console.log(this.baseUrl);
  }

/*
  getAllReportScheduleList(pageNumber: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/all-report-query-mail-list/${pageNumber}`);
  }
  */

    getAllReportScheduleList(pageNumber: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/all-report-query-mail-list/${pageNumber}`);
  }

   createReportSchedule(item: object): Observable<object> {
    return this.http.post(`${this.baseUrl}`+'/save-new-report-configuration', item);
  }

  updateReportSchedule(reportQueryId: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/update-report-configuration/${reportQueryId}`, value);
  }

  updateReportQueryActiveInactiveStat(reportQueryId: number,activeInactiveStat: string, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/update-report-activeinactive-stat/${reportQueryId}/${activeInactiveStat}`, value);
  }

  removeReportSchedule(reportQueryId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/report-query-mail/${reportQueryId}`, { responseType: 'text' });
  }

  getReportSchedule(reportQueryId: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/report-query-mail/${reportQueryId}`);
  }

  playReportQueryTest(reportQueryId: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/report-query-mail-test/${reportQueryId}`);
  }

  reloadReportQueryMailConf(): Observable<Object> {
    return this.http.get(`${this.baseUrl}/reload-query-mail-schedule`);
  }

  getAllReportSchedulerSettingByQueryID(reportQueryId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/all-report-schedule-list/${reportQueryId}`);
  }
}
